import React, { useReducer } from "react";
import ReactDOM from "react-dom";
import App from "./App";

import RootContext from "./context";
import connector from "./store/actions";
import reducers from "./store/reducers";
import initialState from "./store/initialState";
import * as serviceWorker from "./serviceWorker";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { SnackbarProvider } from "notistack";
import FollowTX from "followtx";
import Web3 from "web3";
const theme = createMuiTheme({
  typography: {
    fontFamily: "Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace"
  },
  palette: {
    primary: {
      main: "#4A61DD",
      contrastText: "#DDE2F4"
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
    background: {
      default: "#1D2026"
    },
    text: {
      primary: "#DDE2F4"
    }
  }
});

const Root = () => {
  const [store, dispatch] = useReducer(
    reducers,
    initialState,
    () => initialState
  );
  const followTx = new FollowTX(
    new Web3("wss://kovan.infura.io/ws/v3/e0c246b2761d4864b79949d719f3208a")
  );
  const actions = connector(dispatch, store);
  const values = { store, actions, followTx };

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RootContext.Provider value={values}>
          <SnackbarProvider maxSnack={3}>
            <App />
          </SnackbarProvider>
        </RootContext.Provider>
      </ThemeProvider>
    </>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
