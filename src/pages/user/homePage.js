import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import PropTypes from "prop-types";
import Button from "material-ui/Button";
import { Link } from "react-router-dom";
import HomePageStepper from "../../components/common/steppers/homePageStepper";
import ResponsiveIntro from "../../components/derive/homePage/responsiveIntro";

const styles = theme => ({
  root: {
    textAlign: "center",
    backgroundColor: "white",
    height: window.innerHeight
  },
  imgae: {
    width: window.innerWidth,
    zIndex: -10
  }
});

const parallexStyle = {
  backgroundAttachment: "fixed",
  backgroundPosition: "center",
  backgroundRepeat: "noRepeat",
  backgroundSize: "cover"
};

class Home extends Component {
  getChildContext() {
    return { store: this.context.store };
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div
          style={Object.assign(
            {
              background:
                "url(http://blog-src.b0.upaiyun.com/taohe/dev/editPage/administrator/1/template/20/114200aa769ec39a23344a472283a770.jpg)",
              minHeight: "100vh",
              position: "relative",
              display: "grid"
            },
            parallexStyle
          )}>
          <div
            style={{
              position: "absolute",
              top: "30%",
              width: "100%",
              textAlign: "center"
            }}>
            <h1
              style={{
                fontSize: "calc(2.4vw + 2.4vh)",
                fontFamily: '"Times New Roman",Georgia,Serif',
                color: "#fff",
                letterSpacing: 5
              }}>
              桃核空间
            </h1>
            <div style={{ marginTop: "5%" }} />
            <span className={"introduce-text-big"}>
              发布你的网站，从未如此简单。
            </span>
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "8%",
              left: 0,
              width: "100%",
              textAlign: "center"
            }}>
            <Button
              component={Link}
              to={`/user/chooseTemplate`}
              size="large"
              style={{
                width: "33%",
                color: "#DCEDC8",
                letterSpacing: 5,
                fontSize: "calc(1.6vw + 1.6vh)",
                fontFamily: '"Times New Roman",Georgia,Serif'
              }}>
              现在开始
            </Button>
          </div>
        </div>
        <HomePageStepper />
        <ResponsiveIntro />
        <div
          style={Object.assign(
            {
              position: "relative",
              background:
                "url(http://blog-src.b0.upaiyun.com/taohe/dev/basic/template/08a4696af75ec0bd75b778f1aeb44e44",
              minHeight: "100vh"
            },
            parallexStyle
          )}>
          <div
            style={{
              position: "absolute",
              left: 0,
              top: "42%",
              width: "100%",
              textAlign: "center"
            }}>
            <Button
              component={Link}
              to={`/user/chooseTemplate`}
              size="large"
              style={{
                width: "33%",
                color: "black",
                letterSpacing: 5,
                fontSize: "calc(1.9vw + 1.9vh)",
                fontFamily: '"Times New Roman",Georgia,Serif'
              }}>
              开始创作
            </Button>
          </div>
        </div>

        {/* <Divider dashed /> */}
        <div
          style={{
            width: "100%",
            textAlign: "center",
            marginBottom: 20,
            marginTop: 20
          }}>
          <span className={"introduce-text-small"} style={{ color: "black" }}>
            Copyright 2018 -- Joey
          </span>
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
