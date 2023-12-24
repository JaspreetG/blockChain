import ABI from "./abi.json" assert { type: "json" };

("use strict");

//product details
const productName = document.getElementById("pname");
const productPrice = document.getElementById("price");
const productCategory = document.getElementById("category");
const productCode = document.getElementById("code");

// Person details
const mname = document.getElementById("mname");
const address = document.getElementById("address");
const walletAddress = document.getElementById("pass");
// console.log(
//   address,
//   productCategory,
//   productCode,
//   productName,
//   productPrice,
//   productCategory,
//   mname,
//   walletAddress
// );
//submit form
const submitForm = document.getElementById("submitForm");

submitForm.addEventListener("click", async function (e) {
  e.preventDefault();
  console.log(
    address.value,
    productCategory.value,
    productCode.value,
    productName.value,
    productPrice.value,
    productCategory.value,
    mname.value,
    walletAddress.value
  );

  console.log(walletAddress.value);

  try {
    const response = await fetch("http://localhost:8800/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address: address.value,
        category: productCategory.value,
        manufacturer_name: mname.value,
        name: productName.value,
        price: productPrice.value,
        solidity_address: walletAddress.value,
      }),
    });
    const data = await response.json();
    console.log(data.product.productNumber);

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

    await connectMetamask();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner(account);
    const contract = new ethers.Contract(contractAddress, ABI, signer);
    await contract.ManufactureProduct(
      data.product.productNumber,
      account,
      productCode.value,
      productPrice.value,
      productCategory.value,
      productName.value,
      account,
      mname.value,
      address.value,
      Date.now()
    );
  } catch (error) {
    console.error(error);
  }
});

(async function () {
  try {
    const getData = await fetch("http://localhost:8800/api/products");
    const val = await getData.json();
  } catch (err) {
    (err) => new Error(`ERROR IN FETCHING API ${err}`);
  }
})();
