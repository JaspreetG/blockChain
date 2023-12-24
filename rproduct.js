import ABI from "./abi.json" assert { type: "json" };

const getWalletAddress = async () => {
  if (typeof window.ethereum === "undefined") {
    console.error("MetaMask is not available");
    return;
  }
  const accounts = await ethereum.request({
    method: "eth_requestAccounts",
  });
  return accounts[0];
};

const products = document.getElementById("products");

const address = await getWalletAddress();

var parentDiv = document.getElementById("products");

// Fetch data from the API
fetch(`http://localhost:8800/api/retproducts/getAllretProduct`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    // Loop through each object in the data
    data.forEach((item) => {
      const newDiv = document.createElement("div");
      newDiv.innerHTML = `<div class="card dashboard-card medicine-card">
              <h3>${item.name}</h3>
              <h4><span>$</span> ${item.price}</h4>
              <div class="sub-category">
                <ul class="li-card">
                  <li class="li-item">Category : ${item.category}</li>
                  <li class="li-item">Maker : ${item.manufacturer_name}</li>
                </ul>
              </div>
              <button id="dproduct-btn" class="dproduct-btn" data-product=${item.productNumber}>BUY</button>
              <button id="dproduct-view-btn" class="dproduct-btn" data-product=${item.productNumber}>VIEW MORE</button>
            </div>`;
      console.log(item);

      // Append the new div to the parent div
      parentDiv.appendChild(newDiv);
    });
    const fetch_details = document.getElementById("myModal");
    const btnArray = document.querySelectorAll("#dproduct-btn");
    const btnViewArray = document.querySelectorAll("#dproduct-view-btn");
    btnArray.forEach((btn) => {
      btn.addEventListener("click", async () => {
        console.log("inside");
        fetch_details.style.display = "block";
        const confirm = document.getElementById("rconfirm");
        confirm.addEventListener("click", async (e) => {
          e.preventDefault();
          const rname = document.getElementById("rname").value;
          const raddress = document.getElementById("raddress").value;
          var productNumber = btn.getAttribute("data-product");
          console.log(productNumber);
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
          console.log(rname, raddress, address);
          fetch_details.style.display = "none";
          await connectMetamask();
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner(account);
          const contract = new ethers.Contract(contractAddress, ABI, signer);
          await contract.PurchasedByRetailer(
            account,
            productNumber,
            rname,
            raddress
          );
          try {
            const data = {
              productNumber: productNumber,
            };
            const put = await fetch(
              `http://localhost:8800/api/retproducts/updateretBuy`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },

                body: JSON.stringify(data),
              }
            );

            const res = await put.json();

            // console.log(res);
          } catch (e) {
            console.error(new Error(e));
          }
          window.location.reload();
        });
      });
    });
    btnViewArray.forEach((btn) => {
      btn.addEventListener("click", async () => {
        const closeHistory = document.getElementById("close-history");
        const closeAction = document.getElementById("view_transactions");
        closeAction.style.display = "block";
        closeHistory.addEventListener("click", () => {
          closeAction.style.display = "none";
        });
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
        var productNumber = btn.getAttribute("data-product");
        console.log(productNumber);
        await connectMetamask();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner(account);
        const contract = new ethers.Contract(contractAddress, ABI, signer);
        const result = await contract.ReturnProductHistory(productNumber);
        const closeActionInner = document.querySelector(".transaction-box");
        console.log(result);
        result.forEach((r) => {
          closeActionInner.innerHTML += `<div class="card dashboard-card medicine-card transction-box-card">
            <div class="sub-category">
              <ul class="li-card">
                <li class="li-item">Owner : ${r.owner}</li>
                <li class="li-item">State : ${r.productState}</li>
                <li class="li-item">Manufacturer : ${r.manufacturer[1]}</li>
                <li class="li-item">Manufacturer Address : ${r.manufacturer[0]}</li>
                <li class="li-item">Distributor : ${r.distributor[1]}</li>
                <li class="li-item">Distributor address : ${r.distributor[0]}</li>
                <li class="li-item">Retailer : ${r.retailer[1]}</li>
                <li class="li-item">Retailer address : ${r.retailer[0]}</li>
              </ul>
            </div>
          </div>`;
        });
      });
    });
  })
  .catch((error) => {
    // Handle any errors that occurred during the API request
    console.error("Error:", error);
    console.log(`http://localhost:8800/api/products/${address}`);
  });
