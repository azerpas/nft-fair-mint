import type { NextApiRequest, NextApiResponse } from 'next';
import web3 from 'web3';
import crypto from 'crypto';
import { getIp } from '../../src/utils/server';
import recaptchaSolving from '../../src/services/google/recaptcha'

type Body = {
    account: string,
    amount: number,
    recaptcha: string
}

export type Data = {
    hash?: string,
    signature?: string,
    nonce?: string
    message?: string
}

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const signerPrivateKey = process.env.SIGNER_PRIVATE_KEY;
    const { account, amount, recaptcha } = req.body;

    const ip = getIp(req)
    if (process.env.RECAPTCHA_SECRET) {
        const recaptchaResponse = await recaptchaSolving({response: recaptcha, ip})
        if (recaptchaResponse.success === false) {
            const message = "error"
            return res.status(403).json({ message: "Captcha verification failed" })
        }
    }

    const nonce = crypto.randomBytes(9).toString("base64");

    const content = web3.utils.soliditySha3(
        {
            type: "address", 
            value: account
        }, 
        {
            type: "uint256",
            value: amount
        }, 
        {
            type: "string",
            value: nonce
        }
    );
    const Web3 = new web3();
    // Generate the signature
    const { messageHash: hash, signature } = await Web3.eth.accounts.sign(content, signerPrivateKey)
    // Send back
    res.status(200).json({ hash, signature, nonce })
}