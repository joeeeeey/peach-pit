## Introduction
[桃核空间](https://www.taohespace.com) 是一个免费网页建站器。在这里，你可以通过拖拽组件的方式完成页面的设计并且直接发布。发布时，你的网站将会被分配本站的一个二级域名。

项目UI基于 [React](https://github.com/facebook/react) 并使用 [Redux](https://github.com/reduxjs/redux) 进行状态管理, [Webpack](https://github.com/webpack/webpack) 用于打包。


## 开发
### 环境设置
1. Clone this project.
2. 确保已经安装 8.x 版本或以上的 node.
3. `cd peach-pit && npm install && npm start`.

### [开发文档](https://github.com/joeeeeey/peach-pit/blob/refactoring/docs/dev.md)

## Build by Webpack 
Run `npm run build`.

## TODO List:
1. component 增加对 PropTypes 的声明
2. 规范化 css
   - 优化组件的显示
   - css 文件调用
   - 重命名类名
3. Edit page 延时加载组件, 按需引入
4. 新增实时编辑功能(feature)
   - 用户可在页面编写 react 代码预览并且保存组件到自己的一个"组件库"
   - 用户可以在 edit page 中使用自己编写的组件
