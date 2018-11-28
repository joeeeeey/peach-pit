// 使用 loadable 的 index 文件
// 目前使用延时加载反而因为一些小页面引用了很多第三方样式导致很大 如 login register usersite
// 会使得网页内部跳转很慢
// 所以先牺牲首屏性能来提高内部交互体验
// 后期改造组件，并研究加载的细节

// import React, { Component } from 'react';
// import PropTypes from 'prop-types';

// // import { withStyles } from 'material-ui/styles';
// import withRoot from '../withRoot'; // 用于读取 meterial-ui 主题

// // 单页路由 用法 https://reacttraining.com/react-router/
// import { Router, Switch, Route } from 'react-router-dom'
// import { createBrowserHistory } from "history";

// // 延时加载
// import Loadable from "react-loadable";
// import { Load } from "components/load";

// // 首屏组件
// import Home from '../pages/user/homePage'

// import { createStore } from 'redux'
// import PPSpace from 'reducers/index'
// import Cookies from 'js-cookie';
// import CheckUserLogin from 'utils/checkUserLogin'

// const AsyncUserLogin = Loadable({
//   loader: () => import('./user/loginPage'),
//   loading: Load
// });
//  const AsyncUserSite = Loadable({
//   loader: () => import('./user/sitePage'),
//   loading: Load
// });
//  const AsyncUserChooseTmp = Loadable({
//   loader: () => import('./template/chooseTmp'),
//   loading: Load
// });
//  const AsyncUserAboutPage = Loadable({
//   loader: () => import('./user/aboutPage'),
//   loading: Load
// });
//  const AsyncAdminLogin = Loadable({
//   loader: () => import('./admin/loginPage'),
//   loading: Load
// });
//  const AsyncAdminHome = Loadable({
//   loader: () => import('./admin/homePage'),
//   loading: Load
// });
//  const AsyncAdminTemplateIndex = Loadable({
//   loader: () => import('./admin/templateIndexPage'),
//   loading: Load
// });
//  const AsyncAdminLayoutIndex = Loadable({
//   loader: () => import('./admin/layoutIndexPage'),
//   loading: Load
// });

// // 公共
//  const AsyncEdit = Loadable({
//   loader: () => import('./site/edit'),
//   loading: Load
// });
//  const AsyncPreview = Loadable({
//   loader: () => import('./site/preview'),
//   loading: Load
// });

// export const store = createStore(PPSpace)

// export const history = createBrowserHistory();

// function readCookideSetStore(key, target) {
//   const cookieString = Cookies.get(key)

//   if (cookieString) {
//     const cookieData = JSON.parse(new Buffer(cookieString, 'base64'))
//     store.dispatch({
//       type: 'replace',
//       payload: { isLogin: true, profile: cookieData },
//       target: target,
//     });
//   }
// }

// class Index extends Component {
//   constructor(props) {
//     super(props)
//     readCookideSetStore('taohe_user', 'user')

//     readCookideSetStore('taohe_admin', 'administrator')
//   }

//   getChildContext() {
//     return { store: store };
//   }

//   // 编辑页面 admin => /admin/editPage?source=xx&id=xx
//   //         user => user/editPage?source=site&id=xx
//   // 预览页面 admin => /admin/previewPage?source=xx&id=xx
//   //         user => user/previewPage?source=site&id=xx

//   render() {
//     return (
//       <Router history={history}>
//         <Switch>
//           <Route path="/" exact component={Home} />

//           <Route path="/admin/login" component={AsyncAdminLogin} />
//           <Route path="/admin/home" component={AsyncAdminHome} />
//           <Route path="/admin/templateIndex" component={AsyncAdminTemplateIndex} />
//           <Route path="/admin/layoutIndex" component={AsyncAdminLayoutIndex} />
//           <Route path="/admin/editPage" component={AsyncEdit} />
//           <Route path="/admin/previewPage" component={AsyncPreview} />
//           <Route path="/administrator/previewPage" component={AsyncPreview} />
//           <CheckUserLogin store={store} shouldBe={true} path="/about" exact component={AsyncUserAboutPage} />
//           <CheckUserLogin store={store} shouldBe={true} path="/user/sites" exact component={AsyncUserSite} />
//           <CheckUserLogin store={store} shouldBe={true} path="/user/chooseTemplate" exact component={AsyncUserChooseTmp} />
//           <CheckUserLogin store={store} shouldBe={false} path="/user/login" component={AsyncUserLogin} />
//           <CheckUserLogin store={store} shouldBe={true} path="/user/previewPage" component={AsyncPreview} />
//           <CheckUserLogin store={store} shouldBe={true} path="/user/editPage" component={AsyncEdit} />
//         </Switch>
//       </Router>
//     );
//   }
// }

// Index.childContextTypes = {
//   store: PropTypes.object
// };
// export default withRoot(Index);
