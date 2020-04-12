import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Header from "./components/Header";
import Container from "@material-ui/core/Container";
import { useSnackbar } from "notistack";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Content from "./components/Content";
import Contracts from "./components/Contracts";
import Me from "./components/Me";
import Coins from "./components/Coins";
import Footer from "./components/Footer";
import Button from "@material-ui/core/Button";
import useCheck from "./hooks/useCheck";
import context from "./context";
import useWeb3 from "./hooks/useWeb3";

const useStyles: any = makeStyles({
  root: {
    "&::focus": {
      outline: "none",
    },
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
    zIndex: -1,
  },
  container: {
    background: "transparent",
  },
});

function App() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const {
    followTx,
    store: { address },
  }: any = useContext(context);
  const { connect } = useWeb3();
  //Strat the check of the connection
  useCheck();

  // Try to reconnect
  useEffect(() => {
    address && connect();
  }, [address]);

  useEffect(() => {
    followTx &&
      followTx
        .on("tx_start", () => {
          enqueueSnackbar("We start to transfer the coins ... 🙃 ", {
            variant: "info",
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
            variant: "success",
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
            variant: "error",
          });
        });
  }, [followTx]);

  return (
    <div className={classes.root}>
      <Router>
        <Header />
        <div className={classes.special}></div>
        <Container className={classes.container}>
          <Switch>
            <Route path="/interaction">
              <>
                <Contracts />
              </>
            </Route>
            <Route path="/">
              <>
                <Content />
                <Coins />
              </>
            </Route>
          </Switch>

          <Me />
          <Footer />
        </Container>
      </Router>
    </div>
  );
}

export default App;
