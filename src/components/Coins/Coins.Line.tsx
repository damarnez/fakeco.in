import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import copy from "copy-to-clipboard";
import { useSnackbar } from "notistack";

import CircularProgress from "@material-ui/core/CircularProgress";
const useStyles = makeStyles({
  card: {
    background: "#2C3039",
    borderRadius: 0,
    marginTop: "30px",
    position: "relative",
    visibility: "visible",
    display: "flex",
    zIndex: 101
  },
  root: {
    flexGrow: 1,
    width: "100%",
    padding: "20px",
    position: "relative"
  },
  buttons: {
    float: "right",
    height: "100%"
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: 30
  },
  items: {
    position: "relative",
    zIndex: 101,
    padding: "0px",
    margin: "0px",
    height: "50px"
  },
  h3: {
    fontSize: "32px",
    margin: "0px",
    paddingTop: "4px",
    color: "#8A94A7"
  },
  span: {
    fontSize: "20px",
    position: "relative",
    top: "10px",
    "&:hover": {
      color: "#4A61DD",
      cursor: "pointer"
    }
  },
  icon: {
    fontSize: "17px",
    marginRight: "15px"
  }
});

const Line = ({ data, onClickCoin, loading }: any) => {
  const classes = useStyles();
  const imgSrc = `/images/${data.img}`;
  const { enqueueSnackbar } = useSnackbar();

  const handleCopy = (type: string) => () => {
    copy(JSON.stringify(data[type]));
    enqueueSnackbar("Copied! 🍆");
  };
  return (
    <Paper elevation={3} className={classes.card}>
      <Grid container className={classes.root}>
        <Grid key={data.name + 1} item xs={1} className={classes.items}>
          <img src={imgSrc} height="50" alt={data.name}></img>
        </Grid>
        <Grid key={data.name + 2} item xs={1} className={classes.items}>
          <h3 className={classes.h3}>{data.name}</h3>
        </Grid>
        <Grid key={data.name + 3} item xs={8} className={classes.items}>
          <span className={classes.span} onClick={handleCopy("address")}>
            {data.address} <FileCopyIcon className={classes.icon} />
          </span>
          {"  "}
          <span className={classes.span} onClick={handleCopy("abi")}>
            ABI <FileCopyIcon className={classes.icon} />
          </span>
          {"  "}
          <span className={classes.span} onClick={handleCopy("bytecode")}>
            BYTECODE <FileCopyIcon className={classes.icon} />
          </span>
        </Grid>
        <Grid key={data.name + 4} item xs={2} className={classes.items}>
          <Button
            variant="contained"
            color="primary"
            className={classes.buttons}
            onClick={onClickCoin(data.name)}
            disabled={loading}
          >
            Get Coins
          </Button>
          {loading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Line;
