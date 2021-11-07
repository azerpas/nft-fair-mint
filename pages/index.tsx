import { useState } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
 
const Index = () => {
    const [metamaskError, setMetamaskError] = useState();

    const mint = async () => {
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
            console.log(accounts);
            // From now on, this should always be true:
            // provider === window.ethereum
            startApp(provider); // initialize your app
        } else {
            console.log('Please install MetaMask!');
        }
    }
    return (
        <div>
            <h1>Welcome to my NFT app 👋</h1>
            <button onClick={mint}>Mint</button>
            <p>{metamaskError}</p>
        </div>
    )
}
  
export default Index  