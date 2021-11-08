import type { NextApiRequest, NextApiResponse } from 'next';
import web3 from 'web3';
import crypto from 'crypto';

type Body = {
    account: string,
    amount: number,
    captcha: string
}

export type Data = {
    hash: string,
    signature: string,
    nonce: string
}

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const signerPrivateKey = process.env.SIGNER_PRIVATE_KEY;
    const { account, amount } = req.body;

    // TODO: captcha support

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