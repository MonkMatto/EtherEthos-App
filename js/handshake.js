let currentChainId = null;
const web3Main = new Web3(
  `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_KEY}`,
);

let currentChain = null;
let chainIndex = null;
let currentAccount = null;
window.sessionStorage.setItem("chainIDLoaded", false);

let chains = [
  {
    name: "mainnet",
    id: 1,
    explorerBaseUrl: "https://etherscan.io/address/",
    contractAddress: "0x1f4126A9D34811E55B9506F011aC1df1396ac909",
    endpoint: `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_KEY}`,
  },
  {
    name: "sepolia",
    id: 11155111,
    explorerBaseUrl: "https://sepolia.etherscan.io/address/",
    contractAddress: "0x0E6b7e647Ac52Fc636B678213dEbd0C21E0b1a58",
    endpoint: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_KEY}`,
  },
  {
    name: "optimism",
    id: 10,
    explorerBaseUrl: "https://optimistic.etherscan.io/address/",
    contractAddress: "0x1f4126A9D34811E55B9506F011aC1df1396ac909",
    endpoint: `https://opt-mainnet.g.alchemy.com/v2/${ALCHEMY_KEY}`,
  },
  {
    name: "base",
    id: 8453,
    explorerBaseUrl: "https://basescan.org/address/",
    contractAddress: "0x1f4126A9D34811E55B9506F011aC1df1396ac909",
    endpoint: `https://base-mainnet.g.alchemy.com/v2/${ALCHEMY_KEY}`,
  },
  {
    name: "arbitrum",
    id: 42161,
    explorerBaseUrl: "https://arbiscan.io/address/",
    contractAddress: "0x1f4126A9D34811E55B9506F011aC1df1396ac909",
    endpoint: `https://arb-mainnet.g.alchemy.com/v2/${ALCHEMY_KEY}`,
  },
  {
    name: "polygon",
    id: 137,
    explorerBaseUrl: "https://polygonscan.com/address/",
    contractAddress: "0x1f4126A9D34811E55B9506F011aC1df1396ac909",
    endpoint: `https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_KEY}`,
  },
  {
    name: "zora",
    id: 7777777,
    explorerBaseUrl: "https://zora.superscan.network/address/",
    contractAddress: "0x1f4126A9D34811E55B9506F011aC1df1396ac909",
    endpoint: `https://zora-mainnet.g.alchemy.com/v2/${ALCHEMY_KEY}`,
  },
  {
    name: "blast",
    id: 81457,
    explorerBaseUrl: "https://blastexplorer.io/address/",
    contractAddress: "0x1f4126A9D34811E55B9506F011aC1df1396ac909",
    endpoint: `https://blast-mainnet.g.alchemy.com/v2/${ALCHEMY_KEY}`,
  },
];

let chainParams = new URLSearchParams(window.location.search);
let EE_ADDRESS;
if (chainParams.has("chain")) {
  //Find contract address based on search query
  console.log("trying to use network from url param");
  var findChainID = chains.find(
    (o) => o.id === Number(chainParams.get("chain")),
  );
  chainIndex = chains.indexOf(findChainID);
  EE_ADDRESS = chains[chainIndex].contractAddress;
} else {
  console.log("trying to use network from metamask");
  if (currentAccount) {
    //Find contract address based on wallet chainID
    console.log(`chainIndex: ${chainParams.get("chain")}`);
    window.addEventListener("load", () => {
      var findChainID = chains.find((o) => o.id === Number(currentChainId));

      chainIndex = chains.indexOf(findChainID);
      console.log(`chainIndex: ${chainIndex}`);
      EE_ADDRESS = chains[chainIndex].contractAddress;
    });
    console.log(
      "successfully used network from metamask, " + chains[chainIndex].name,
    );
  } else {
    //Use default (mainnet)
    console.log("defaulted to mainnet");
    chainIndex = 0;
    EE_ADDRESS = "0x1f4126A9D34811E55B9506F011aC1df1396ac909";
  }
}

const connectButton = document.querySelector("[data-connect]");
const connectButtonText = document.querySelector("[data-connect] span");

let web3User = null; // For MetaMask or any Ethereum-compatible wallet
let EE_Contract_User = null;

/*****************************************/
/* Detect the MetaMask Ethereum provider */
/*****************************************/
async function getProvider() {
  const provider = await detectEthereumProvider();
  if (provider) {
    startApp(provider);
  } else {
    console.log("Please install MetaMask!");
    createNoWalletMsg();
  }
}

getProvider();

