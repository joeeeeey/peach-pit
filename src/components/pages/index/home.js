import React, { Component } from "react";
import AppBar from "../../common/layouts/appBar";
import GuideInfo from "./guideInfo";
import { withStyles } from "material-ui/styles";
import PropTypes from "prop-types";

const styles = theme => ({
  root: {
    textAlign: "center",
    backgroundColor: "grey",
    [theme.breakpoints.up("md")]: {
      backgroundColor: "white"
    },
    height: window.innerHeight
  },
  imgae: {
    width: window.innerWidth,
    zIndex: -10
  }
});

class Home extends Component {
  getChildContext() {
    return { store: this.context.store };
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar />
        <div id="page">
          <div id="content">
            <GuideInfo />
          </div>
        </div>
      </div>
    );
  }
}

Home.contextTypes = {
  store: PropTypes.object
};

Home.childContextTypes = {
  store: PropTypes.object
};

export default withStyles(styles)(Home);
