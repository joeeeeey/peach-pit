import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import { withStyles } from 'material-ui/styles';
import withRoot from '../withRoot'; // 用于读取 meterial-ui 主题

// 单页路由 用法 https://reacttraining.com/react-router/
import { Router, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from "history";

// 首屏组件
import Home from '../components/pages/index/home'

// 其他路由组件
import userLogin from './users/login'
import ChooseTmp from './templates/chooseTmp'
import Edit from './sites/edit'
import Test from './test'

import { createStore } from 'redux'
import PPSpace from '../reducers/index'
import Cookies from 'js-cookie';
import CheckUserLogin from '../utils/checkUserLogin'

export const store = createStore(PPSpace)

export const history = createBrowserHistory();
class Index extends Component {
  constructor(props){
    super(props)
    let userCookie = Cookies.getJSON('taohe_user')

    if(userCookie){
      store.dispatch({
        type: 'replace',
        payload: {isLogin: true, profile: userCookie},
        target: 'user',
      });      
    }else{
      store.dispatch({
        type: 'update',
        payload: {nestedKey: "isLogin", value: false},
        target: 'user',
      });    
    }    
    // this.state = {isLogin: userCookie ? true :false}
  }

  getChildContext() {
    return {store: store};
  }  
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/userLogin" component={userLogin} />
          <CheckUserLogin store={store} path="/chooseTmp" exact component={ChooseTmp} />
          <Route path="/sites/:id/edit" component={Test} />
          <CheckUserLogin store={store} path='/test' component={Test} />
          <Route path="/sites/edit" component={Edit} />
        </Switch>
      </Router>
    );
  }
}

Index.childContextTypes = {
  store: PropTypes.object
};
export default withRoot(Index);
