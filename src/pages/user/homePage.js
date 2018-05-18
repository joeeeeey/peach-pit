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
        <div 

        style={Object.assign({ background: "url(http://blog-src.b0.upaiyun.com/taohe/dev/editPage/administrator/1/template/20/114200aa769ec39a23344a472283a770.jpg)", 
        minHeight: '100vh', position: 'relative', display:'grid' }, parallexStyle)}>
          <div style={{ position:'absolute', top: '30%', width: '100%', textAlign: 'center' }}>
            <h1 style={{
              fontSize: "calc(2.4vw + 2.4vh)",
              "fontFamily": "\"Times New Roman\",Georgia,Serif",
              color: '#fff',
              letterSpacing: 5
            }}>
              桃核空间

            </h1>
            <div style={{marginTop: '5%'}}></div>

            <span className={'introduce-text-small'}>一个可以</span>     

            <span className={'introduce-text-big'}>及时编辑发布网站，</span>  
            <span className={'introduce-text-small'}>还能</span>        
            <span className={'introduce-text-big'}>下载打包后文件</span>    
            <span className={'introduce-text-small'}>的地方。</span>         
          </div>

          {/* <div style={{position: 'absolute', left: 0, top: '25%', width: '100%', textAlign: 'center' }}>
            <h2 style={{
              fontSize: "calc(1.5vw + 1.5vh)",
              "fontFamily": "\"Times New Roman\",Georgia,Serif",
              color: '#fff'
            }}>
              一个可以<br/>及时编辑、发布你的网站 <br/>并且<br/>还能下载打包后的文件<br/>的地方
            </h2>
          </div> */}
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



