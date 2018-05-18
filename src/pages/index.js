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
import UserLogin from './user/loginPage'
import UserSite from './user/sitePage'
import AboutPage from './user/aboutPage'

import AdminLogin from './admin/loginPage'
import AdminHome from './admin/homePage'
import AdminTemplateIndex from './admin/templateIndexPage'
import AdminLayoutIndex from './admin/layoutIndexPage'
import ChooseTmp from './template/chooseTmp'

import Edit from './site/edit'
import Preview from './site/preview'
// import Test from './test'

import { createStore } from 'redux'
import PPSpace from '../reducers/index'
import Cookies from 'js-cookie';
import CheckUserLogin from '../utils/checkUserLogin'

export const store = createStore(PPSpace)

export const history = createBrowserHistory();

function readCookideSetStore(key, target) {
  const cookieString = Cookies.get(key)

  if (cookieString) {
    const cookieData = JSON.parse(new Buffer(cookieString, 'base64'))
    store.dispatch({
      type: 'replace',
      payload: { isLogin: true, profile: cookieData },
      target: target,
    });
  }
}

class Index extends Component {
  constructor(props) {
    super(props)
    readCookideSetStore('taohe_user', 'user')

    readCookideSetStore('taohe_admin', 'administrator')    
  }

  getChildContext() {
    return { store: store };
  }

  // 编辑页面 admin => /admin/editPage?source=xx&id=xx
  //         user => user/editPage?source=site&id=xx
  // 预览页面 admin => /admin/previewPage?source=xx&id=xx
  //         user => user/previewPage?source=site&id=xx

  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/tourist/chooseTemplate" exact component={ChooseTmp} />
          <Route path="/tourist/previewPage" component={Preview} />

          

          <Route path="/admin/login" component={AdminLogin} />
          <Route path="/admin/home" component={AdminHome} />
          <Route path="/admin/templateIndex" component={AdminTemplateIndex} />
          <Route path="/admin/layoutIndex" component={AdminLayoutIndex} />
          <Route path="/admin/editPage" component={Edit} />
          <Route path="/admin/previewPage" component={Preview} />
          <Route path="/administrator/previewPage" component={Preview} />

          <Route path="/user/chooseTemplate" exact component={ChooseTmp} />
          <Route path="/about" exact component={AboutPage} />
          {/* <CheckUserLogin store={store} shouldBe={true} path="/about" exact component={AboutPage} /> */}
          <CheckUserLogin store={store} shouldBe={true} path="/user/sites" exact component={UserSite} />
          <CheckUserLogin store={store} shouldBe={false} path="/user/login" component={UserLogin} />
          <CheckUserLogin store={store} shouldBe={true} path="/user/previewPage" component={Preview} />
          <CheckUserLogin store={store} shouldBe={true} path="/user/editPage" component={Edit} />
        </Switch>
      </Router>
    );
  }
}

Index.childContextTypes = {
  store: PropTypes.object
};
export default withRoot(Index);
