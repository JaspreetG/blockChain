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

export default getWalletAddress;
