import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import withRoot from '../withRoot'; // 用于读取 meterial-ui 主题

// 单页路由 用法 https://reacttraining.com/react-router/
import { Router, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from "history";

// 首屏组件
import Home from '../pages/index/home'

// 其他路由组件
import ChooseTmp from './buildSites/chooseTmp'
import Inputs from './sites/edit'


export const history = createBrowserHistory();

const styles = theme => ({
  root: {
    textAlign: 'center',
    // paddingTop: theme.spacing.unit * 20,
  },
});

class Index extends Component {
  render() {
    // 此处 props 是通过 withStyles 产生的，className 选择与 styles 常量中的 key
    // 则会使用对应 css, 被称为 css in js
    // const { classes } = this.props;
    return (
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/chooseTmp" exact component={ChooseTmp} />
          <Route path="/sites/:id/edit" component={Inputs} />
        </Switch>
      </Router>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Index));
