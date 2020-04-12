const initialState = {
  address: window.localStorage.getItem("eth_address") || null,
  error: "",
  contracts: null,
  web3: null,
  open: false,
  networkId: 0,
  network: "",
  networkError: false,
};

export default initialState;
