import ABI from "./abi.json" assert { type: "json" };

const contractAddress = "0x803eA496eE2fa4C7a1944123929Baf4304171Ab4";

let account;
const connectMetamask = async () => {
  if (typeof window.ethereum === "undefined") {
    console.error("MetaMask is not available");
    return;
  }
  const accounts = await ethereum.request({
    method: "eth_requestAccounts",
  });
  account = accounts[0];
};

const deleteAccount = async () => {
  await connectMetamask();
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner(account);
  const contract = new ethers.Contract(contractAddress, ABI, signer);
  await contract.removeRetailer(account);
  window.location.href = "/index.html";
};

const btnDelete = document.getElementById("btnDeleteAccount");

btnDelete.addEventListener("click", deleteAccount);
