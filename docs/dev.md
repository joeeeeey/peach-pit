## 开发约定

建站器需要对组件的实现*可操作*功能(添加，删除，修改属性)。目前其实现方案为:
对 React 的虚拟节点再次封装，使得继承于 React.component 的组件类可以
成为一个*可操作*的节点，并且可以与其他节点或自身组装。

#### 可操作节点数据结构: 
见 `src/utils/nodeOperation.js`

#### 可编辑组件开发约定
*声明*
1. 以下 `${nodeName}` 是_可操作节点数据结构_中的 nodeName 
2. 复合组件没有代码文件的映射

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
