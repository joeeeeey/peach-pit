import React, { Component } from 'react';
import AppBar from '../../components/common/layouts/appBar'
import GuideInfo from '../../components/pages/index/guideInfo'
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import '../../css/homePage.css'
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';

const styles = theme => ({
  root: {
    textAlign: 'center',
    backgroundColor: 'grey',
    [theme.breakpoints.up('md')]: {
      backgroundColor: 'white',
    },
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
        <AppBar />
        <div style={{ color: '#777', backgroundColor: 'white', textAlign: 'center', padding: '50px 80px', textAlign: 'justify' }}>
          <h3 style={{ textAlign: 'center' }}>PEACH PIT SPACE</h3>
          <p>Parallax scrolling is a web site trend where the background content is moved at a different speed than the foreground content while scrolling. Nascetur per nec posuere turpis, lectus nec libero turpis nunc at, sed posuere mollis ullamcorper libero ante lectus, blandit pellentesque a, magna turpis est sapien duis blandit dignissim. Viverra interdum mi magna mi, morbi sociis. Condimentum dui ipsum consequat morbi, curabitur aliquam pede, nullam vitae eu placerat eget et vehicula. Varius quisque non molestie dolor, nunc nisl dapibus vestibulum at, sodales tincidunt mauris ullamcorper, dapibus pulvinar, in in neque risus odio. Accumsan fringilla vulputate at quibusdam sociis eleifend, aenean maecenas vulputate, non id vehicula lorem mattis, ratione interdum sociis ornare. Suscipit proin magna cras vel, non sit platea sit, maecenas ante augue etiam maecenas, porta porttitor placerat leo.</p>
        </div>
        <div style={Object.assign({ background: "url(/images/bg/bg4.jpg)", minHeight: 500, position: 'relative' }, parallexStyle)}>


          <div style={{ position: 'absolute', left: 0, top: '42%', width: '100%', textAlign: 'center' }}>
            <Button component={Link} to={`/chooseTmp`} size="large" style={{width: '33%', color: '#fff', letterSpacing: 5, fontSize: 25 }}>HERE WE GO!</Button>
          </div>
        </div>
        <div style={{ color: '#777', backgroundColor: 'white', textAlign: 'center', padding: '50px 80px', textAlign: 'justify' }}>
          <h3 style={{ textAlign: 'center' }}>Parallax Demo</h3>
          <p>Parallax scrolling is a web site trend where the background content is moved at a different speed than the foreground content while scrolling. Nascetur per nec posuere turpis, lectus nec libero turpis nunc at, sed posuere mollis ullamcorper libero ante lectus, blandit pellentesque a, magna turpis est sapien duis blandit dignissim. Viverra interdum mi magna mi, morbi sociis. Condimentum dui ipsum consequat morbi, curabitur aliquam pede, nullam vitae eu placerat eget et vehicula. Varius quisque non molestie dolor, nunc nisl dapibus vestibulum at, sodales tincidunt mauris ullamcorper, dapibus pulvinar, in in neque risus odio. Accumsan fringilla vulputate at quibusdam sociis eleifend, aenean maecenas vulputate, non id vehicula lorem mattis, ratione interdum sociis ornare. Suscipit proin magna cras vel, non sit platea sit, maecenas ante augue etiam maecenas, porta porttitor placerat leo.</p>
        </div>

        <div style={Object.assign({ position: 'relative', background: "url(/images/bg/bg3.jpg)", minHeight: 500 }, parallexStyle)}>
          <div style={{ position: 'absolute', left: 0, top: '50%', width: '100%', textAlign: 'center' }}>
            <span style={{ fontSize: 25, color: '#fff' }}>激 发 想 象</span>
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