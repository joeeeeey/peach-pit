import React, { Component } from 'react';
import Button from 'material-ui/Button';

// import Typography from 'material-ui/Typography'; // 规范字体
import { withStyles } from 'material-ui/styles';

// 单页路由 用法 https://reacttraining.com/react-router/
import { Redirect } from 'react-router-dom'
import TitleAndSubTitle from '../../common/titleAndSubTitle'

const styles = theme => ({
  root: {
    // textAlign: 'center',
    // paddingTop: theme.spacing.unit * 1,
  },
  beginButton: {
    paddingTop: 10,
  },
});

class GuideInfo extends Component {
  state = {
    redirectChooseTmp: false,
  };

  chooseTmp = () => {
    this.setState({
      redirectChooseTmp: true,
    });
  };

  render() {
    const { classes } = this.props;
    const TitleAndSubTitleStyle = {
      titleStyle: { paddingTop: 20 },
      subTitleStyle: { paddingTop: 15 }
    }

    if (this.state.redirectChooseTmp) {
      return <Redirect push to="/chooseTmp" />;
    }

    return (
      <div className={classes.root}>
        < TitleAndSubTitle
          titleContent="PEACH PIT SPACE"
          subTitleContent="建站利器"
          style={TitleAndSubTitleStyle} />
        <div className={classes.beginButton}>
          <Button
            size="large"
            variant="raised"
            color="secondary"
            onClick={this.chooseTmp}>
            开始创建
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(GuideInfo);
