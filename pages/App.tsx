/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-shadow */
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Navbar, Nav, Form, Button, Table, Modal } from 'react-bootstrap';

import { CHAIN_NAMESPACES, SafeEventEmitterProvider, WALLET_ADAPTERS } from "@web3auth/base";
import { MetamaskAdapter } from "@web3auth/metamask-adapter";
import { Web3Auth } from "@web3auth/modal";
import { TorusWalletAdapter } from "@web3auth/torus-evm-adapter";
import QRCodeModal from "@walletconnect/qrcode-modal";
import CustomPopUp from "./MintCertificatePopUp"
import RPC from "./api/ethersRPC"; // for using ethers.js
import webRPC from "./api/web3RPC";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
// Plugins
import { TorusWalletConnectorPlugin } from "@web3auth/torus-wallet-connector-plugin";
// Adapters
import { WalletConnectV2Adapter, getWalletConnectV2Settings } from "@web3auth/wallet-connect-v2-adapter";
import { useEffect, useState, useRef } from "react";

//import RPC from "./api/web3RPC"; // for using web3.js
import axios from "axios";
//import { ethers } from "ethers";
import Moralis from "./api/moralis";
//import { memoryUsage } from "process";


const clientId = "BMzJCEsDlTSQu0984cnmm0rsVS8AX59rfFUrOXSy0LLAKcp9oMBu3TtuF9ymnFm2T30z--vPvIthrYOi5-vgE5E"; // get from https://dashboard.web3auth.io


