import ABI from "./abi.json" assert { type: "json" };

const contractAddress = "0x803eA496eE2fa4C7a1944123929Baf4304171Ab4";

const button = document.getElementById("btnRegister");

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

const registerUser = async (e) => {
  await e.preventDefault();
  await connectMetamask();
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner(account);
  const contract = new ethers.Contract(contractAddress, ABI, signer);
  const role = document.getElementById("role").value;
  switch (role) {
    case "Manufacturer":
      await contract.addManufacturer(account);
      window.location.href = "/manufacturer.html";
      break;
    case "Distributor":
      await contract.addDistributor(account);
      window.location.href = "/distributor.html";
      break;
    case "Customer":
      await contract.addCustomer(account);
      window.location.href = "/customer.html";
      break;
    case "Retailer":
      await contract.addRetailer(account);
      window.location.href = "/retailer.html";
      break;
  }
  console.log(account);
};

button.addEventListener("click", registerUser);
