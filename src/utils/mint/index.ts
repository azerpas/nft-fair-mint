import { Data } from "../../../pages/api/mint";
import { API_MINT } from "../../constants/routes";
import SmartContract from "../../../artifacts/contracts/azerpas.sol/Azerpas.json";
import Web3 from 'web3';

type Body = {
    account: string,
    amount: number,
    captcha: string
}

export const preMint = async (props: Body): Promise<Data> => {
    const res = await fetch(API_MINT, { 
        body: JSON.stringify(props), 
        headers: new Headers({ "content-type": "application/json" }),
        method: "POST"
    });
    return res.json();
}

export const mint = async () => {
    const web3 = new Web3(window.ethereum);
    const networkId = await web3.eth.net.getId();
    // TODO: front-end mint
}