function startApp(provider) {
  if (provider !== window.ethereum) {
    console.error("Do you have multiple wallets installed?");
    createErrorMsg("Error! Do you have multiple wallets installed?");
  }

  // Initialize user's web3
  web3User = new Web3(provider);

  // Now initialize the user's contract object
  EE_Contract_User = new web3User.eth.Contract(EE_ABI, EE_ADDRESS);

  // Attach event handlers
  ethereum.on("chainChanged", handleChainChanged);
  ethereum.on("accountsChanged", handleAccountsChanged);

  // Fetch and set the current chain ID
  ethereum
    .request({ method: "eth_chainId" })
    .then((chainId) => {
      // Convert the chain ID from hex to decimal
      currentChainId = parseInt(chainId, 16);
      console.log("Current Chain ID:", currentChainId);
      window.sessionStorage.setItem("chainIDLoaded", true);
      // Check if contract address of this chain ID matches the existing assumption, update if not
      var walletChain = chains.find((o) => o.id === Number(currentChainId));
      if (!chainParams.has("chain")) {
        if (walletChain && walletChain.contractAddress !== EE_ADDRESS) {
          EE_ADDRESS = walletChain.contractAddress;
          //Re-initialize User Contract Object
          EE_Contract_User = new web3User.eth.Contract(EE_ABI, EE_ADDRESS);
        }
      }

      // You can now use currentChainId in other parts of your app
    })
    .catch(handleError);

  // Check for existing accounts
  ethereum
    .request({ method: "eth_accounts" })
    .then(handleAccountsChanged)
    .catch(handleError);
}

function handleChainChanged() {
  // Convert the chain ID from hex to decimal
  currentChainId = parseInt(_chainId, 16);
  console.log("Chain ID changed to:", currentChainId);
  window.location.reload();
}

function handleAccountsChanged(accounts) {
  if (accounts.length === 0) {
    console.log("Please connect to MetaMask.");
    connectButtonText.textContent = "Connect MetaMask";
  } else if (accounts[0] !== currentAccount) {
    const firstConnection = currentAccount ? false : true;
    console.log("setting currentAccount");
    currentAccount = accounts[0];
    console.log("Account connected:", currentAccount);
    console.log(currentAccount);
    connectButtonText.textContent =
      typeof currentAccount == "string"
        ? `${currentAccount.slice(0, 6)}...${currentAccount.slice(-4)}`
        : currentAccount;
  }
}

function handleError(error) {
  console.error(error);
  if (!currentChainId) {
    currentChainId = 1;
  }
}

function connectWallet() {
  if (!currentAccount) {
    // Check if the reload has already happened in this session
    if (!sessionStorage.getItem("walletConnected")) {
      // Initial connection
      ethereum
        .request({ method: "eth_requestAccounts" })
        .then(!currentAccount ? handleAccountsChanged : () => {})
        .catch(handleError)
        .finally(() => {
          sessionStorage.setItem("walletConnected", "true");
          window.location.reload();
        });
    }
  } else {
    // Connect new account
    ethereum
      .request({
        method: "wallet_requestPermissions",
        params: [
          {
            eth_accounts: {},
          },
        ],
      })
      .then(handleAccountsChanged)
      .catch(handleError);
    console.log("reconnecting");
  }
}

function manageDropdown() {
  if (connectButton) {
    if (!currentAccount) {
      const profileDropdown = document.getElementById("profile-dropdown");
      profileDropdown.classList.remove("flex");
      profileDropdown.classList.add("hidden");
      profileDropdown.style.border = "none";

      connectButton.addEventListener("click", function (event) {
        event.preventDefault();
        connectWallet();
      });
    } else if (currentAccount) {
      removeEventListener("click", connectButton);
      let profileDropped = false;
      const profileDropdown = document.getElementById("profile-dropdown");
      profileDropdown.style.border = "none";
      const myProfileButton = document.getElementById("my-profile");
      myProfileButton.style.height = "0";
      const reconnectButton = document.getElementById("reconnect");
      reconnectButton.style.height = "0";

      function toggleProfileDropdown() {
        if (profileDropped) {
          profileDropdown.style.height = "0px";
          myProfileButton.style.height = "0px";
          reconnectButton.style.height = "0px";
          profileDropdown.style.border = "none";
          profileDropdown.classList.add("hidden");
          profileDropped = false;
        } else {
          profileDropdown.style.height = "10rem";
          myProfileButton.style.height = "5rem";
          reconnectButton.style.height = "5rem";
          profileDropdown.style.border = "1px solid black";
          profileDropdown.classList.remove("hidden");
          profileDropped = true;
        }
      }

      connectButton.addEventListener("click", function (event) {
        event.preventDefault();
        toggleProfileDropdown();
      });
      reconnectButton.addEventListener("click", () => {
        connectWallet();
      });
      myProfileButton.addEventListener("click", () => {
        window.location.href = `${window.location.origin}?address=${currentAccount}`;

        console.log("my profile link " + profileLink);
        console.log(profileParams);
      });
    }
  }
}

window.addEventListener("load", () => {
  manageDropdown();
});
