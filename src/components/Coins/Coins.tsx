import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import coins from "../../commons/coins.json";
import Line from "./Coins.Line";

const useStyles = makeStyles({
  root: {
    textAlign: "left",
    paddingTop: "150px",
    paddingBottom: "150px",
    background: "transparent",
    height: "100%",
    zIndex: 100,
    position: "relative",
    "&::before": {
      content: "''",
      position: "absolute",
      left: "0",
      width: "668px",
      height: "835px",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "80%",
      bottom: "18.8%",
      "-webkit-transform": "translateX(-50%)",
      transform: "translateX(-50%)",
      backgroundImage: "url(./images/pricing-illustration.svg)",
      zIndex: 0,
    },
  },
  card: {
    background: "#2C3039",
    borderRadius: 0,
  },
});

const Content = () => {
  const classes = useStyles();

  return (
    <section className={classes.root}>
      {coins.map((data: any, i) => {
        return <Line data={data} key={data.name + i} />;
      })}
    </section>
  );
};

export default Content;
