import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Wallets from "./Header.Wallets";
import NetworkMessage from "./Header.Network";
import context from "../../context";
import Blockies from "react-blockies";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    zIndex: 100,
    "&::focus": {
      outline: "none",
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  header: {
    boxShadow: "none",
  },
  wallet: {},
}));

const Header = (props: any) => {
  const classes = useStyles();

  // @ts-ignore
  const {
    store: { address, open, networkId },
    actions: { setOpen },
  }: any = useContext(context);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const CheckLogin = () => {
    if (address) {
      return (
        <React.Fragment>
          <IconButton>
            <Blockies seed={address || "none"} className="identicon" />
          </IconButton>
        </React.Fragment>
      );
    } else {
      return (
        <Button color="inherit" onClick={handleOpen}>
          Login
        </Button>
      );
    }
  };
  return (
    <>
      <AppBar position="fixed" color="transparent" className={classes.header}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {networkId === 42 ? "KOVAN" : ""}
          </Typography>
          <Button color="inherit" href="/interaction">
            Contracts Interaction
          </Button>
          |<CheckLogin></CheckLogin>
        </Toolbar>
      </AppBar>
      <Wallets
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        className={classes.wallet}
      />

      <NetworkMessage />
    </>
  );
};

export default Header;
