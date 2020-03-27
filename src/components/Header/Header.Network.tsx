import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import context from "../../context";

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
  // @ts-ignore
  const {
    store: { networkError }
  }: any = useContext(context);
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={networkError}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={networkError}>
          <div className={classes.paper}>
            <p>
              <h1>Ops!</h1>Please change your network to <b>KOVAN</b>{" "}
            </p>
          </div>
        </Fade>
      </Modal>
    </>
  );
}
