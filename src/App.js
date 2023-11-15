import {ethers} from "ethers";
import {useState} from "react";


function App() {
  const [contractAddress, setContractAddress] = useState("");
  const [value, setValue] = useState("0");
  const [calldata, setCalldata] = useState("");
  const [options, setOptions] = useState("{}");



  async function send() {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner()
    console.log(await signer.getAddress(), contractAddress, value, calldata, options)

    await (await signer.sendTransaction({
      to: contractAddress,
      value: value,
      data: calldata,
      ...JSON.parse(options)
    })).wait()
  }


  return (<div>
    <span>Contract address: </span>
    <input type="text" onChange={e => setContractAddress(e.target.value)} value={contractAddress}/>
    <br/>

    <span>Value</span>
    <input type="text" onChange={e => setValue(e.target.value)} value={value}/>
    <br/>

    <span>Calldata</span>
    <input type="text" onChange={e => setCalldata(e.target.value)} value={calldata}/>
    <br/>

    <span>Options</span>
    <input type="text" onChange={e => setOptions(e.target.value)} value={options}/>
    <br/>

    <button onClick={send}>Send</button>

  </div>);

}

export default App;
