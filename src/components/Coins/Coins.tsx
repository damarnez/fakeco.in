import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { toWei } from "web3-utils";
import Line from "./Coins.Line";
import coins from "../../commons/coins.json";
import RootContext from "../../context";
const useStyles = makeStyles({
  root: {
    textAlign: "left",
    paddingTop: "150px",
    paddingBottom: "150px",
    background: "transparent",
    height: "100%",
    zIndex: 100,
    position: "relative",
    "&::before": {
      content: "''",
      position: "absolute",
      left: "0",
      width: "668px",
      height: "835px",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "80%",
      bottom: "18.8%",
      "-webkit-transform": "translateX(-50%)",
      transform: "translateX(-50%)",
      backgroundImage: "url(./images/pricing-illustration.svg)",
      zIndex: 0
    }
  },
  card: {
    background: "#2C3039",
    borderRadius: 0
  }
});

const Content = () => {
  const classes = useStyles();
  const [loading, setLoading]: any = useState({});
  const {
    store: { web3, address },
    actions: { setOpen },
    followTx
  }: any = useContext(RootContext);

  const handleClickCoin = (name: string) => async () => {
    console.log("COINS ----->> ", name, web3);
    if (web3 && address) {
      setLoading({ ...loading, ...{ [name]: true } });
      const coin: any = coins.filter(c => c.name === name).pop();
      const coinInstance = new web3.eth.Contract(coin.abi, coin.address);
      try {
        const resp = await followTx.watchTx(
          coinInstance.methods
            .mintTokens(address, toWei("1000"))
            .send({ from: address })
        );
        setLoading({ ...loading, ...{ [name]: false } });
        console.log("SUCCESS", resp);
      } catch (error) {
        setLoading({ ...loading, ...{ [name]: false } });
        console.error("TX ERROR : ", error);
      }
    } else {
      setOpen(true);
    }
  };

  return (
    <section className={classes.root}>
      {coins.map((data: any, i) => {
        return (
          <Line
            data={data}
            key={data.name + i}
            onClickCoin={handleClickCoin}
            loading={loading[data.name] ? loading[data.name] : false}
          />
        );
      })}
    </section>
  );
};

export default Content;
