/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-shadow */
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import { MetamaskAdapter } from "@web3auth/metamask-adapter";
import { Web3Auth } from "@web3auth/modal";
import { TorusWalletAdapter } from "@web3auth/torus-evm-adapter";
import CustomPopUp from "./MintCertificatePopUp"
import RPC from "./api/ethersRPC"; // for using ethers.js
// Plugins
import { TorusWalletConnectorPlugin } from "@web3auth/torus-wallet-connector-plugin";
// Adapters
import { WalletConnectV1Adapter } from "@web3auth/wallet-connect-v1-adapter";
import { useEffect, useState, useRef  } from "react";

//import RPC from "./api/web3RPC"; // for using web3.js
import axios from "axios";
import { ethers } from "ethers";
import Moralis from "./api/moralis";
import { memoryUsage } from "process";

const clientId = "BEglQSgt4cUWcj6SKRdu5QkOXTsePmMcusG5EAoyjyOYKlVRjIF1iCNnMOTfpzCiunHRrMui8TIwQPXdkQ8Yxuk"; // get from https://dashboard.web3auth.io


function App() {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [torusPlugin, setTorusPlugin] = useState<TorusWalletConnectorPlugin | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(null);
  const [activeIndex, setActiveIndex] = useState(-1);

  //form data
  const [dataOne, setDataOne] = useState("")
  const [dataTwo, setDataTwo] = useState("")
  const [dataThree, setDataThree] = useState("")
  const [mintCertificatePop, setMintCertificate] = useState(false)
  const ref = useRef(null);

  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId,
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x1",
            rpcTarget: "https://rpc.ankr.com/eth", // This is the public RPC we have added, please pass on your own endpoint while creating an app
          },
          web3AuthNetwork: "cyan",
        });

        // plugins and adapters are optional and can be added as per your requirement
        // read more about plugins here: https://web3auth.io/docs/sdk/web/plugins/

        // adding torus wallet connector plugin

        const torusPlugin = new TorusWalletConnectorPlugin({
          torusWalletOpts: {},
          walletInitOptions: {
            whiteLabel: {
              theme: { isDark: true, colors: { primary: "#00a8ff" } },
              logoDark: "https://web3auth.io/images/w3a-L-Favicon-1.svg",
              logoLight: "https://web3auth.io/images/w3a-D-Favicon-1.svg",
            },
            useWalletConnect: true,
            enableLogging: true,
          },
        });
        setTorusPlugin(torusPlugin);
        await web3auth.addPlugin(torusPlugin);

        // read more about adapters here: https://web3auth.io/docs/sdk/web/adapters/

        // adding wallet connect v1 adapter

        const walletConnectV1Adapter = new WalletConnectV1Adapter({
          adapterSettings: {
            bridge: "https://bridge.walletconnect.org",
          },
          clientId,
        });

        web3auth.configureAdapter(walletConnectV1Adapter);

        // adding metamask adapter

        const metamaskAdapter = new MetamaskAdapter({
          clientId,
          sessionTime: 3600, // 1 hour in seconds
          web3AuthNetwork: "cyan",
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x1",
            rpcTarget: "https://rpc.ankr.com/eth", // This is the public RPC we have added, please pass on your own endpoint while creating an app
          },
        });
        // we can change the above settings using this function
        metamaskAdapter.setAdapterSettings({
          sessionTime: 86400, // 1 day in seconds
          web3AuthNetwork: "cyan",
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x13881",
            rpcTarget: "https://matic-mumbai.chainstacklabs.com", // This is the public RPC we have added, please pass on your own endpoint while creating an app
            blockExplorer: "https://mumbai.polygonscan.com/",
            displayName: "Polygon Mumbai Testnet",
            ticker: "MATIC",
            tickerName: "Matic",
          }
        });

        // it will add/update  the metamask adapter in to web3auth class
        web3auth.configureAdapter(metamaskAdapter);

        const torusWalletAdapter = new TorusWalletAdapter({
          clientId,
        });

        // it will add/update  the torus-evm adapter in to web3auth class
        web3auth.configureAdapter(torusWalletAdapter);

        setWeb3auth(web3auth);

        await web3auth.initModal();
        if (web3auth.provider) {
          setProvider(web3auth.provider);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const fetchPokemon = async () => {
    const res = await axios.get(
      'https://pokeapi.co/api/v2/pokemon/pikachu'
    );
    uiConsole(res);
    return;
  };

  const mintCert = async () => {
    setMintCertificate(!mintCertificatePop)
  };

  const onChange = (key: string, evt: any) => {
    let value = evt?.target?.value;
    switch (key) {
      case "dataOne":
        setDataOne(value)
        break;

      case "dataTwo":
        setDataTwo(value)
        break;

      case "dataThree":
        setDataThree(value)
        break;

      default:
        break;
    }
  };

  const onSubmit=async ()=>{
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const contractAddress = await rpc.mintCertificate(dataOne, dataTwo, dataThree);
    setMintCertificate(!mintCertificatePop)
    // uiConsole(dataOne,dataTwo,dataThree);
    uiConsole(contractAddress);
  }


  const uploadToIPFS = async () => {
    var data = new FormData();
    data.append('path', 'Hello Aritra!!!!!!!!');
    //data.append('path', fs.createReadStream('/C:/Users/saika/Pictures/tick.png'));
    var config = {
      method: 'post',
      url: 'https://ipfs.infura.io:5001/api/v0/add',
      headers: {
        'Authorization': 'Basic MlBQdmtEQWRkR3JGR2Q0RnJKeTlVRUJyT2NGOjkyODY0ZjA2YWYxZTg0MzJkMTM5ZjQ1ZWJmNDIzMjk1'
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        uiConsole(response.data);
      })
      .catch(function (error) {
        console.log(error);
        uiConsole(error);
      });
    return;
  };

  const ipfsUploadImage = async () => {
    var response = await axios.get('/api/ipfs-upload-image');
    uiConsole(response);
    return;
  };

  const ipfsUploadMetadata = async () => {
    var response = await axios.get('/api/ipfs-upload-metadata');
    uiConsole(response);
    return;
  };

  const login = async () => {
    if (!web3auth) {
      uiConsole("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
    uiConsole("Logged in Successfully!");
  };

  const authenticateUser = async () => {
    if (!web3auth) {
      uiConsole("web3auth not initialized yet");
      return;
    }
    const idToken = await web3auth.authenticateUser();
    uiConsole(idToken);
  };

  const getUserInfo = async () => {
    if (!web3auth) {
      uiConsole("web3auth not initialized yet");
      return;
    }
    const user = await web3auth.getUserInfo();
    uiConsole(user);
  };

  const logout = async () => {
    if (!web3auth) {
      uiConsole("web3auth not initialized yet");
      return;
    }
    await web3auth.logout();
    setProvider(null);
  };

  const showWCM = async () => {
    if (!torusPlugin) {
      uiConsole("torus plugin not initialized yet");
      return;
    }
    torusPlugin.showWalletConnectScanner();
    uiConsole();
  };

  const initiateTopUp = async () => {
    if (!torusPlugin) {
      uiConsole("torus plugin not initialized yet");
      return;
    }
    torusPlugin.initiateTopup("moonpay", {
      selectedAddress: "0x8cFa648eBfD5736127BbaBd1d3cAe221B45AB9AF",
      selectedCurrency: "USD",
      fiatValue: 100,
      selectedCryptoCurrency: "ETH",
      chainNetwork: "mainnet",
    });
  };

  const getChainId = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const chainId = await rpc.getChainId();
    uiConsole(chainId);
  };


  const mintCertificate = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const response = await rpc.mintCertificate("","","");
    uiConsole(response);
  };


  const listOwneredNFT = async () => {
    const rpc = new RPC(provider);
    const address = await rpc.getAccounts();
    const moralis = new Moralis();
    var response = await moralis.getOwnedTokens(address);
    displayCards(response);
    return;
  };

  const addChain = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const newChain = {
      chainId: "0x5",
      displayName: "Goerli",
      chainNamespace: CHAIN_NAMESPACES.EIP155,
      tickerName: "Goerli",
      ticker: "ETH",
      decimals: 18,
      rpcTarget: "https://rpc.ankr.com/eth_goerli",
      blockExplorer: "https://goerli.etherscan.io",
    };
    await web3auth?.addChain(newChain);
    uiConsole("New Chain Added");
  };

  const switchChain = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    await web3auth?.switchChain({ chainId: "0x5" });
    uiConsole("Chain Switched");
  };

  const getAccounts = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const address = await rpc.getAccounts();
    uiConsole(address);
  };

  const getBalance = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const balance = await rpc.getBalance();
    uiConsole(balance);
  };

  const sendTransaction = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const receipt = await rpc.sendTransaction();
    uiConsole(receipt);
  };

  const signMessage = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const signedMessage = await rpc.signMessage();
    uiConsole(signedMessage);
  };

  const getPrivateKey = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const privateKey = await rpc.getPrivateKey();
    uiConsole(privateKey);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function uiConsole(...args: any[]): void {
    const el = document.querySelector("#console>p");
    if (el) {
      //el.innerHTML = JSON.stringify(args || {}, null, 1);
      const stringValue = JSON.stringify(args);
      var cleanedString = "";
      if (stringValue) {
        cleanedString = stringValue.substring(1, stringValue.length - 1);
      }
      if (cleanedString && cleanedString != "ul") {
        el.innerHTML = cleanedString;
      } else {
        el.innerHTML = "No data"
      }
    }
  }

  function displayCards(...args: any[]): void {
    const el = document.querySelector("#console>p");

    if (el) {
      var htmltable = "<table><thead><tr><th>Token Address</th><th>Name</th><th>Block Number</th><th>Image</th></tr></thead><tbody>"
      for (let val in args[0]) {
        htmltable += "<tr><td> " + args[0][val].tokenId + " </td><td> " + args[0][val].name + " </td><td> " + args[0][val].blockNumber + " </td><td><img src='https://ipfs.io/ipfs/" + args[0][val].metadata.image + "' height=120 width=120/></td></tr>";
      }

      htmltable += "</tbody></table>";
      el.innerHTML = htmltable;
      // el.innerHTML = JSON.stringify(args[0]);
      // mytable += "contractType: " + token + "</br>";
    }
  }

  function handleButtonClick(params: String, index: any) {
    setActiveIndex(index);
    if (params == "getUserInfo") {
      getUserInfo();
    } else if (params == "mintCertificate") {
      mintCertificate();
    } else if (params == "listOwneredNFT") {
      listOwneredNFT();
    } else if (params == "authenticateUser") {
      authenticateUser();
    } else if (params == "getChainId") {
      getChainId();
    } else if (params == "getAccounts") {
      getAccounts();
    } else if (params == "getBalance") {
      getBalance();
    } else if (params == "logout") {
      logout();
    } else if (params == "mintCert") {
      mintCert();
    }
  }

  const loggedInView = (
    <>
      <div className="flex-container">

        <div>
          <button onClick={() => handleButtonClick('mintCert', 1)} className={activeIndex === 1 ? "active" : "button"}>
          Mint Certificate
          </button>
        </div>
        <div>
          <button onClick={() => handleButtonClick('mintCertificate', 2)} className={activeIndex === 2 ? "active" : "button"}>
            Issue Certificate to Employee
          </button>
        </div>
        <div>
          <button onClick={() => handleButtonClick('listOwneredNFT', 3)} className={activeIndex === 3 ? "active" : "button"}>
            List Owned NFT
          </button>
        </div>
        <div>
          <button onClick={() => handleButtonClick('authenticateUser', 4)} className={activeIndex === 4 ? "active" : "button"}>
            Get ID Token
          </button>
        </div>
        <div>
          <button onClick={() => handleButtonClick('getChainId', 5)} className={activeIndex === 5 ? "active" : "button"}>
            Get Chain ID
          </button>
        </div>
        <div>
          <button onClick={() => handleButtonClick('getAccounts', 6)} className={activeIndex === 6 ? "active" : "button"}>
            Get Accounts
          </button>
        </div>
        <div>
          <button onClick={() => handleButtonClick('getBalance', 7)} className={activeIndex === 7 ? "active" : "button"}>
            Get Balance
          </button>
        </div>
        <div>
          <button onClick={() => handleButtonClick('logout', 8)} className={activeIndex === 8 ? "active" : "logout"} style={{ backgroundColor: "red" }}>
            Log Out
          </button>
        </div>
      </div>
      <div id="console" style={{ whiteSpace: "pre-line" }}>
        <p></p>
      </div>
    </>
  );

  const unloggedInView = (
    <div className="div-center">
      <button onClick={login}>
        <b>Login</b>
      </button>
    </div>
  );

  return (
    <div className="container">
      <div className="card-layer">
        <h1 className="title">
          Professional Digital Wallet Demo
        </h1>

        <div className="grid">{provider ? loggedInView : unloggedInView}</div>

        {provider && mintCertificate && (
        <CustomPopUp
          onClose={() => {
            setMintCertificate(false);
          }}
          show={mintCertificate}
          title="Mint Certificate"
          onchange={onChange}
          onsubmit={onSubmit}
        ></CustomPopUp>
        )}
      </div>
    </div>
  );
}

export default App;
