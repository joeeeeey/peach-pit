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

// import { Provider } from 'react-redux'
import { createStore } from 'redux'
import PPSpace from '../reducers/index'
import Cookies from 'js-cookie';
import CheckUserLogin from '../share/checkUserLogin'

export const store = createStore(PPSpace)


console.log(store.getState())

export const history = createBrowserHistory();
// read cookie and set store here?

class Index extends Component {
  constructor(props){
    super(props)
    this.state = {cookie: Cookies.get('csrfToken')}
    // TODO 在此处获取 cookie 存入 store user 中
    // store.dispatch({
    //   type: 'replace',
    //   payload: {isPreview: false, id: 3},
    //   target: 'user',
    // });

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
          <Route path="/chooseTmp" exact component={ChooseTmp} />
          <Route path="/sites/:id/edit" component={Test} />
          <CheckUserLogin authed={this.state.cookie} path='/test' component={Test} />
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
