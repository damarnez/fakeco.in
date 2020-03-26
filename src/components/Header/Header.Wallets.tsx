import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import useWeb3 from "../../hooks/useWeb3";

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    boxShadow: "none",
    "&::focus": {
      outline: "none"
    }
  },
  paper: {
    backgroundColor: "#4A61DD",
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

export default function TransitionsModal(props: any) {
  const classes = useStyles();
  const [ui, setUI] = useState("login");
  const { connect, enable, check } = useWeb3();

  useEffect(() => {
    if (!check()) {
      setUI("no_wallet");
    }
  }, []);

  const handleClickConnect = () => async () => {
    try {
      await connect();
      return setUI("success");
    } catch (err) {
      await enable();
      return setUI("check_connection");
    }
  };

  const getSteps = () => {
    // eslint-disable-line
    switch (ui) {
      case "login":
        return (
          <div className={classes.paper}>
            <h2> Connect your wallet </h2>
            <List>
              <ListItem button onClick={handleClickConnect()}>
                Metamask
              </ListItem>
            </List>
          </div>
        );
      case "check_connection":
        return (
          <div className={classes.paper}>
            <h2> Connectig your wallet! Please install Metamask</h2>
          </div>
        );
      case "no_wallet":
        return (
          <div className={classes.paper}>
            <p>
              <h1>Ops!</h1>No wallet found, please install{" "}
              <a href="https://metamask.io/" target="_blank">
                <b>METAMASK</b>
              </a>
            </p>
          </div>
        );
      case "success":
        return (
          <div className={classes.paper}>
            <h1>Success!</h1>You are connected!
          </div>
        );
    }
  };

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.open}
        onClose={props.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={props.open}>{getSteps()}</Fade>
      </Modal>
    </>
  );
}
