import React, { Component } from 'react';
import AppBar from '../../components/common/layouts/appBar'
import GuideInfo from '../../components/pages/index/guideInfo'
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import '../../css/homePage.css'
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';
import HomePageStepper from '../../components/common/steppers/homePageStepper'
import { Divider } from 'antd';

const styles = theme => ({
  root: {
    textAlign: 'center',
    backgroundColor: 'white',
    height: window.innerHeight,
  },
  imgae: {
    width: window.innerWidth,
    zIndex: -10,
  }
});

const parallexStyle = {
  backgroundAttachment: 'fixed',
  backgroundPosition: 'center',
  backgroundRepeat: 'noRepeat',
  backgroundSize: 'cover',
}


class Home extends Component {
  getChildContext() {
    return { store: this.context.store };
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div style={Object.assign({ background: "url(/images/bg/bg4.jpg)", minHeight: 500, position: 'relative' }, parallexStyle)}>
          <div style={{ position: 'absolute', left: 0, top: '26%', width: '100%', textAlign: 'center' }}>
            <h1 style={{
              fontSize: 45,
              "fontFamily": "\"Times New Roman\",Georgia,Serif",
              color: '#fff',
              letterSpacing: 5
            }}>
              桃核空间
            </h1>
          </div>

          <div style={{ position: 'absolute', left: 0, top: '48%', width: '100%', textAlign: 'center' }}>
            <h2 style={{
              fontSize: 35,
              "fontFamily": "\"Times New Roman\",Georgia,Serif",
              color: '#fff'
            }}>
              发布你的网站，从未如此简单~
            </h2>
          </div>
        </div>
        <div style={{ marginTop: 30, backgroundColor: 'white', width: '100%' }}>
          <div style={{ backgroundColor: 'white', width: '80%', marginLeft: '15%', textAlign: 'center' }}>
            <HomePageStepper />
          </div>
        </div>

        <div style={Object.assign({ position: 'relative', background: "url(/images/bg/bg3.jpg)", minHeight: 500 }, parallexStyle)}>
          <div style={{ position: 'absolute', left: '10%', top: '10%' }}>
            <span style={{ fontSize: 25, color: '#fff', letterSpacing: 5 }}>点燃创意</span>
          </div>

          <div style={{ position: 'absolute', left: '10%', bottom: '10%' }}>
            <span style={{ fontSize: 25, color: '#fff', letterSpacing: 5 }}>激发想象</span>
          </div>
          <div style={{ position: 'absolute', left: 0, top: '42%', width: '100%', textAlign: 'center' }}>
            <Button component={Link} to={`/user/chooseTemplate`}
              size="large"
              style={{ width: '33%', color: 'black', letterSpacing: 5, fontSize: 40, "fontFamily": "\"Times New Roman\",Georgia,Serif", }}>
              开始创作</Button>
          </div>
        </div>

       
        <div style={{ width: '100%', textAlign: 'center', marginBottom: 20, marginTop: 20 }}>
          <span>Copyright 2018 -- Joey</span>
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