function App() {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [torusPlugin, setTorusPlugin] = useState<TorusWalletConnectorPlugin | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [showModal, setShowModal] = useState(false);

  //form data
  const [receiverAddress, setreceiverAddress] = useState("")
  const [certName, setcertName] = useState("")
  const [certificateTextPhrase, setcertificateTextPhrase] = useState("")
  const [certificateDescription, setcertificateDescription] = useState("")
  const [mintCertificatePop, setMintCertificate] = useState(false)
  const ref = useRef(null);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const init = async () => {
      // try {
      //   const web3auth = new Web3Auth({
      //     clientId,
      //     chainConfig: {
      //       chainNamespace: CHAIN_NAMESPACES.EIP155,
      //       chainId: "0x1",
      //       rpcTarget: "https://rpc.ankr.com/eth", // This is the public RPC we have added, please pass on your own endpoint while creating an app
      //     },
      //     web3AuthNetwork: "cyan",
      //   });

      //   // plugins and adapters are optional and can be added as per your requirement
      //   // read more about plugins here: https://web3auth.io/docs/sdk/web/plugins/

      //   // adding torus wallet connector plugin

      //   const torusPlugin = new TorusWalletConnectorPlugin({
      //     torusWalletOpts: {},
      //     walletInitOptions: {
      //       whiteLabel: {
      //         theme: { isDark: true, colors: { primary: "#00a8ff" } },
      //         logoDark: "https://web3auth.io/images/w3a-L-Favicon-1.svg",
      //         logoLight: "https://web3auth.io/images/w3a-D-Favicon-1.svg",
      //       },
      //       useWalletConnect: true,
      //       enableLogging: true,
      //     },
      //   });
      //   setTorusPlugin(torusPlugin);
      //   await web3auth.addPlugin(torusPlugin);

      //   // read more about adapters here: https://web3auth.io/docs/sdk/web/adapters/

      //   // adding wallet connect v1 adapter

      //   const walletConnectV2Adapter = new WalletConnectV2Adapter({
      //     adapterSettings: {
      //       bridge: "https://bridge.walletconnect.org",
      //     },
      //     clientId,
      //   });

      //   web3auth.configureAdapter(walletConnectV2Adapter);

      //   // adding metamask adapter

      //   const metamaskAdapter = new MetamaskAdapter({
      //     clientId,
      //     sessionTime: 3600, // 1 hour in seconds
      //     web3AuthNetwork: "cyan",
      //     chainConfig: {
      //       chainNamespace: CHAIN_NAMESPACES.EIP155,
      //       chainId: "0x1",
      //       rpcTarget: "https://rpc.ankr.com/eth", // This is the public RPC we have added, please pass on your own endpoint while creating an app
      //     },
      //   });
      //   // we can change the above settings using this function
      //   metamaskAdapter.setAdapterSettings({
      //     sessionTime: 86400, // 1 day in seconds
      //     web3AuthNetwork: "cyan",
      //     chainConfig: {
      //       chainNamespace: CHAIN_NAMESPACES.EIP155,
      //       chainId: "0x13881",
      //       rpcTarget: "https://matic-mumbai.chainstacklabs.com", // This is the public RPC we have added, please pass on your own endpoint while creating an app
      //       blockExplorer: "https://mumbai.polygonscan.com/",
      //       displayName: "Polygon Mumbai Testnet",
      //       ticker: "MATIC",
      //       tickerName: "Matic",
      //     }
      //   });

      //   // it will add/update  the metamask adapter in to web3auth class
      //   web3auth.configureAdapter(metamaskAdapter);

      //   const torusWalletAdapter = new TorusWalletAdapter({
      //     clientId,
      //   });

      //   // it will add/update  the torus-evm adapter in to web3auth class
      //   web3auth.configureAdapter(torusWalletAdapter);

      //   setWeb3auth(web3auth);

      //   await web3auth.initModal();
      //   if (web3auth.provider) {
      //     setProvider(web3auth.provider);
      //   }
      // } catch (error) {
      //   console.error(error);
      // }
      
      // Non Modal
      try {
        const web3auth = new Web3AuthNoModal({
          clientId,
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x13881",
            rpcTarget: "https://matic-mumbai.chainstacklabs.com", // This is the public RPC we have added, please pass on your own endpoint while creating an app
            blockExplorer: "https://mumbai.polygonscan.com/",
            displayName: "Polygon Mumbai Testnet",
            ticker: "MATIC",
            tickerName: "Matic", // This is the public RPC we have added, please pass on your own endpoint while creating an app
          },
          web3AuthNetwork: "cyan",
        });

        setWeb3auth(web3auth);

        const openloginAdapter = new OpenloginAdapter();
        web3auth.configureAdapter(openloginAdapter);

        // adding wallet connect v2 adapter
        const defaultWcSettings = await getWalletConnectV2Settings("eip155", [1, 137, 5], "04309ed1007e77d1f119b85205bb779d")
        const walletConnectV2Adapter = new WalletConnectV2Adapter({
          adapterSettings: { qrcodeModal: QRCodeModal, ...defaultWcSettings.adapterSettings },
          loginSettings: { ...defaultWcSettings.loginSettings },
        });

        web3auth.configureAdapter(walletConnectV2Adapter);

        await web3auth.init();
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

  const enlistCert = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new webRPC(provider);
    const contractAddress = await rpc.enlistCertificate();
    uiConsole(contractAddress);
    
  }

  const onChange = (key: string, evt: any) => {
    let value = evt?.target?.value;
    switch (key) {
      case "receiverAddress":
        setreceiverAddress(value)
        break;

      case "certName":
        setcertName(value)
        break;

      case "certificateTextPhrase":
        setcertificateTextPhrase(value)
        break;

      case "certificateDescription":
        setcertificateDescription(value)
        break;

      default:
        break;
    }
  };


  const onGenerate = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    //const rpc = new RPC(provider);

    var response = await axios.get('/api/ai-generate-img', { params: { certificateTextPhrase: certificateTextPhrase } });
    uiConsole(certificateTextPhrase);
  }

  const onSubmit = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new webRPC(provider);

    var response = await axios.get('/api/ipfs-upload-image',
      { params: { certificateName: certName, receiverAddress: receiverAddress, certificateTextPhrase: certificateTextPhrase, certificateDescription: certificateDescription } });
    console.log("Certificate Text Phrase: " + certificateTextPhrase + " Receiver:" + receiverAddress + " Certificate Description: " + certificateDescription );
    const contractAddress = await rpc.mintCertificate(receiverAddress, response.data);
    setMintCertificate(!mintCertificatePop)
    console.log("Response: " + contractAddress);
    // uiConsole(receiverAddress,certificateTextPhrase,certificateDescription);
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

  const login = async () => {
    if (!web3auth) {
      uiConsole("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
    uiConsole("Logged in Successfully!");
  };

  const loginSocial = async () => {
    if (!web3auth) {
      uiConsole("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connectTo(
      WALLET_ADAPTERS.OPENLOGIN,
      {
        loginProvider: "google",
      }
    );
    setProvider(web3authProvider);
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
    const rpc = new webRPC(provider);
    const response = await rpc.mintCertificate("", "", "");
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
    const el = document.querySelector("#console");
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
    const el = document.querySelector("#console");

    if (el) {
      var htmltable = "<Table striped bordered hover><thead><tr><th>Token Address</th><th>Name</th><th>Block Number</th><th>Image</th></tr></thead><tbody>"
      for (let val in args[0]) {
        var imgSrc = "https://commons.wikimedia.org/w/index.php?lang=en&title=File%3ANo_image_available.svg#/media/File:No_image_available.svg";
        if (args[0][val].metadata) {
          imgSrc = "https://ipfs.io/ipfs/" + args[0][val].metadata.image;
        }
        htmltable += "<tr><td> " + args[0][val].tokenId + " </td><td> " + args[0][val].name + " </td><td> " + args[0][val].blockNumber + " </td><td><img src='" + imgSrc + "' height=120 width=120/></td></tr>";
      }

      htmltable += "</tbody></Table>";
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
    } else if(params == "enlistCert") {
      enlistCert();
    }
  }

  const loggedInView = (
    <>
      <Navbar style={{ backgroundColor: "#95B1CC", borderColor: "#87CEEB" }} variant="dark">
        <Container fluid>
          <Navbar.Brand style={{ color: "#FFF", fontWeight: "bold" }}>Professional Digital Wallet Demo</Navbar.Brand>
          <Button variant="primary" onClick={() => handleButtonClick('logout', 3)} className={activeIndex === 3 ? "btn btn-danger btn-sm" : "btn btn-danger btn-sm"} style={{ maxHeight: 40 }}>Log Out</Button>
        </Container>
      </Navbar>
      <Container fluid className="vh-100">
        <Row className="h-100">
          <Col md={2} className="bg-light">
            <Nav className="flex-column d-flex align-items-center">
            <button onClick={() => handleButtonClick('enlistCert', 1)} className={activeIndex === 1 ? "btn btn-success btn-sm mt-2 block" : "btn btn-default btn-sm mt-2 block"} style={{ width: '100%', border: '1px solid #ddd' }}>Enlist Cert</button>
              <button onClick={() => handleButtonClick('mintCert', 2)} className={activeIndex === 2 ? "btn btn-success btn-sm mt-2 block" : "btn btn-default btn-sm mt-2 block"} style={{ width: '100%', border: '1px solid #ddd' }}>Issue Certificate</button>
              <button onClick={() => handleButtonClick('listOwneredNFT', 3)} className={activeIndex === 3 ? "btn btn-success btn-sm" : "btn btn-default btn-sm"} style={{ width: '100%', border: '1px solid #ddd', marginTop: 10 }}>List Owned NFT</button>
              <button onClick={() => handleButtonClick('getAccounts', 4)} className={activeIndex === 4 ? "btn btn-success btn-sm" : "btn btn-default btn-sm"} style={{ width: '100%', border: '1px solid #ddd', marginTop: 10 }}>View Account</button>
            </Nav>
          </Col>
          <Col md={10}>
            <div id="console"></div>
          </Col>
        </Row>
      </Container>
      {/* <div className="flex-container">

        <div>
          <button onClick={() => handleButtonClick('mintCert', 1)} className={activeIndex === 1 ? "active" : "button"}>
            Issue Certificate
          </button>
        </div>
        <div>
          <button onClick={() => handleButtonClick('listOwneredNFT', 3)} className={activeIndex === 3 ? "active" : "button"}>
            List Owned NFT
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
      </div> */}
    </>
  );

  const unloggedInView = (

    <div
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1669060475985-e72f27a63241?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80')",
        backgroundSize: "cover",
        height: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container className="bg-light p-5 rounded" style={{ opacity: 0.9 }}>
        <img
          src="/metamask.png"
          alt="Logo"
          className="mx-auto d-block mb-4"
          style={{ maxWidth: "150px" }}
        />
        <center>
          <h2 style={{ color: "#333" }}>Welcome</h2>
          <h4 style={{ color: "#666" }}>Professional Digital Wallet</h4>
        </center>
        <Form style={{ marginTop: 20 }}>
          <Button type="button" className="d-block mx-auto" onClick={login}>
            Login with Metamask
          </Button>
          <br />
          <Button variant="primary" type="button" className="d-block mx-auto" onClick={loginSocial}>
            Login with Google
          </Button>
        </Form>
      </Container >
    </div >

    // <div className="div-center">
    //   <button className="login-button" onClick={login} >
    //     <img src="metamask.png" alt="Metamask" height="60px" width="60px" />
    //     <br />
    //     Login with Metamask
    //   </button>
    // </div>
  );

  // return (
  //   <>
  //     <header className="bg-success text-white py-3">
  //       <Container>
  //         <Row>
  //           <Col>
  //             <h4>Professional Digital Wallet Demo</h4>
  //           </Col>
  //           <Col className="text-end">
  //             <button className="btn btn-secondary">Sign In</button>
  //           </Col>
  //           {/* <Col className="text-end">
  //             <button className="btn btn-secondary">Sign In</button>
  //           </Col> */}
  //         </Row>
  //       </Container>
  //     </header>
  //     <div className="container-fluid">
  //       <Row>
  //         <Col
  //           md={3}
  //           className={`sidebar bg-dark text-white py-3 open`}
  //         >
  //           <nav>
  //             <ul className="nav flex-column">
  //               <li className="nav-item">
  //                 <div className="nav-link">
  //                   <i className="bi bi-house"></i> Home
  //                 </div>
  //               </li>
  //               <li className="nav-item">
  //                 <div className="nav-link">
  //                   <i className="bi bi-info-circle"></i> About
  //                 </div>
  //               </li>
  //             </ul>
  //           </nav>
  //         </Col>
  //         <Col md={9} className="bg-light py-3">
  //           <main className="p-4">
  //             <div className="container">
  //               <div className="card-layer">
  //                 <div className="grid">{provider ? loggedInView : unloggedInView}</div>
  //                 {provider && mintCertificatePop && (
  //                   <CustomPopUp
  //                     onClose={() => {
  //                       setMintCertificate(false);
  //                     }}
  //                     show={mintCertificatePop}
  //                     title="Issue Certificate"
  //                     onchange={onChange}
  //                     onsubmit={onSubmit}
  //                     onGenerate={onGenerate}
  //                   ></CustomPopUp>
  //                 )
  //                 }
  //               </div>
  //             </div>
  //           </main>
  //         </Col>
  //       </Row>

  //     </div>
  //   </>
  // );

  return (
    <>
      <div>
        {provider ? loggedInView : unloggedInView}</div>
      {provider && mintCertificatePop && (
        <CustomPopUp
          onClose={() => {
            setMintCertificate(false);
          }}
          show={mintCertificatePop}
          title="Issue Certificate"
          onchange={onChange}
          onsubmit={onSubmit}
          onGenerate={onGenerate}
        ></CustomPopUp>
      )
      }

    </>
  );
}

export default App;
