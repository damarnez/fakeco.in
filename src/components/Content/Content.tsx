import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
const useStyles = makeStyles(theme => ({
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
    width: "552px",
    minWidth: "552px",
    display: "block",
    [theme.breakpoints.down("md")]: {
      width: "350px",
      minWidth: "350px",
      paddingRight: "0px"
    }
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
}));

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
      <Hidden mdDown>
        <div className={classes.image}>
          <img src="/images/ethereum.png" width="300px"></img>
        </div>
      </Hidden>
    </section>
  );
};

export default Content;
