import fetch from 'node-fetch';

export const RECAPTCHA_ENDPOINT = "https://www.google.com/recaptcha/api/siteverify";

type RecaptchaVerifyResponse = {
    success: boolean;
    challengeTs: string;
    hostname: string;
    errorCodes?: string[];
}

export default async ({response, ip}: {response: string, ip: string}): Promise<RecaptchaVerifyResponse> => {
    const data = [`secret=${process.env.RECAPTCHA_SECRET}`, `response=${response}`, ip ? `remoteip=${ip}` : ``].join("&");
    const res: any = await (await fetch(RECAPTCHA_ENDPOINT,
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        }
    )).json();
    return {
        success: res.success,
        challengeTs: res.challenge_ts,
        hostname: res.hostname,
        errorCodes: res["error-codes"]
    }
}