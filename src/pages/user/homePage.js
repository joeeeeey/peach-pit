import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';
import HomePageStepper from '../../components/common/steppers/homePageStepper'

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
        <div style={Object.assign({ background: "url(http://blog-src.b0.upaiyun.com/taohe/dev/basic/template/5a53c855596a8748dd5ed4e80ad309a8)", minHeight: '100vh', position: 'relative' }, parallexStyle)}>
          <div style={{ position: 'absolute', left: 0, top: '26%', width: '100%', textAlign: 'center' }}>
            <h1 style={{
              fontSize: "calc(2.3vw + 2.3vh)",
              "fontFamily": "\"Times New Roman\",Georgia,Serif",
              color: '#fff',
              letterSpacing: 5
            }}>
              桃核空间
            </h1>
          </div>

          <div style={{ position: 'absolute', left: 0, top: '48%', width: '100%', textAlign: 'center' }}>
            <h2 style={{
              fontSize: "calc(1.8vw + 1.8vh)",
              "fontFamily": "\"Times New Roman\",Georgia,Serif",
              color: '#fff'
            }}>
              {/* 一个提供及时编辑发布你的网站, 还能下载网站源码的地方 */}
              发布你的网站，从未如此简]单~
            </h2>
          </div>
          <div style={{ position: 'absolute', bottom: '8%', left: 0, width: '100%', textAlign: 'center' }}>
            <Button component={Link} to={`/user/chooseTemplate`}
              size="large"
              style={{ width: '33%', color: '#DCEDC8', letterSpacing: 5, fontSize: "calc(1.6vw + 1.6vh)", "fontFamily": "\"Times New Roman\",Georgia,Serif", }}>
              现在开始</Button>
          </div>
        </div>
        <div style={{ paddingButtom: 60, paddingTop: 60, backgroundColor: 'white', width: '100%', textAlign: 'center' }}>
          <h2 style={{
            fontSize: "calc(1.8vw + 1.8vh)",
            "fontFamily": "\"Times New Roman\",Georgia,Serif"
          }}>流程说明</h2>
          <div style={{ backgroundColor: 'white', width: '80%', marginLeft: '15%', textAlign: 'center' }}>

            <HomePageStepper />
          </div>
        </div>

        <div style={Object.assign({
          position: 'relative',
          background: "url(http://blog-src.b0.upaiyun.com/taohe/dev/basic/template/08a4696af75ec0bd75b778f1aeb44e44",
          minHeight: '100vh'
        }, parallexStyle)}>
          {/* <div style={{ position: 'absolute', left: '10%', top: '10%' }}>
            <span style={{ fontSize: 25, color: '#fff', letterSpacing: 5 }}>点燃创意</span>
          </div>

          <div style={{ position: 'absolute', left: '10%', bottom: '10%' }}>
            <span style={{ fontSize: 25, color: '#fff', letterSpacing: 5 }}>激发想象</span>
          </div> */}
          <div style={{ position: 'absolute', left: 0, top: '42%', width: '100%', textAlign: 'center' }}>
            <Button component={Link} to={`/user/chooseTemplate`}
              size="large"
              style={{ width: '33%', color: 'black', letterSpacing: 5, fontSize: "calc(1.9vw + 1.9vh)", "fontFamily": "\"Times New Roman\",Georgia,Serif", }}>
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



