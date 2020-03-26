import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  root: {
    marginBottom: "50px",
    color: "#4A61DD"
  },
  love: {
    color: "#FF0000"
  }
});

const Footer = () => {
  const classes = useStyles();
  return (
    <section className={classes.root}>
      With <em className={classes.love}>❤</em> from Barcelona
    </section>
  );
};

export default Footer;
