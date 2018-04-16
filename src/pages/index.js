import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import { withStyles } from 'material-ui/styles';
import withRoot from '../withRoot'; // 用于读取 meterial-ui 主题

// 单页路由 用法 https://reacttraining.com/react-router/
import { Router, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from "history";

// 首屏组件
import Home from '../pages/user/homePage'

// 其他路由组件
import userLogin from './user/loginPage'
import adminLogin from './admin/loginPage'
import adminHome from './admin/homePage'
import ChooseTmp from './template/chooseTmp'
import Edit from './site/edit'
import Test from './test'

import { createStore } from 'redux'
import PPSpace from '../reducers/index'
import Cookies from 'js-cookie';
import CheckUserLogin from '../utils/checkUserLogin'

export const store = createStore(PPSpace)

export const history = createBrowserHistory();

function readCookideSetStore(key, target){
  const cookieString = Cookies.get(key)

  if(cookieString){
    const cookieData = JSON.parse(new Buffer(cookieString, 'base64'))
    store.dispatch({
      type: 'replace',
      payload: {isLogin: true, profile: cookieData},
      target: target,
    });      
  }
  // else{
  //   store.dispatch({
  //     type: 'update',
  //     payload: {nestedKey: "isLogin", value: false},
  //     target: target,
  //   });    
  // }   
}

class Index extends Component {
  constructor(props){
    super(props)
    readCookideSetStore('taohe_user', 'user')

    readCookideSetStore('taohe_admin', 'administrator')
  }

  getChildContext() {
    return {store: store};
  }  
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/user/login" component={userLogin} />
          <Route path="/admin/login" component={adminLogin} />
          <Route path="/admin/home" component={adminHome} />
          <Route path="/admin/editPage" component={Edit} />

          <CheckUserLogin store={store} path="/chooseTmp" exact component={ChooseTmp} />
          <Route path="/site/:id/edit" component={Test} />
          <CheckUserLogin store={store} path='/test' component={Test} />
          <Route path="/site/edit" component={Edit} />
        </Switch>
      </Router>
    );
  }
}

Index.childContextTypes = {
  store: PropTypes.object
};
export default withRoot(Index);
