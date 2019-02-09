import React, { Component } from "react";
import PropTypes from "prop-types";
import withRoot from "../withRoot"; // 用于读取 meterial-ui 主题

// 单页路由 用法 https://reacttraining.com/react-router/
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

// 首屏组件
import Home from "pages/user/homePage";

// 其他路由组件
import UserLogin from "pages/user/loginPage";
import UserSite from "pages/user/sitePage";
import AboutPage from "pages/user/aboutPage";

import AdminLogin from "pages/admin/loginPage";
import AdminHome from "pages/admin/homePage";
import AdminTemplateIndex from "pages/admin/templateIndexPage";
import AdminLayoutIndex from "pages/admin/layoutIndexPage";
import ChooseTmp from "pages/template/chooseTmp";

import Edit from "pages/site/edit2/edit";
import Preview from "pages/site/preview";
// import Test from './test'

import store from "../store";
import Cookies from "js-cookie";
import CheckUserLogin from "utils/checkUserLogin";
import { Provider } from "react-redux";
import actionTypes from "constants/action-types";

export const history = createBrowserHistory();

function readCookideSetStore(key, target) {
  const cookieString = Cookies.get(key);

  if (cookieString) {
    const cookieData = JSON.parse(new Buffer(cookieString, "base64"));
    store.dispatch({
      type: target === "user" ? actionTypes.RESET_USER : actionTypes.RESET_ADMINISTRATOR,
      payload: { isLogin: true, profile: cookieData }
    });
  }
}

class Index extends Component {
  constructor(props) {
    super(props);
    readCookideSetStore("taohe_user", "user");

    readCookideSetStore("taohe_admin", "administrator");
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
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/tourist/chooseTemplate" exact component={ChooseTmp} />
            <Route path="/tourist/previewPage" component={Preview} />

            {/* TODO check admin login */}
            <Route path="/admin/login" component={AdminLogin} />
            <Route path="/admin/home" component={AdminHome} />
            <Route path="/admin/templateIndex" component={AdminTemplateIndex} />
            <Route path="/admin/layoutIndex" component={AdminLayoutIndex} />
            <Route path="/admin/editPage" component={Edit} />
            <Route path="/admin/previewPage" component={Preview} />
            <Route path="/administrator/previewPage" component={Preview} />

            <Route path="/user/chooseTemplate" exact component={ChooseTmp} />
            <Route path="/about" exact component={AboutPage} />
            <CheckUserLogin store={store} shouldBe={true} path="/user/sites" exact component={UserSite} />
            <CheckUserLogin store={store} shouldBe={false} path="/user/login" component={UserLogin} />
            <CheckUserLogin store={store} shouldBe={true} path="/user/previewPage" component={Preview} />
            <CheckUserLogin store={store} shouldBe={true} path="/user/editPage" component={Edit} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

Index.childContextTypes = {
  store: PropTypes.object
};
export default withRoot(Index);
