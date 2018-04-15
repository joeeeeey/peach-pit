import React, { Component } from 'react';
import AppBar from '../../common/layouts/appBar'
import GuideInfo from './guideInfo'
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';

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
    // height: window.innerHeight,
    width: window.innerWidth,
    zIndex: -10,
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
        <GuideInfo />
        <div >
          <img
            src={'/images/panda.jpg'}
            className={classes.imgae} />
        </div>;
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