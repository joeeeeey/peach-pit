## 开发约定

### 简介

建站器需要对组件的实现*可操作*功能(添加，删除，修改属性)。目前其实现方案为:
对 React 的虚拟节点再次封装，使得继承于 React.component 的组件类可以
成为一个*可操作*的节点，并且可以与其他节点或自身组装。

### 编辑页的组成元素
  - 组件 component
  - 布局 layout
  - 模板 template

```
开发者编写组件(component)到代码中。

管理员将根据组件定制 layout 和 template.

layout 与 template 本质上是相同的,他们有着几乎一样的数据格式. 不同的是
对于用户, template 对应的是整个 site(网站). layout 则为 site 中可编辑
的元素.
```

### 关于 layout (布局)
1. 顶层样式应在 addNode 时就初始化自身 id, 以便于锚点
2. 一个垂直布局可以衍生许多子布局，但要注意这些布局不含 id，这导致 admin 目前无法直接看 layout (TODO 优化)

### 可操作节点数据结构:
见 `src/utils/nodeOperation.js`

### 可编辑组件开发约定

Note:

    - 以下 nodeName 是_可操作节点数据结构_中的 nodeName。
    - 复合组件( {composite: true} )没有代码文件的映射。

* 文件位置约定:
  - 编辑组件在 `components/edit/` 下
  - 预览组件在 `components/preview/` 下

* 文件名称约定:
  - 编辑组件: `${nodeName}.js`
  - 预览组件: `${nodeName}.js`

* class 命名约定:
  - 编辑组件名称: `Editable + ${nodeName}`
  - 预览组件名称: `Preview + ${nodeName}`

* 注释约定(TODO)
  - 在文件开文, 用注释表名该组件对象例子。
  - Component 增加对 PropTypes 的声明

* CSS 开发约定
  - 文件位置约定: `src/css/xx.css`
  - 引入位置: 在 src/index.js 文件中统一引入，不在子组件引入。

### 特殊组件

      导航栏(NavBar)

相关逻辑:
  1. navBar 只能在 root 节点加入
  2. 加入navBar 时，判断 navBarChildren 是否存在，存在返回已有 navBar,即最多出现一个 navBar,没有则可以加入。此时根据当前 node 信息 update store 中的 node.navBarChildren
  3. root 节点加入其他顶层布局时，判断是否有 navBarChildren(是否有 navBar 存在)，有的话，navBarChildren 中 push 当前已经存在的顶层布局元素，没有的话跳过。
  4. root 节点去除其他顶层布局时，判断是否有 navBarChildren(是否有 navBar 存在)，有的话，更新 navBarChildren.


### 该 repo 与打包项目 `pack-container` 的关系

pack-container 只需要预览组件内容，所以也只需要预览组件引用的包和 css。

但打包项目 packge.json 中应与该项目尽量保持一致，虽然有些包可能用不到，这样降低开发成本，因为打包时其实是按需引入的。后期 docker 后可以优化。

目前都使用的文件

    src/components/preview/*
    src/css/*
    src/utils/*

每次更新时，将上述文件夹直接替换

`pack-container` 的 `src/index.js` 应自己编写。(需引用的内容)

---

### 模板预览 图片比例

700 / 376= 1.86

### 更新远端 

方案1： `rsync`

- `-z`: 上传中压缩
- `-p`: 看到过程

    $ rsync  -azP -e 'ssh -p 21538' build/* root@xx.xx.38.148:/code/static_files

<!-- TODO 待重构
1. (使用 react-redux 的 dispatch 方法,) 
2. 在更新降维对象后修改整个大节点。(对上次大节点进行改动，而不是用递归重新生产整个节点)。 -->

<!-- ~~新的解决方式(已废弃):~~ -->
<!-- 1. edit 页面中只新建 root 节点, 传入所有 import 的 components, 其他等 props, node.root 的 children
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
其余增删修改逻辑与 root 同 -->
