/* eslint-disable @typescript-eslint/no-explicit-any */
import type { SafeEventEmitterProvider } from "@web3auth/base";
import { ethers,ContractFactory } from "ethers";
const SmartContractABI  = require('./contract/CertificationTokenABI.json');
const SmartContractBytecode = require('./contract/CertificateTokenByteCode.json');

export default class EthereumRpc {
  private provider: SafeEventEmitterProvider;

  constructor(provider: SafeEventEmitterProvider) {
    this.provider = provider;
  }

  async getChainId(): Promise<any> {
    try {
      const ethersProvider = new ethers.providers.Web3Provider(this.provider);
      // Get the connected Chain's ID
      const networkDetails = await ethersProvider.getNetwork();
      return networkDetails.chainId;
    } catch (error) {
      return error;
    }
  }

  async getAccounts(): Promise<any> {
    try {
      const ethersProvider = new ethers.providers.Web3Provider(this.provider);
      const signer = ethersProvider.getSigner();

      // Get user's Ethereum public address
      const address = await signer.getAddress();

      return address;
    } catch (error) {
      return error;
    }
  }

  async getBalance(): Promise<string> {
    try {
      const ethersProvider = new ethers.providers.Web3Provider(this.provider);
      const signer = ethersProvider.getSigner();

      // Get user's Ethereum public address
      const address = await signer.getAddress();

      // Get user's balance in ether
      const balance = ethers.utils.formatEther(
        await ethersProvider.getBalance(address) // Balance is in wei
      );

      return balance;
    } catch (error) {
      return error as string;
    }
  }

  async sendTransaction(): Promise<any> {
    try {
      const ethersProvider = new ethers.providers.Web3Provider(this.provider);
      const signer = ethersProvider.getSigner();

      const destination = "0x40e1c367Eca34250cAF1bc8330E9EddfD403fC56";

      // Convert 1 ether to wei
      const amount = ethers.utils.parseEther("0.001");

      // Submit transaction to the blockchain
      const tx = await signer.sendTransaction({
        to: destination,
        value: amount,
        maxPriorityFeePerGas: "5000000000", // Max priority fee per gas
        maxFeePerGas: "6000000000000", // Max fee per gas
      });

      // Wait for transaction to be mined
      const receipt = await tx.wait();

      return receipt;
    } catch (error) {
      return error as string;
    }
  }

  async signMessage() {
    try {
      const ethersProvider = new ethers.providers.Web3Provider(this.provider);
      const signer = ethersProvider.getSigner();

      const originalMessage = "YOUR_MESSAGE";

      // Sign the message
      const signedMessage = await signer.signMessage(originalMessage);

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
      const ethersProvider = new ethers.providers.Web3Provider(this.provider);
      const signer = ethersProvider.getSigner();

      // Get the connected Chain's ID
      //const chainId = await web3.eth.getChainId();
      var SmartContractAddress = "0x250caffad56f041837309f8a406e05b9ece4866b461bb871e9669620b5f53919";
      const walletAddress = await ethersProvider.listAccounts() ;
      var address = "0x25b905eE4b2408dbbe9A47A56e71dc6b8A644ae3";
      var contractAddress = "0x3560DD028081d4612D9D1737C6cF02A47D7f6337";
      //logic to deploy Smart contract
      // const factory = new ContractFactory(SmartContractABI, SmartContractBytecode.data, signer);
      // const contract = await factory.deploy()
      
      // Load Smart contract
      const myContract = new ethers.Contract(contractAddress, SmartContractABI, signer);
      // Logic to fetch smart contract name
      //const response = await myContract.name();

      //Logic to perform safeMint
      const response = await myContract.safeMint(receiverAddress,"ipfs://" + metadataHash);
      //const response = "";

      return {status: "Success!!"};
    } catch (error) {
      return error.reason as string;
    }
  }
}