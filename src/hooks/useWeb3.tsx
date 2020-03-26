import { useContext, useState, useEffect } from "react";
import Web3 from "web3";
import RootContext from "../context";

const useWeb3 = () => {
  const {
    store: { web3 },
    actions: { setWeb3, setAddress }
  }: any = useContext(RootContext);

  const enable = async () => {
    if (web3) {
      web3.currentProvider.enable();
      const accounts = await web3.eth.getAccounts();
      if (accounts && accounts.length > 0) setAddress(accounts[0]);
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
  }, [web3]);

  return { connect, enable, check };
};

export default useWeb3;
