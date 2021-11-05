import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    message: string
}

export default (req: NextApiRequest, res: NextApiResponse<Data>) => {
    // Generate the signature
    // Send to smart-contract
    res.status(200).json({ message: 'Successfully minted !' })
}