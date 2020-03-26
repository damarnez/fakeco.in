import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    textAlign: "left",
    paddingTop: "130px",
    paddingBottom: "130px",
    background: "transparent",
    height: "100%",
    zIndex: 100,
    display: "inline-flex"
  },
  boxMessaage: {
    paddingRight: "64px",
    minWidth: "552px",
    width: "552px",
    display: "block"
  },
  title: {
    marginBottom: "22px",
    clear: "both",
    color: "#fff",
    fontWeight: 600,
    fontSize: "60px",
    lineHeight: "54px",
    letterSpacing: "0px"
  },
  message: {
    color: "#8A94A7",
    fontSize: "1.5rem"
  },
  image: {
    marginLeft: "20%"
  }
});

const Content = () => {
  const classes = useStyles();
  return (
    <section className={classes.root}>
      <div className={classes.boxMessaage}>
        <h1 className={classes.title}>FakeCoin</h1>
        <p className={classes.message}>
          Earn Koban and Robsten stable coins to work in test environments
        </p>
      </div>
      <div className={classes.image}>
        <img src="/images/ethereum.png" width="300px"></img>
      </div>
    </section>
  );
};

export default Content;
