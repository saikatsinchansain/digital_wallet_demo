/* eslint-disable @typescript-eslint/no-explicit-any */
import type { SafeEventEmitterProvider } from "@web3auth/base";
import Web3 from "web3";
const SmartContractABI  = require('./contract/CertificationTokenABI.json');
const SmartContractBytecode = require('./contract/CertificateTokenByteCode.json');


export default class EthereumRpc {
  private provider: SafeEventEmitterProvider;

  constructor(provider: SafeEventEmitterProvider) {
    this.provider = provider;
  }

  async getChainId(): Promise<string> {
    try {
      const web3 = new Web3(this.provider as any);

      // Get the connected Chain's ID
      const chainId = await web3.eth.getChainId();

      return chainId.toString();
    } catch (error) {
      return error as string;
    }
  }
  
  async getAccounts(): Promise<any> {
    try {
      const web3 = new Web3(this.provider as any);

      // Get user's Ethereum public address
      const address = await web3.eth.getAccounts();

      return address;
    } catch (error) {
      return error;
    }
  }

  async getBalance(): Promise<string> {
    try {
      const web3 = new Web3(this.provider as any);

      // Get user's Ethereum public address
      const address = (await web3.eth.getAccounts())[0];

      // Get user's balance in ether
      const balance = web3.utils.fromWei(
        await web3.eth.getBalance(address) // Balance is in wei
      );

      return balance;
    } catch (error) {
      return error as string;
    }
  }

  async sendTransaction(): Promise<any> {
    try {
      const web3 = new Web3(this.provider as any);

      // Get user's Ethereum public address
      const fromAddress = (await web3.eth.getAccounts())[0];

      const destination = fromAddress;

      const amount = web3.utils.toWei("0.001"); // Convert 1 ether to wei

      // Submit transaction to the blockchain and wait for it to be mined
      const receipt = await web3.eth.sendTransaction({
        from: fromAddress,
        to: destination,
        value: amount,
        maxPriorityFeePerGas: "5000000000", // Max priority fee per gas
        maxFeePerGas: "6000000000000", // Max fee per gas
      });

      return receipt;
    } catch (error) {
      return error as string;
    }
  }

  async signMessage() {
    try {
      const web3 = new Web3(this.provider as any);

      // Get user's Ethereum public address
      const fromAddress = (await web3.eth.getAccounts())[0];

      const originalMessage = "YOUR_MESSAGE";

      // Sign the message
      const signedMessage = await web3.eth.personal.sign(
        originalMessage,
        fromAddress,
        "test password!" // configure your own password here.
      );

      return signedMessage;
    } catch (error) {
      return error as string;
    }
  }

  async getPrivateKey(): Promise<any> {
    try {
      const privateKey = await this.provider.request({
        method: "eth_private_key",
      });

      return privateKey;
    } catch (error) {
      return error as string;
    }
  }

  async mintCertificate(receiverAddress: string, metadataHash: string): Promise<any> {
    try {
      //const ethersProvider = new ethers.providers.Web3Provider(this.provider);
      //const signer = ethersProvider.getSigner();
      const web3 = new Web3(this.provider as any);
      const walletAddress = (await web3.eth.getAccounts())[0];
      console.log("Wallet Address:" + walletAddress);
      const contractAddress = "0xC7A0F59fc5785B42eC70fea46c3e4F379C131c1e";
      
      // Load Smart contract ether js
      // const myContract = new ethers.Contract(contractAddress, SmartContractABI, signer);
      // Logic to fetch smart contract name
      //const response = await myContract.name();
      // Load smart contract web3js
      
      const contract = new web3.eth.Contract(SmartContractABI,contractAddress.toLowerCase());
      // var err,data = await contract.methods.name().call({from: walletAddress, gas: 4700000});
      var err,data = await contract.methods.owner().call({from: walletAddress, gas: 4700000});
      
      if(err){
        console.log("Error: " + err);
      }else{
        console.log("Contract Owner: " + data);
      }
      
      //Logic to perform safeMint
      console.log("Receiver Address: " + receiverAddress);
      var err,txHash = await contract.methods.safeMint(receiverAddress,"ipfs://" + metadataHash).send({from: walletAddress.toLowerCase(), gas: 4700000});
      
      return "Recognition has been issued to the employee successfully!";
    } catch (error) {
      return error.reason as string;
    }
  }

  async enlistCertificate(): Promise<any> {
    const web3 = new Web3(this.provider as any);
    const walletAddress = (await web3.eth.getAccounts())[0];
    console.log("Wallet Address:" + walletAddress);
    // Logic to deploy smart contract webjs
    const contract_deployer = new web3.eth.Contract(SmartContractABI);
    var contractAddress;
    await contract_deployer.deploy({data: SmartContractBytecode.data}).send({from: walletAddress, gas: 4700000},(err, transactionHash) => 
      {
        if(err)
          console.log('Error :', err);
        else  
          console.log('Transaction Hash :', transactionHash);
      }
      ).on('confirmation', () => {}).then((newContractInstance) => 
      {
        contractAddress=newContractInstance.options.address;
        console.log('Deployed Contract Address : ', newContractInstance.options.address);
      }
      );
    return "New contract address: " + contractAddress;

  }
}
