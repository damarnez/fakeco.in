import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import LinkedinIco from "../../icons/iconmonstr-linkedin-3.svg";
import LinkIco from "../../icons/iconmonstr-link-1.svg";
import GithubIco from "../../icons/iconmonstr-github-3.svg";

import EthIco from "../../icons/eth.svg";
import Grid from "@material-ui/core/Grid";
const useStyles = makeStyles({
  root: {
    textAlign: "left",
    paddingTop: "150px",
    paddingBottom: "150px",
    background: "transparent",
    height: "100%",
    zIndex: 100,
    position: "relative",
    "&::after": {
      content: "''",
      position: "absolute",
      right: "0",
      width: "668px",
      height: "835px",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "80%",
      top: "-20%",

      backgroundImage: "url(./images/cta-illustration.svg)",
      zIndex: 0
    }
  },
  card: {
    background: "#4A61DD",
    borderRadius: 0,
    padding: "64px 32px",
    display: "block"
  },
  avatar: {
    width: "200px",
    height: "200px"
  },
  buttons: {
    float: "right",
    height: "100%"
  },
  items: {
    zIndex: 101,
    padding: "0px",
    margin: "0px"
  },
  title: {
    fontSize: "32px",
    margin: "0px",
    paddingTop: "4px",
    color: "#fff"
  },
  subtitle: { fontSize: "20px" },
  span: {
    fontSize: "20px",
    position: "relative",
    top: "10px"
  },
  grid: {
    display: "flex",
    marginLeft: "50px"
  },
  icons: {
    color: "#8A94A7",
    width: "24px"
  },
  links: {
    color: "#DDE2F4",
    marginLeft: "10px",
    fontSize: "15px",
    bottom: "5px",
    position: "relative"
  }
});

const Me = () => {
  const classes = useStyles();
  return (
    <section className={classes.root}>
      <Paper className={classes.card}>
        <Grid container className={classes.grid}>
          <Grid key="avatar" item xs={3} className={classes.items}>
            <Avatar
              alt="Remy Sharp"
              src="https://damarnez.me/img/yo.jpg"
              className={classes.avatar}
            />
          </Grid>
          <Grid key="desc" item xs={9} className={classes.items}>
            <h3 className={classes.title}>Daniel Martín Jiménez</h3>
            <p className={classes.subtitle}>
              Senior Software and Blockchain Developer{" "}
            </p>

            <p>
              <img src={LinkedinIco} className={classes.icons} />
              <a
                className={classes.links}
                href="https://www.linkedin.com/in/damarnez/"
              >
                https://www.linkedin.com/in/damarnez/
              </a>
            </p>
            <p>
              <img src={LinkIco} className={classes.icons} />
              <a className={classes.links} href="https://damarnez.me/">
                https://damarnez.me
              </a>
            </p>
            <p>
              <img src={GithubIco} className={classes.icons} />
              <a className={classes.links} href="https://github.com/damarnez">
                https://github.com/damarnez
              </a>
            </p>
            <p>
              <img src={EthIco} className={classes.icons} />
              <span className={classes.links}>
                Tip me at : 0xd8031f2CB879C7A087F11526Fab9b1B315575EF6
              </span>
            </p>
          </Grid>
        </Grid>
      </Paper>
    </section>
  );
};

export default Me;
