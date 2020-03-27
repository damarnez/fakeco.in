import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Header from "./components/Header";
import Container from "@material-ui/core/Container";
import { useSnackbar } from "notistack";
import Content from "./components/Content";
import Me from "./components/Me";
import Coins from "./components/Coins";
import Footer from "./components/Footer";
import Button from "@material-ui/core/Button";
import useCheck from "./hooks/useCheck";
import context from "./context";

const useStyles: any = makeStyles({
  root: {
    "&::focus": {
      outline: "none"
    }
  },
  special: {
    content: "",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "700px",
    background: "#242830 ",
    "-webkit-transform-origin": 0,
    transformOrigin: 0,
    "-webkit-transform": "skewY(-12deg)",
    transform: "skewY(-12deg)",
    zIndex: -1
  },
  container: {
    background: "transparent"
  }
});

function App() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { followTx }: any = useContext(context);

  //Strat the check of the connection
  useCheck();

  useEffect(() => {
    followTx &&
      followTx
        .on("tx_start", () => {
          enqueueSnackbar("We start to transfer the coins ... 🙃 ", {
            variant: "info"
          });
        })
        .on("tx_finish", (tx: string) => {
          const action = (
            <Button
              color="secondary"
              size="small"
              onClick={() => {
                window.open(`https://etherscan.io/tx/${tx}`, "_blank");
              }}
            >
              View Tx
            </Button>
          );
          enqueueSnackbar("Success! enjoy your coins 😏 ", {
            action,
            variant: "success"
          });
        })
        .on("tx_error", (tx: string) => {
          const action = (
            <Button
              color="secondary"
              size="small"
              onClick={() => {
                window.open(`https://etherscan.io/tx/${tx}`, "_blank");
              }}
            >
              View Tx
            </Button>
          );
          enqueueSnackbar("Error! Something goes wrong 🤕 ", {
            action,
            variant: "error"
          });
        });
  }, [followTx]);

  return (
    <div className={classes.root}>
      <Header />
      <div className={classes.special}></div>
      <Container className={classes.container}>
        <Content />
        <Coins />
        <Me />
        <Footer />
      </Container>
    </div>
  );
}

export default App;
