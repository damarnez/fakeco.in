export default (dispatch: any, store: any) => {
  const setWeb3 = (newWeb3: any) =>
    dispatch({ type: "SET_WEB3", data: newWeb3 });

  const setAddress = (address: any) => {
    window.localStorage.setItem("eth_address", address);
    dispatch({ type: "SET_ADDRESS", data: address });
  };

  const setCheckBlockchain = (response: any) =>
    dispatch({ type: "SET_BLOCKCHAIN_CHECK", response });

  const fetchContracts = async () => {
    // try {
    //   return dispatch({
    //     type: "SET_CONTRACTS_DATA",
    //     data: { "42": { Position, PositionDispacher } }
    //   });
    // } catch (error) {
    //   return dispatch({ type: "ERROR_CONTRACTS_DATA" });
    // }
  };
  const setOpen = (open: boolean) => dispatch({ type: "SET_OPEN", data: open });
  return {
    setWeb3,
    setOpen,
    setAddress,
    setCheckBlockchain,
    fetchContracts
  };
};
