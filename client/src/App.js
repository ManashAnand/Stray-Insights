import abi from "./contract/stray.json";
import { useState, useEffect } from "react";
import "./App.css";
import Buy from "./components/Buy";
import Stray from './components/Stray';
import { useDispatch } from "react-redux";
import { addChainData } from "./store/slice/BlockchainSlice";
const ethers = require("ethers")



function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  const dispatch = useDispatch();

  const [account,setAccount] = useState("None")

  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0xf6134e453e12b39d782949f97b5824d793168b48";
      const contractAbi = abi.abi;
      try {
        const { ethereum } = window;
        if (ethereum) {
          // console.log("It's the ethereum")
          // console.log(ethereum) 
          const accounts = await ethereum.request({
            method: "eth_requestAccounts",
          });

          window.ethereum.on("chainChanged",() => {
            window.location.reload();
            console.log("Network changed")
          })
          window.ethereum.on("accountsChanged",() => {
            window.location.reload();
            console.log("account changed")
          })
       
        
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        // Signer jo publish kiya hai smart contract ko uska data 

        const contract = new ethers.Contract(contractAddress,contractAbi,signer);
        // contract mtlb ek tarah se sol usks sara funciton and variable 

        setAccount(signer?.address)
        setState({provider,signer,contract})
        dispatch(addChainData({provider,signer,contract}))
        // dispatch(addChainData({"manash":"working"}))

      }
      else{
        // metamask hai hi nhi 
        alert("Please install metamask")
      }
      } catch (error) {
        console.log(error)
      }
    };
    connectWallet();
  }, []);

  // console.log(state)
  const handleTest = () => {
    dispatch(addChainData({working:"working"}))
  }

  return (<>
    <div className="App">
    <p>Connected Account - {account}</p>
      <Buy state={state}></Buy>
      <Stray state={state}></Stray>
      <button onClick={handleTest}>test</button>
    </div>
  </>);
}

export default App;
