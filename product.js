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
fetch(`http://localhost:8800/api/products/${address}`)
  .then((response) => response.json())
  .then((data) => {
    console.log(`http://localhost:8800/api/products/${address}`);
    console.log("data", data);
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
            </div>`;
      console.log(item);
      // Append the new div to the parent div
      parentDiv.appendChild(newDiv);
    });
  })
  .catch((error) => {
    // Handle any errors that occurred during the API request
    console.error("Error:", error);
    console.log(`http://localhost:8800/api/products/${address}`);
  });
// const products = document.getElementById("products");
// for (var i = 0; i < getData.length; i++) {
//   const product = `
// div class="card dashboard-card">
//               <h2>${getData[i].name}</h2>
//               <ion-icon class="icon" name="medkit-outline"></ion-icon>
//               <a class="button product--btn">view more</a>
//             </div>
// `;
//   products.appendChild(product);
// }
