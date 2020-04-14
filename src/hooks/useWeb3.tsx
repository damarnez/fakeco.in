import { useContext, useEffect } from "react";
import Web3 from "web3";
import context from "../context";

const useWeb3 = () => {
  const {
    store: { web3 },
    actions: { setWeb3, setAddress, setNetworkId },
  }: any = useContext(context);

  const enable = async () => {
    if (web3) {
      web3.currentProvider.enable();
      web3.currentProvider.autoRefreshOnNetworkChange = false;
      const accounts = await web3.eth.getAccounts();
      if (accounts && accounts.length > 0) setAddress(accounts[0]);
      const net = await web3.eth.net.getId();
      setNetworkId(net);
    }
  };

  const connect = async () => {
    //@ts-ignore
    if (window.ethereum) {
      //@ts-ignore
      setWeb3(new Web3(window.ethereum));
    } else {
      alert("Metamask Web3 are not found!");
    }
  };
  const check = () => {
    //@ts-ignore
    if (window.ethereum) {
      return true;
    }
    return false;
  };
  useEffect(() => {
    if (web3) {
      //@ts-ignore
      window.instance = web3;
      enable();
    }
  }, [web3]); // eslint-disable-line

  return { connect, enable, check };
};

export default useWeb3;
