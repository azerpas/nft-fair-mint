import { NextApiRequest } from "next"

export const getIp = (req: NextApiRequest) => {
    const forwarded = req.headers["x-forwarded-for"]
    if (typeof forwarded === 'string') {
        const ip = forwarded ? forwarded.split(/, /)[0] : req.connection.remoteAddress
        return ip
    } else if (typeof forwarded === 'object') {
        // @ts-ignore
        const ip = forwarded ? forwarded[0] : req.connection.remoteAddress
        return ip
    }
    
}