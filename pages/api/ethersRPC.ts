/* eslint-disable @typescript-eslint/no-explicit-any */
import type { SafeEventEmitterProvider } from "@web3auth/base";
import { ethers,ContractFactory } from "ethers";

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

  async mintCertificate(arg1: string, arg2: string, arg3: string): Promise<any> {
    try {
      const ethersProvider = new ethers.providers.Web3Provider(this.provider);
      const signer = ethersProvider.getSigner();

      // Get the connected Chain's ID
      //const chainId = await web3.eth.getChainId();
      var SmartContractAddress = "0x250caffad56f041837309f8a406e05b9ece4866b461bb871e9669620b5f53919";
      var SmartContractABI = [
        {
          "inputs": [],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "previousAdmin",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "newAdmin",
              "type": "address"
            }
          ],
          "name": "AdminChanged",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "approved",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "Approval",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "operator",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "bool",
              "name": "approved",
              "type": "bool"
            }
          ],
          "name": "ApprovalForAll",
          "type": "event"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "approve",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "beacon",
              "type": "address"
            }
          ],
          "name": "BeaconUpgraded",
          "type": "event"
        },
        {
          "inputs": [],
          "name": "initialize",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint8",
              "name": "version",
              "type": "uint8"
            }
          ],
          "name": "Initialized",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "previousOwner",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "newOwner",
              "type": "address"
            }
          ],
          "name": "OwnershipTransferred",
          "type": "event"
        },
        {
          "inputs": [],
          "name": "renounceOwnership",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "uri",
              "type": "string"
            }
          ],
          "name": "safeMint",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "safeTransferFrom",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            },
            {
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
            }
          ],
          "name": "safeTransferFrom",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "operator",
              "type": "address"
            },
            {
              "internalType": "bool",
              "name": "approved",
              "type": "bool"
            }
          ],
          "name": "setApprovalForAll",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "Transfer",
          "type": "event"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "transferFrom",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "newOwner",
              "type": "address"
            }
          ],
          "name": "transferOwnership",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "implementation",
              "type": "address"
            }
          ],
          "name": "Upgraded",
          "type": "event"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "newImplementation",
              "type": "address"
            }
          ],
          "name": "upgradeTo",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "newImplementation",
              "type": "address"
            },
            {
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
            }
          ],
          "name": "upgradeToAndCall",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            }
          ],
          "name": "balanceOf",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "getApproved",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "operator",
              "type": "address"
            }
          ],
          "name": "isApprovedForAll",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "name",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "owner",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "ownerOf",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "proxiableUUID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes4",
              "name": "interfaceId",
              "type": "bytes4"
            }
          ],
          "name": "supportsInterface",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "symbol",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "index",
              "type": "uint256"
            }
          ],
          "name": "tokenByIndex",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "index",
              "type": "uint256"
            }
          ],
          "name": "tokenOfOwnerByIndex",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "tokenURI",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "totalSupply",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ];
      const contractByteCode = '0x60a06040523073ffffffffffffffffffffffffffffffffffffffff1660809073ffffffffffffffffffffffffffffffffffffffff168152503480156200004457600080fd5b50620000556200005b60201b60201c565b620008e6565b60008060019054906101000a900460ff161590508080156200008d5750600160008054906101000a900460ff1660ff16105b80620000c95750620000aa306200026460201b6200127b1760201c565b158015620000c85750600160008054906101000a900460ff1660ff16145b5b6200010b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620001029062000750565b60405180910390fd5b60016000806101000a81548160ff021916908360ff160217905550801562000149576001600060016101000a81548160ff0219169083151502179055505b620001c56040518060400160405280601081526020017f4365727469666963617465546f6b656e000000000000000000000000000000008152506040518060400160405280600381526020017f43544b00000000000000000000000000000000000000000000000000000000008152506200028760201b60201c565b620001d5620002ef60201b60201c565b620001e56200034360201b60201c565b620001f56200039760201b60201c565b62000205620003fb60201b60201c565b8015620002615760008060016101000a81548160ff0219169083151502179055507f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024986001604051620002589190620007cc565b60405180910390a15b50565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b600060019054906101000a900460ff16620002d9576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620002d0906200085f565b60405180910390fd5b620002eb82826200044f60201b60201c565b5050565b600060019054906101000a900460ff1662000341576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040162000338906200085f565b60405180910390fd5b565b600060019054906101000a900460ff1662000395576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016200038c906200085f565b60405180910390fd5b565b600060019054906101000a900460ff16620003e9576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620003e0906200085f565b60405180910390fd5b620003f9620004d760201b60201c565b565b600060019054906101000a900460ff166200044d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040162000444906200085f565b60405180910390fd5b565b600060019054906101000a900460ff16620004a1576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040162000498906200085f565b60405180910390fd5b8160659080519060200190620004b992919062000619565b508060669080519060200190620004d292919062000619565b505050565b600060019054906101000a900460ff1662000529576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040162000520906200085f565b60405180910390fd5b620005496200053d6200054b60201b60201c565b6200055360201b60201c565b565b600033905090565b600060fb60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690508160fb60006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b8280546200062790620008b0565b90600052602060002090601f0160209004810192826200064b576000855562000697565b82601f106200066657805160ff191683800117855562000697565b8280016001018555821562000697579182015b828111156200069657825182559160200191906001019062000679565b5b509050620006a69190620006aa565b5090565b5b80821115620006c5576000816000905550600101620006ab565b5090565b600082825260208201905092915050565b7f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160008201527f647920696e697469616c697a6564000000000000000000000000000000000000602082015250565b600062000738602e83620006c9565b91506200074582620006da565b604082019050919050565b600060208201905081810360008301526200076b8162000729565b9050919050565b6000819050919050565b600060ff82169050919050565b6000819050919050565b6000620007b4620007ae620007a88462000772565b62000789565b6200077c565b9050919050565b620007c68162000793565b82525050565b6000602082019050620007e36000830184620007bb565b92915050565b7f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960008201527f6e697469616c697a696e67000000000000000000000000000000000000000000602082015250565b600062000847602b83620006c9565b91506200085482620007e9565b604082019050919050565b600060208201905081810360008301526200087a8162000838565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680620008c957607f821691505b60208210811415620008e057620008df62000881565b5b50919050565b608051614aac6200091e600039600081816108b70152818161094601528181610a6001528181610aef0152610c100152614aac6000f3fe60806040526004361061014b5760003560e01c80636352211e116100b6578063a22cb4651161006f578063a22cb46514610483578063b88d4fde146104ac578063c87b56dd146104d5578063d204c45e14610512578063e985e9c51461053b578063f2fde38b146105785761014b565b80636352211e1461038557806370a08231146103c2578063715018a6146103ff5780638129fc1c146104165780638da5cb5b1461042d57806395d89b41146104585761014b565b80632f745c59116101085780632f745c59146102725780633659cfe6146102af57806342842e0e146102d85780634f1ef286146103015780634f6ccce71461031d57806352d1902d1461035a5761014b565b806301ffc9a71461015057806306fdde031461018d578063081812fc146101b8578063095ea7b3146101f557806318160ddd1461021e57806323b872dd14610249575b600080fd5b34801561015c57600080fd5b50610177600480360381019061017291906131a8565b6105a1565b60405161018491906131f0565b60405180910390f35b34801561019957600080fd5b506101a26105b3565b6040516101af91906132a4565b60405180910390f35b3480156101c457600080fd5b506101df60048036038101906101da91906132fc565b610645565b6040516101ec919061336a565b60405180910390f35b34801561020157600080fd5b5061021c600480360381019061021791906133b1565b61068b565b005b34801561022a57600080fd5b506102336107a3565b6040516102409190613400565b60405180910390f35b34801561025557600080fd5b50610270600480360381019061026b919061341b565b6107b0565b005b34801561027e57600080fd5b50610299600480360381019061029491906133b1565b610810565b6040516102a69190613400565b60405180910390f35b3480156102bb57600080fd5b506102d660048036038101906102d1919061346e565b6108b5565b005b3480156102e457600080fd5b506102ff60048036038101906102fa919061341b565b610a3e565b005b61031b600480360381019061031691906135d0565b610a5e565b005b34801561032957600080fd5b50610344600480360381019061033f91906132fc565b610b9b565b6040516103519190613400565b60405180910390f35b34801561036657600080fd5b5061036f610c0c565b60405161037c9190613645565b60405180910390f35b34801561039157600080fd5b506103ac60048036038101906103a791906132fc565b610cc5565b6040516103b9919061336a565b60405180910390f35b3480156103ce57600080fd5b506103e960048036038101906103e4919061346e565b610d4c565b6040516103f69190613400565b60405180910390f35b34801561040b57600080fd5b50610414610e04565b005b34801561042257600080fd5b5061042b610e18565b005b34801561043957600080fd5b50610442610fe2565b60405161044f919061336a565b60405180910390f35b34801561046457600080fd5b5061046d61100c565b60405161047a91906132a4565b60405180910390f35b34801561048f57600080fd5b506104aa60048036038101906104a5919061368c565b61109e565b005b3480156104b857600080fd5b506104d360048036038101906104ce91906136cc565b6110b4565b005b3480156104e157600080fd5b506104fc60048036038101906104f791906132fc565b611116565b60405161050991906132a4565b60405180910390f35b34801561051e57600080fd5b50610539600480360381019061053491906137f0565b611128565b005b34801561054757600080fd5b50610562600480360381019061055d919061384c565b611163565b60405161056f91906131f0565b60405180910390f35b34801561058457600080fd5b5061059f600480360381019061059a919061346e565b6111f7565b005b60006105ac8261129e565b9050919050565b6060606580546105c2906138bb565b80601f01602080910402602001604051908101604052809291908181526020018280546105ee906138bb565b801561063b5780601f106106105761010080835404028352916020019161063b565b820191906000526020600020905b81548152906001019060200180831161061e57829003601f168201915b5050505050905090565b600061065082611318565b6069600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b600061069682610cc5565b90508073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610707576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106fe9061395f565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff16610726611363565b73ffffffffffffffffffffffffffffffffffffffff16148061075557506107548161074f611363565b611163565b5b610794576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161078b906139f1565b60405180910390fd5b61079e838361136b565b505050565b6000609980549050905090565b6107c16107bb611363565b82611424565b610800576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107f790613a83565b60405180910390fd5b61080b8383836114b9565b505050565b600061081b83610d4c565b821061085c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161085390613b15565b60405180910390fd5b609760008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600083815260200190815260200160002054905092915050565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff161415610944576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161093b90613ba7565b60405180910390fd5b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166109836117b3565b73ffffffffffffffffffffffffffffffffffffffff16146109d9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109d090613c39565b60405180910390fd5b6109e28161180a565b610a3b81600067ffffffffffffffff811115610a0157610a006134a5565b5b6040519080825280601f01601f191660200182016040528015610a335781602001600182028036833780820191505090505b506000611815565b50565b610a59838383604051806020016040528060008152506110b4565b505050565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff161415610aed576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ae490613ba7565b60405180910390fd5b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16610b2c6117b3565b73ffffffffffffffffffffffffffffffffffffffff1614610b82576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b7990613c39565b60405180910390fd5b610b8b8261180a565b610b9782826001611815565b5050565b6000610ba56107a3565b8210610be6576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610bdd90613ccb565b60405180910390fd5b60998281548110610bfa57610bf9613ceb565b5b90600052602060002001549050919050565b60007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff1614610c9c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c9390613d8c565b60405180910390fd5b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b905090565b600080610cd183611992565b9050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415610d43576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d3a90613df8565b60405180910390fd5b80915050919050565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610dbd576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610db490613e8a565b60405180910390fd5b606860008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b610e0c6119cf565b610e166000611a4d565b565b60008060019054906101000a900460ff16159050808015610e495750600160008054906101000a900460ff1660ff16105b80610e765750610e583061127b565b158015610e755750600160008054906101000a900460ff1660ff16145b5b610eb5576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610eac90613f1c565b60405180910390fd5b60016000806101000a81548160ff021916908360ff1602179055508015610ef2576001600060016101000a81548160ff0219169083151502179055505b610f666040518060400160405280601081526020017f4365727469666963617465546f6b656e000000000000000000000000000000008152506040518060400160405280600381526020017f43544b0000000000000000000000000000000000000000000000000000000000815250611b13565b610f6e611b70565b610f76611bc1565b610f7e611c12565b610f86611c6b565b8015610fdf5760008060016101000a81548160ff0219169083151502179055507f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024986001604051610fd69190613f8e565b60405180910390a15b50565b600060fb60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60606066805461101b906138bb565b80601f0160208091040260200160405190810160405280929190818152602001828054611047906138bb565b80156110945780601f1061106957610100808354040283529160200191611094565b820191906000526020600020905b81548152906001019060200180831161107757829003601f168201915b5050505050905090565b6110b06110a9611363565b8383611cbc565b5050565b6110c56110bf611363565b83611424565b611104576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110fb90613a83565b60405180910390fd5b61111084848484611e29565b50505050565b606061112182611e85565b9050919050565b6111306119cf565b600061113d610191611f98565b905061114a610191611fa6565b6111548382611fbc565b61115e8183611fda565b505050565b6000606a60008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b6111ff6119cf565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141561126f576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016112669061401b565b60405180910390fd5b61127881611a4d565b50565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b60007f780e9d63000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061131157506113108261204e565b5b9050919050565b61132181612130565b611360576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161135790613df8565b60405180910390fd5b50565b600033905090565b816069600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff166113de83610cc5565b73ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b60008061143083610cc5565b90508073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16148061147257506114718185611163565b5b806114b057508373ffffffffffffffffffffffffffffffffffffffff1661149884610645565b73ffffffffffffffffffffffffffffffffffffffff16145b91505092915050565b8273ffffffffffffffffffffffffffffffffffffffff166114d982610cc5565b73ffffffffffffffffffffffffffffffffffffffff161461152f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611526906140ad565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16141561159f576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016115969061413f565b60405180910390fd5b6115ac8383836001612171565b8273ffffffffffffffffffffffffffffffffffffffff166115cc82610cc5565b73ffffffffffffffffffffffffffffffffffffffff1614611622576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611619906140ad565b60405180910390fd5b6069600082815260200190815260200160002060006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556001606860008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055506001606860008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540192505081905550816067600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a46117ae8383836001612183565b505050565b60006117e17f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b612189565b60000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6118126119cf565b50565b6118417f4910fdfa16fed3260ed0e7147f7cc6da11a60208b5b9406d12a635614ffd914360001b612193565b60000160009054906101000a900460ff1615611865576118608361219d565b61198d565b8273ffffffffffffffffffffffffffffffffffffffff166352d1902d6040518163ffffffff1660e01b815260040160206040518083038186803b1580156118ab57600080fd5b505afa9250505080156118dc57506040513d601f19601f820116820180604052508101906118d9919061418b565b60015b61191b576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016119129061422a565b60405180910390fd5b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b8114611980576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611977906142bc565b60405180910390fd5b5061198c838383612256565b5b505050565b60006067600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b6119d7611363565b73ffffffffffffffffffffffffffffffffffffffff166119f5610fe2565b73ffffffffffffffffffffffffffffffffffffffff1614611a4b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611a4290614328565b60405180910390fd5b565b600060fb60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690508160fb60006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600060019054906101000a900460ff16611b62576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611b59906143ba565b60405180910390fd5b611b6c8282612282565b5050565b600060019054906101000a900460ff16611bbf576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611bb6906143ba565b60405180910390fd5b565b600060019054906101000a900460ff16611c10576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611c07906143ba565b60405180910390fd5b565b600060019054906101000a900460ff16611c61576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611c58906143ba565b60405180910390fd5b611c69612303565b565b600060019054906101000a900460ff16611cba576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611cb1906143ba565b60405180910390fd5b565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415611d2b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611d2290614426565b60405180910390fd5b80606a60008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3183604051611e1c91906131f0565b60405180910390a3505050565b611e348484846114b9565b611e4084848484612364565b611e7f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611e76906144b8565b60405180910390fd5b50505050565b6060611e9082611318565b600060c960008481526020019081526020016000208054611eb0906138bb565b80601f0160208091040260200160405190810160405280929190818152602001828054611edc906138bb565b8015611f295780601f10611efe57610100808354040283529160200191611f29565b820191906000526020600020905b815481529060010190602001808311611f0c57829003601f168201915b505050505090506000611f3a6124fb565b9050600081511415611f50578192505050611f93565b600082511115611f85578082604051602001611f6d929190614514565b60405160208183030381529060405292505050611f93565b611f8e84612512565b925050505b919050565b600081600001549050919050565b6001816000016000828254019250508190555050565b611fd682826040518060200160405280600081525061257a565b5050565b611fe382612130565b612022576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401612019906145aa565b60405180910390fd5b8060c960008481526020019081526020016000209080519060200190612049929190613099565b505050565b60007f80ac58cd000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061211957507f5b5e139f000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b806121295750612128826125d5565b5b9050919050565b60008073ffffffffffffffffffffffffffffffffffffffff1661215283611992565b73ffffffffffffffffffffffffffffffffffffffff1614159050919050565b61217d8484848461263f565b50505050565b50505050565b6000819050919050565b6000819050919050565b6121a68161127b565b6121e5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016121dc9061463c565b60405180910390fd5b806122127f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b612189565b60000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b61225f8361279f565b60008251118061226c5750805b1561227d5761227b83836127ee565b505b505050565b600060019054906101000a900460ff166122d1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016122c8906143ba565b60405180910390fd5b81606590805190602001906122e7929190613099565b5080606690805190602001906122fe929190613099565b505050565b600060019054906101000a900460ff16612352576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401612349906143ba565b60405180910390fd5b61236261235d611363565b611a4d565b565b60006123858473ffffffffffffffffffffffffffffffffffffffff1661127b565b156124ee578373ffffffffffffffffffffffffffffffffffffffff1663150b7a026123ae611363565b8786866040518563ffffffff1660e01b81526004016123d094939291906146b1565b602060405180830381600087803b1580156123ea57600080fd5b505af192505050801561241b57506040513d601f19601f820116820180604052508101906124189190614712565b60015b61249e573d806000811461244b576040519150601f19603f3d011682016040523d82523d6000602084013e612450565b606091505b50600081511415612496576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161248d906144b8565b60405180910390fd5b805181602001fd5b63150b7a0260e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149150506124f3565b600190505b949350505050565b606060405180602001604052806000815250905090565b606061251d82611318565b60006125276124fb565b905060008151116125475760405180602001604052806000815250612572565b80612551846128d2565b604051602001612562929190614514565b6040516020818303038152906040525b915050919050565b61258483836129aa565b6125916000848484612364565b6125d0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016125c7906144b8565b60405180910390fd5b505050565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b61264b84848484612bc8565b600181111561268f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401612686906147b1565b60405180910390fd5b6000829050600073ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff1614156126d7576126d281612bce565b612716565b8373ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff1614612715576127148582612c17565b5b5b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1614156127595761275481612d84565b612798565b8473ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1614612797576127968482612e55565b5b5b5050505050565b6127a88161219d565b8073ffffffffffffffffffffffffffffffffffffffff167fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b60405160405180910390a250565b60606127f98361127b565b612838576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161282f90614843565b60405180910390fd5b6000808473ffffffffffffffffffffffffffffffffffffffff1684604051612860919061489f565b600060405180830381855af49150503d806000811461289b576040519150601f19603f3d011682016040523d82523d6000602084013e6128a0565b606091505b50915091506128c88282604051806060016040528060278152602001614a5060279139612ed4565b9250505092915050565b6060600060016128e184612ef6565b01905060008167ffffffffffffffff811115612900576128ff6134a5565b5b6040519080825280601f01601f1916602001820160405280156129325781602001600182028036833780820191505090505b509050600082602001820190505b60011561299f578080600190039150507f3031323334353637383961626364656600000000000000000000000000000000600a86061a8153600a8581612989576129886148b6565b5b049450600085141561299a5761299f565b612940565b819350505050919050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415612a1a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401612a1190614931565b60405180910390fd5b612a2381612130565b15612a63576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401612a5a9061499d565b60405180910390fd5b612a71600083836001612171565b612a7a81612130565b15612aba576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401612ab19061499d565b60405180910390fd5b6001606860008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540192505081905550816067600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4612bc4600083836001612183565b5050565b50505050565b609980549050609a600083815260200190815260200160002081905550609981908060018154018082558091505060019003906000526020600020016000909190919091505550565b60006001612c2484610d4c565b612c2e91906149ec565b9050600060986000848152602001908152602001600020549050818114612d13576000609760008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600084815260200190815260200160002054905080609760008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600084815260200190815260200160002081905550816098600083815260200190815260200160002081905550505b6098600084815260200190815260200160002060009055609760008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008381526020019081526020016000206000905550505050565b60006001609980549050612d9891906149ec565b90506000609a6000848152602001908152602001600020549050600060998381548110612dc857612dc7613ceb565b5b906000526020600020015490508060998381548110612dea57612de9613ceb565b5b906000526020600020018190555081609a600083815260200190815260200160002081905550609a6000858152602001908152602001600020600090556099805480612e3957612e38614a20565b5b6001900381819060005260206000200160009055905550505050565b6000612e6083610d4c565b905081609760008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600083815260200190815260200160002081905550806098600084815260200190815260200160002081905550505050565b60608315612ee457829050612eef565b612eee8383613049565b5b9392505050565b600080600090507a184f03e93ff9f4daa797ed6e38ed64bf6a1f0100000000000000008310612f54577a184f03e93ff9f4daa797ed6e38ed64bf6a1f0100000000000000008381612f4a57612f496148b6565b5b0492506040810190505b6d04ee2d6d415b85acef81000000008310612f91576d04ee2d6d415b85acef81000000008381612f8757612f866148b6565b5b0492506020810190505b662386f26fc100008310612fc057662386f26fc100008381612fb657612fb56148b6565b5b0492506010810190505b6305f5e1008310612fe9576305f5e1008381612fdf57612fde6148b6565b5b0492506008810190505b612710831061300e576127108381613004576130036148b6565b5b0492506004810190505b606483106130315760648381613027576130266148b6565b5b0492506002810190505b600a8310613040576001810190505b80915050919050565b60008251111561305c5781518083602001fd5b806040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161309091906132a4565b60405180910390fd5b8280546130a5906138bb565b90600052602060002090601f0160209004810192826130c7576000855561310e565b82601f106130e057805160ff191683800117855561310e565b8280016001018555821561310e579182015b8281111561310d5782518255916020019190600101906130f2565b5b50905061311b919061311f565b5090565b5b80821115613138576000816000905550600101613120565b5090565b6000604051905090565b600080fd5b600080fd5b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b61318581613150565b811461319057600080fd5b50565b6000813590506131a28161317c565b92915050565b6000602082840312156131be576131bd613146565b5b60006131cc84828501613193565b91505092915050565b60008115159050919050565b6131ea816131d5565b82525050565b600060208201905061320560008301846131e1565b92915050565b600081519050919050565b600082825260208201905092915050565b60005b8381101561324557808201518184015260208101905061322a565b83811115613254576000848401525b50505050565b6000601f19601f8301169050919050565b60006132768261320b565b6132808185613216565b9350613290818560208601613227565b6132998161325a565b840191505092915050565b600060208201905081810360008301526132be818461326b565b905092915050565b6000819050919050565b6132d9816132c6565b81146132e457600080fd5b50565b6000813590506132f6816132d0565b92915050565b60006020828403121561331257613311613146565b5b6000613320848285016132e7565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061335482613329565b9050919050565b61336481613349565b82525050565b600060208201905061337f600083018461335b565b92915050565b61338e81613349565b811461339957600080fd5b50565b6000813590506133ab81613385565b92915050565b600080604083850312156133c8576133c7613146565b5b60006133d68582860161339c565b92505060206133e7858286016132e7565b9150509250929050565b6133fa816132c6565b82525050565b600060208201905061341560008301846133f1565b92915050565b60008060006060848603121561343457613433613146565b5b60006134428682870161339c565b93505060206134538682870161339c565b9250506040613464868287016132e7565b9150509250925092565b60006020828403121561348457613483613146565b5b60006134928482850161339c565b91505092915050565b600080fd5b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6134dd8261325a565b810181811067ffffffffffffffff821117156134fc576134fb6134a5565b5b80604052505050565b600061350f61313c565b905061351b82826134d4565b919050565b600067ffffffffffffffff82111561353b5761353a6134a5565b5b6135448261325a565b9050602081019050919050565b82818337600083830152505050565b600061357361356e84613520565b613505565b90508281526020810184848401111561358f5761358e6134a0565b5b61359a848285613551565b509392505050565b600082601f8301126135b7576135b661349b565b5b81356135c7848260208601613560565b91505092915050565b600080604083850312156135e7576135e6613146565b5b60006135f58582860161339c565b925050602083013567ffffffffffffffff8111156136165761361561314b565b5b613622858286016135a2565b9150509250929050565b6000819050919050565b61363f8161362c565b82525050565b600060208201905061365a6000830184613636565b92915050565b613669816131d5565b811461367457600080fd5b50565b60008135905061368681613660565b92915050565b600080604083850312156136a3576136a2613146565b5b60006136b18582860161339c565b92505060206136c285828601613677565b9150509250929050565b600080600080608085870312156136e6576136e5613146565b5b60006136f48782880161339c565b94505060206137058782880161339c565b9350506040613716878288016132e7565b925050606085013567ffffffffffffffff8111156137375761373661314b565b5b613743878288016135a2565b91505092959194509250565b600067ffffffffffffffff82111561376a576137696134a5565b5b6137738261325a565b9050602081019050919050565b600061379361378e8461374f565b613505565b9050828152602081018484840111156137af576137ae6134a0565b5b6137ba848285613551565b509392505050565b600082601f8301126137d7576137d661349b565b5b81356137e7848260208601613780565b91505092915050565b6000806040838503121561380757613806613146565b5b60006138158582860161339c565b925050602083013567ffffffffffffffff8111156138365761383561314b565b5b613842858286016137c2565b9150509250929050565b6000806040838503121561386357613862613146565b5b60006138718582860161339c565b92505060206138828582860161339c565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806138d357607f821691505b602082108114156138e7576138e661388c565b5b50919050565b7f4552433732313a20617070726f76616c20746f2063757272656e74206f776e6560008201527f7200000000000000000000000000000000000000000000000000000000000000602082015250565b6000613949602183613216565b9150613954826138ed565b604082019050919050565b600060208201905081810360008301526139788161393c565b9050919050565b7f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60008201527f6b656e206f776e6572206f7220617070726f76656420666f7220616c6c000000602082015250565b60006139db603d83613216565b91506139e68261397f565b604082019050919050565b60006020820190508181036000830152613a0a816139ce565b9050919050565b7f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560008201527f72206f7220617070726f76656400000000000000000000000000000000000000602082015250565b6000613a6d602d83613216565b9150613a7882613a11565b604082019050919050565b60006020820190508181036000830152613a9c81613a60565b9050919050565b7f455243373231456e756d657261626c653a206f776e657220696e646578206f7560008201527f74206f6620626f756e6473000000000000000000000000000000000000000000602082015250565b6000613aff602b83613216565b9150613b0a82613aa3565b604082019050919050565b60006020820190508181036000830152613b2e81613af2565b9050919050565b7f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060008201527f64656c656761746563616c6c0000000000000000000000000000000000000000602082015250565b6000613b91602c83613216565b9150613b9c82613b35565b604082019050919050565b60006020820190508181036000830152613bc081613b84565b9050919050565b7f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060008201527f6163746976652070726f78790000000000000000000000000000000000000000602082015250565b6000613c23602c83613216565b9150613c2e82613bc7565b604082019050919050565b60006020820190508181036000830152613c5281613c16565b9050919050565b7f455243373231456e756d657261626c653a20676c6f62616c20696e646578206f60008201527f7574206f6620626f756e64730000000000000000000000000000000000000000602082015250565b6000613cb5602c83613216565b9150613cc082613c59565b604082019050919050565b60006020820190508181036000830152613ce481613ca8565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f555550535570677261646561626c653a206d757374206e6f742062652063616c60008201527f6c6564207468726f7567682064656c656761746563616c6c0000000000000000602082015250565b6000613d76603883613216565b9150613d8182613d1a565b604082019050919050565b60006020820190508181036000830152613da581613d69565b9050919050565b7f4552433732313a20696e76616c696420746f6b656e2049440000000000000000600082015250565b6000613de2601883613216565b9150613ded82613dac565b602082019050919050565b60006020820190508181036000830152613e1181613dd5565b9050919050565b7f4552433732313a2061646472657373207a65726f206973206e6f74206120766160008201527f6c6964206f776e65720000000000000000000000000000000000000000000000602082015250565b6000613e74602983613216565b9150613e7f82613e18565b604082019050919050565b60006020820190508181036000830152613ea381613e67565b9050919050565b7f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160008201527f647920696e697469616c697a6564000000000000000000000000000000000000602082015250565b6000613f06602e83613216565b9150613f1182613eaa565b604082019050919050565b60006020820190508181036000830152613f3581613ef9565b9050919050565b6000819050919050565b600060ff82169050919050565b6000819050919050565b6000613f78613f73613f6e84613f3c565b613f53565b613f46565b9050919050565b613f8881613f5d565b82525050565b6000602082019050613fa36000830184613f7f565b92915050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b6000614005602683613216565b915061401082613fa9565b604082019050919050565b6000602082019050818103600083015261403481613ff8565b9050919050565b7f4552433732313a207472616e736665722066726f6d20696e636f72726563742060008201527f6f776e6572000000000000000000000000000000000000000000000000000000602082015250565b6000614097602583613216565b91506140a28261403b565b604082019050919050565b600060208201905081810360008301526140c68161408a565b9050919050565b7f4552433732313a207472616e7366657220746f20746865207a65726f2061646460008201527f7265737300000000000000000000000000000000000000000000000000000000602082015250565b6000614129602483613216565b9150614134826140cd565b604082019050919050565b600060208201905081810360008301526141588161411c565b9050919050565b6141688161362c565b811461417357600080fd5b50565b6000815190506141858161415f565b92915050565b6000602082840312156141a1576141a0613146565b5b60006141af84828501614176565b91505092915050565b7f45524331393637557067726164653a206e657720696d706c656d656e7461746960008201527f6f6e206973206e6f742055555053000000000000000000000000000000000000602082015250565b6000614214602e83613216565b915061421f826141b8565b604082019050919050565b6000602082019050818103600083015261424381614207565b9050919050565b7f45524331393637557067726164653a20756e737570706f727465642070726f7860008201527f6961626c65555549440000000000000000000000000000000000000000000000602082015250565b60006142a6602983613216565b91506142b18261424a565b604082019050919050565b600060208201905081810360008301526142d581614299565b9050919050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b6000614312602083613216565b915061431d826142dc565b602082019050919050565b6000602082019050818103600083015261434181614305565b9050919050565b7f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960008201527f6e697469616c697a696e67000000000000000000000000000000000000000000602082015250565b60006143a4602b83613216565b91506143af82614348565b604082019050919050565b600060208201905081810360008301526143d381614397565b9050919050565b7f4552433732313a20617070726f766520746f2063616c6c657200000000000000600082015250565b6000614410601983613216565b915061441b826143da565b602082019050919050565b6000602082019050818103600083015261443f81614403565b9050919050565b7f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560008201527f63656976657220696d706c656d656e7465720000000000000000000000000000602082015250565b60006144a2603283613216565b91506144ad82614446565b604082019050919050565b600060208201905081810360008301526144d181614495565b9050919050565b600081905092915050565b60006144ee8261320b565b6144f881856144d8565b9350614508818560208601613227565b80840191505092915050565b600061452082856144e3565b915061452c82846144e3565b91508190509392505050565b7f45524337323155524953746f726167653a2055524920736574206f66206e6f6e60008201527f6578697374656e7420746f6b656e000000000000000000000000000000000000602082015250565b6000614594602e83613216565b915061459f82614538565b604082019050919050565b600060208201905081810360008301526145c381614587565b9050919050565b7f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60008201527f6f74206120636f6e747261637400000000000000000000000000000000000000602082015250565b6000614626602d83613216565b9150614631826145ca565b604082019050919050565b6000602082019050818103600083015261465581614619565b9050919050565b600081519050919050565b600082825260208201905092915050565b60006146838261465c565b61468d8185614667565b935061469d818560208601613227565b6146a68161325a565b840191505092915050565b60006080820190506146c6600083018761335b565b6146d3602083018661335b565b6146e060408301856133f1565b81810360608301526146f28184614678565b905095945050505050565b60008151905061470c8161317c565b92915050565b60006020828403121561472857614727613146565b5b6000614736848285016146fd565b91505092915050565b7f455243373231456e756d657261626c653a20636f6e736563757469766520747260008201527f616e7366657273206e6f7420737570706f727465640000000000000000000000602082015250565b600061479b603583613216565b91506147a68261473f565b604082019050919050565b600060208201905081810360008301526147ca8161478e565b9050919050565b7f416464726573733a2064656c65676174652063616c6c20746f206e6f6e2d636f60008201527f6e74726163740000000000000000000000000000000000000000000000000000602082015250565b600061482d602683613216565b9150614838826147d1565b604082019050919050565b6000602082019050818103600083015261485c81614820565b9050919050565b600081905092915050565b60006148798261465c565b6148838185614863565b9350614893818560208601613227565b80840191505092915050565b60006148ab828461486e565b915081905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f4552433732313a206d696e7420746f20746865207a65726f2061646472657373600082015250565b600061491b602083613216565b9150614926826148e5565b602082019050919050565b6000602082019050818103600083015261494a8161490e565b9050919050565b7f4552433732313a20746f6b656e20616c7265616479206d696e74656400000000600082015250565b6000614987601c83613216565b915061499282614951565b602082019050919050565b600060208201905081810360008301526149b68161497a565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006149f7826132c6565b9150614a02836132c6565b925082821015614a1557614a146149bd565b5b828203905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603160045260246000fdfe416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a2646970667358221220b58853a0bcb4e124125e5fe1837100903dc241de3879924b8e8f15a9f6e5892164736f6c63430008090033';
      const walletAddress = await ethersProvider.listAccounts() ;
      var address = "0x25b905eE4b2408dbbe9A47A56e71dc6b8A644ae3";
      var receiver = "0x65009e86D16A62abF012287dAD15CCd1B1967E20";
      var contractAddress = "0x3560DD028081d4612D9D1737C6cF02A47D7f6337";
      //logic to deploy Smart contract
      // const factory = new ContractFactory(SmartContractABI, contractByteCode, signer);
      // const contract = await factory.deploy();
      
      // Load Smart contract
      const myContract = new ethers.Contract(contractAddress, SmartContractABI, signer);
      // Logic to fetch smart contract name
      //const response = await myContract.name();

      //Logic to perform safeMint
      const response = await myContract.safeMint(receiver,"ipfs://QmVRk3Xjw1NNvevvWTw1oxbQjyMtxxGBxUwukpUUFaR83K");
      //const response = "";

      return {smartContractAddress: SmartContractAddress,from: address, to: walletAddress, contract: response};
    } catch (error) {
      return error as string;
    }
  }
}