import EnabledNetworks from "../commons/networks.json";

export default (dispatch: any, store: any) => {
  const setWeb3 = (newWeb3: any) =>
    dispatch({ type: "SET_WEB3", data: newWeb3 });

  const setAddress = (address: any) => {
    window.localStorage.setItem("eth_address", address);
    dispatch({ type: "SET_ADDRESS", data: address });
  };

  const setCheckBlockchain = (response: any) =>
    dispatch({ type: "SET_BLOCKCHAIN_CHECK", response });

  const setNetworkId = (networkId: number) => {
    if (Object.keys(EnabledNetworks).indexOf(networkId.toString()) > -1) {
      dispatch({
        type: "SET_NETWORK",
        // @ts-ignore
        data: { networkId, network: EnabledNetworks[networkId] || "" }
      });
    } else {
      dispatch({
        type: "SET_NETWORK_ERROR",
        // @ts-ignore
        data: true
      });
    }
  };

  const setOpen = (open: boolean) => dispatch({ type: "SET_OPEN", data: open });
  return {
    setWeb3,
    setOpen,
    setAddress,
    setNetworkId,
    setCheckBlockchain
  };
};
