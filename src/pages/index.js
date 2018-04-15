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
import userLogin from './user/loginPage'
import adminLogin from './admin/loginPage'
import ChooseTmp from './template/chooseTmp'
import Edit from './site/edit'
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
    let userCookie = Cookies.get('taohe_user')

    // console.log(Cookies.getJSON("eyJsb2dpbiI6IjE1MDYxOTc1NjI3IiwiaWQiOjEsIm5pY2tuYW1lIjoi5pyA6aqa55qEIiwic2VjcmV0X2tleSI6ImI3M2I0NDY1ZTc4MGQzODE4YWNmODQwYjM4ZGRjMGZlZDI1YzQxOGE4Mjg5ODk1NzQ3MjRmNjVmNWYyODkyY2YifQ=="))
    // new Buffer(str, 'base64')
    if(userCookie){
      const userData = JSON.parse(new Buffer(userCookie, 'base64'))
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
          <Route path="/user/login" component={userLogin} />
          <Route path="/admin/login" component={adminLogin} />
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
