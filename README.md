
# This project was bootstrapped with meterial-ui example
<!-- TODO change dependencies to specfic version -->

### 开发环境:

>System:

* Macos

>Tools: 

* Git
* Mysql
* Node
* Nginx(optional)

### 开发逻辑约定

#### 组件数据结构: 

> 数据字段说明

native: boolean  是否原生。 如 div 为 true, 若是自己封装的则为 false

composite: boolean  是否为复合。 复合意义为非原生的组建，并且没有对应的代码映射到这个组件。Example: 一 个垂直布局 verticalLayout 有对应的对应的编辑组件文件 `components/edit/verticalLayout.js` 与预览组件文件 `components/preview/verticalLayout.js`，该组件 composite 则为 `false`(或 `null`, 此处并未要求强制声明 `false`)。 若管理员将两个垂直布局在编辑页面进行增加保存为新的布局，则成为复合布局(这两个垂直布局在保存存 layout 时会默认被一个 div 包裹)。 此处注意一定要大于两个原始布局才会被自动保存为复合。

nodeName: 节点名称，原始自建组件命名方式为驼峰，并且首字母大写。 原生组件都小写(div, h1, etc..)。此处注意复合组件的根节点 nodeName 是 div。

props: object React 属性，代码中可以取到。

children array 子元素，可为空， Example: 一个完整的组件的数据结构。

Notice
垂直布局嵌套时候，应注意子垂直布局没有 id。


> 例子

```javascript
{
  native: false, 
  composite: false,
  nodeName: 'VerticalLayout',
  props: {
    backgroundInfo: {
      background: '#b1d3db',
        backgroundType: 'pureColor',
          imageInfo: { },
      fillType: null,
      enableParallex: null
    }
  }，
  children: []
}
```

#### 可编辑组件开发约定

> 声明
1. 以下 `${nodeName}` 是_组件数据结构_中的 nodeName 
2. 复合组建没有代码文件的映射

* 文件位置约定:
编辑组件在 `components/edit/` 下
预览组件在 `components/preview/` 下

* 文件名称约定:
编辑组件: `${nodeName}.js`
预览组件: `${nodeName}.js`

* class 命名约定:
编辑组件名称: `Editable + ${nodeName}`
预览组件名称: `Preview + ${nodeName}`

* 注释约定

在文件开文
1. 用注释表名该组件对象例子。
2. 可接受的 props 和意义

* porps 开发约定
TODO 待重构
将 props 在构造方法中替换为该组件的 state, props 不应不出现在其他地方
大的重构方案，解决编辑页面组件数量达到一定程度(>70)后操作延迟高的问题。
这个问题是因为更新 stroe 中的 node 后， edit 页面会调用 flattenedData2Code 方法
递归地根据 node 数重新生成代码，十分影响性能。

新的解决方式:
1. edit 页面中只新建 root 节点, 传入所有 import 的 components, 其他等 props, node.root 的 children
```javascript
<EditableRoot
  importComponents={EditableTextArea: EditableTextArea, ......}
  ...props
  children={node.root.children}
>
</EditableRoot>
```

2. EditableRoot 中用 state.children = props.children, 通过 map state.children 和 flattenedData2Code 中的
部分方法(可能需新方法, 生成的代码要使用 `importComponents`)生成只有顶层节点是 React element 对象的数组，如下
```javascript
let topLevelChildren = [
  {selfkey: xxxx_chilren_props_selfkey, element: React.createElement(.....)},
  ......
]
```
addNode 则 push 新数据, deleteNode 则遍历该数据去除对应
```javascript
<div>
topLevelChildren.map(x => {
  x.element
})
</div>
```
3. 可编辑组件的写法也是和 root 一样的方式，不同的是通过 map state.children 和 flattenedData2Code 生成所有子节点的对象的数组
其余增删修改逻辑与 root 同

该重构任务比较庞大，建议等网站有一定业务后重构，虽然会更痛苦一点

---

* 特殊组件

> 导航栏

相关逻辑: 
  1. navBar 只能在 root 节点加入
  2. 加入navBar 时，判断 navBarChildren 是否存在，存在返回已有 navBar,即最多出现一个 navBar,没有则可以加入。此时根据当前 node 信息 update store 中的 node.navBarChildren
  3. root 节点加入其他顶层布局时，判断是否有 navBarChildren(是否有 navBar 存在)，有的话，navBarChildren 中 push 新的元素，没有的话跳过。
  4. root 节点去除其他顶层布局时，判断是否有 navBarChildren(是否有 navBar 存在)，有的话，重新计算 navBarChildren 并做更新操作。


#### CSS 开发约定

* 文件位置约定: 
`src/css/xx.css`

* 引入约定:
在 src/index.js 文件中引入，不在子组件引入

#### 与打包项目 pack-container 的关系

pack-container 只需要预览组件内容，所以也只需要预览组件引用的包和 css。

但打包项目 packge.json 中应与该项目尽量保持一致，虽然有些包可能用不到，这样降低开发成本，因为打包时其实是按需引入的。后期 docker 后可以优化。

目前都使用的文件

`src/components/preview/*`
`src/css/*`
`src/utils/*`

更次更新时，上述文件夹直接替换

src/index.js 文件应该给 pack 自己考虑










--

### 关于顶层样式(布局 layout)
1. 只有在代码中声明的样式，才能被加入到顶层样式 (指 root 节点下的子节点)
2. 顶层样式应在 addNode 时就初始化自身 id, 以便于锚点
3. 一个垂直布局可以衍生与许多子布局，但要注意这些布局不含 id，这回导致 admin 目前无法直接看 layout #TODO 

### 模板预览 图片比例

700 / 376= 1.86

### 更新远端 

rsync: 

-z 上传中压缩
-p 看到过程

    rsync  -azP -e 'ssh -p 21538' build/* root@172.247.38.148:/code/static_files


### 源于顶层 layout 的 id 生成过程

在 root 节点增加时加入






This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
