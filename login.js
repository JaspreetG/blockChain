import ABI from "./abi.json" assert { type: "json" };

const contractAddress = "0x803eA496eE2fa4C7a1944123929Baf4304171Ab4";

const btnLogin = document.getElementById("btnLogin");

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

const loginUser = async (e) => {
  await e.preventDefault();
  await connectMetamask();
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner(account);
  const contract = new ethers.Contract(contractAddress, ABI, signer);
  const role = document.getElementById("role").value;
  console.log(role);
  switch (role) {
    case "Manufacturer":
      if (await contract.isManufacturer(account)) {
        console.log("login as manufacturer");
        window.location.href = "/manufacturer.html";
      } else {
        alert(
          "Please check again the account selected is not registered as manufacturer"
        );
      }
      break;
    case "Distributor":
      if (await contract.isDistributor(account)) {
        console.log("login as distributor");
        window.location.href = "/distributor.html";
      } else {
        alert(
          "Please check again the account selected is not registered as distributor"
        );
      }
      break;
    case "Customer":
      if (await contract.isCustomer(account)) {
        console.log("login as customer");
        window.location.href = "/customer.html";
      } else {
        alert(
          "Please check again the account selected is not registered as customer"
        );
      }
      break;
    case "Retailer":
      if (await contract.isRetailer(account)) {
        console.log("login as retailer");
        window.location.href = "/retailer.html";
      } else {
        alert(
          "Please check again the account selected is not registered as retailer"
        );
      }
      break;
  }
};

btnLogin.addEventListener("click", loginUser);
