import ABI from "./abi.json" assert { type: "json" };
//1- connect metamask

const contractAddress = "0x803eA496eE2fa4C7a1944123929Baf4304171Ab4";

let account;
const connectMetamask = async () => {
  // Check if MetaMask is available
  if (typeof window.ethereum === "undefined") {
    console.error("MetaMask is not available");
    return;
  }
  const accounts = await ethereum.request({
    method: "eth_requestAccounts",
  });
  account = accounts[0];
  // Request access to the user's MetaMask account
  // await window.ethereum.enable(); deprecated
};

// if (window.ethereum !== "undefined") {
//     const accounts = await ethereum.request({
//         method: "eth_requestAccounts",
//     });
//     account = accounts[0];
//     document.getElementById("accountArea").innerHTML = account;
// }

// const INFURA_ID = "faf2a2fa8d1a4af888745e3ed88e2c1a";
// const provider = new ethers.providers.JsonRpcProvider(
//     `https://sepolia.infura.io/v3/${INFURA_ID}`
// );

// DAI Contract

// const wallet = new ethers.Wallet(privateKey1, provider);
// const contract = new ethers.Contract(contractAddress, ABI, provider);
// const contractWithWallet = contract.connect(wallet);

// 2- connect to smart contract
// const connectContract = async () => {
//     const Address = "0xc79942c8a548dfdc90F10C88b2C7c320E556b3ec";
//     window.web3 = await new Web3(window.ethereum);
//     window.contract = await new window.web3.eth.Contract(ABI, Address);
// };

//3-read data from smart contract

const readContract = async () => {
  // Create an ethers provider using MetaMask
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner(account);

  // Get the contract instance
  const contract = new ethers.Contract(contractAddress, ABI, signer);

  // Call the function that requires a transaction
  const result = await contract.isDistributor(account);

  // Wait for the transaction to be mined
  // await tx.wait();

  console.log("Transaction sent and confirmed");
  // const data = await window.contract.methods.addCustomer(account).call();
  // await contractWithWallet.addCustomer(account);
  // console.log(account);
  // await contractWithWallet.addDistributor(account1)
  // document.getElementById("dataArea").innerHTML = data;
  // const result  = await contract.isDistributor(account1)
  // console.log(account);
  document.getElementById("dataArea").innerHTML = result;
  // await contractWithWallet.ManufactureProduct(account, 1, 100, "vinar", "random", account, "anotherRandom", "someString", 69)
  // 0xeea07efF7c4adEba7871Ce909a5b78F9751A2F21, 1, "abhinav" "mbh"
  // await contractWithWallet.addDistributor(account1)
  // await contractWithWallet.PurchasedByDistributor(
  //     account1,
  //     1,
  //     "abhinav",
  //     "mbh"
  // );
};

document
  .getElementById("btnConnectMetaMask")
  .addEventListener("click", connectMetamask);
document.getElementById("btnReadData").addEventListener("click", readContract);
