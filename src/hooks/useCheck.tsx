import { useContext, useEffect } from "react";
import useInterval from "./useInterval";
import context from "../context";

const useWallet = () => {
  const {
    store,
    store: { web3, networkId, address },
    actions: { setAddress, setNetworkId }
  }: any = useContext(context);

  useInterval(async () => {
    try {
      if (web3) {
        const net = await web3.eth.net.getId();
        if (net !== networkId) {
          setNetworkId(net);
        }
        const accounts = await web3.eth.getAccounts();
        if (address && accounts.length > 0 && address !== accounts[0]) {
          setAddress(accounts[0]);
        }
      }
    } catch (error) {
      console.error("NO_NETWORK", error);
    }
  }, 2000);

  return !!web3;
};

export default useWallet;
