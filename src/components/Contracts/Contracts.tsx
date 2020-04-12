import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";
import Generator from "./Generator";
import Definition from "./Definition";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "130px",
    paddingBottom: "130px",
    background: "transparent",
    height: "100%",
    zIndex: 100,
  },
  inputs: {
    paddingBottom: "10px",
  },
  card: {
    background: "#2C3039",
    borderRadius: 0,
    marginTop: "30px",
    position: "relative",
    visibility: "visible",
    display: "flex",
    zIndex: 101,
    padding: "30px",
  },
}));

enum UI {
  DEFINITION = "DEFINITION",
  INPUTS = "INPUTS",
}

const Contracts = () => {
  const classes = useStyles();
  const [data, setData]: any = useState();
  const [ui, setUI]: any = useState(UI.DEFINITION);

  const handleNext = (newData: any) => {
    setData(newData);
    setUI(UI.INPUTS);
  };

  const handleNav = (state: string) => () => {
    setUI(state);
  };
  const navSelector = (state: string) => {
    if (state === ui)
      return <Typography color="textPrimary">{state}</Typography>;
    return (
      <Button color="inherit" onClick={handleNav(state)}>
        {state}
      </Button>
    );
  };
  const getUI = () => {
    switch (ui) {
      case UI.DEFINITION:
        return <Definition handleNext={handleNext}></Definition>;

      case UI.INPUTS:
        return (
          <Generator
            jsonAbi={data?.jsonAbi}
            address={data?.address}
          ></Generator>
        );
    }
  };
  return (
    <section className={classes.root}>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        {navSelector(UI.DEFINITION)}
        {navSelector(UI.INPUTS)}
      </Breadcrumbs>
      {getUI()}
    </section>
  );
};

export default Contracts;
