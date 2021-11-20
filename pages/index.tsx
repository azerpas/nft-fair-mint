import { useState } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import { mint, preMint } from '../src/utils/mint';
import { Data } from './api/mint';
 
const Index = () => {
    const [metamaskError, setMetamaskError] = useState();
    const [preMintData, setPreMintData] = useState<Data>();

    const metamask = async () => {
        const provider = await detectEthereumProvider();
        if (provider) {
            let accounts = [];
            try {
                accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            } catch (error) {
                console.log(error);
                if(error.message.includes("MetaMask"))
                    setMetamaskError(error.message);
                    throw new Error(error.message);
            }
            const res = await preMint({account: accounts[0], amount: 2, captcha: "RECAPTCHA_ANSWER"});
            setPreMintData(res);
        } else {
            console.log('Please install MetaMask!');
        }
    }

    return (
        <div>
            <h1>Welcome to my NFT app 👋</h1>
            <button onClick={metamask}>Connect to metamask</button>
            {{/* TODO: params of func */}}
            <button onClick={() => { mint({hash: "", signature: "", nonce: "", tokenQuantity: 0}) }}>Mint</button>
            <p>{metamaskError}</p>
        </div>
    )
}
  
export default Index  