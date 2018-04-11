// edit 根节点 
// 其实是个 div
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import nodeOperation from '../../share/nodeOperation'

export default class EditableRoot extends Component {
  constructor(props, context) {
    super(props);
    // this.state = { addNodeName: 'TextArea'}
  }

  addNode = (nodeName) => {
    // let nodeName = this.state.addNodeName
    let {selfkey} = this.props
    this.context.store.dispatch({
      type: 'addNode',
      payload: {selfKey: selfkey, nodeName: nodeName}
    });    
  }

  addLetfRightGridNode = () => {
    this.addNode('LetfRightGrid')
  }
  addTextAreaNode = () =>{
    this.addNode('TextArea')
  }

  lowerFirstLetter = (s) =>{
    return s.replace(/^.{1}/g, s[0].toLowerCase());
  }

  preview = ()=>{
    alert(JSON.stringify(this.context.store.getState()))
    // alert(JSON.stringify(nodeOperation.heightenDomTree(this.context.store.getState())))
    // console.log(nodeOperation.heightenDomTree(this.context.store.getState()))
  }

  deploy = ()=> {
    //  TODO 配置在文件中
    // 引入文件的路劲前缀
    let pathPrefix = '../components/preview/' 

    let nodeData = this.context.store.getState()

    let importComponents = []
    for(let i in nodeData){
      if(nodeData[i].nodeName){
        importComponents.push(nodeData[i].nodeName)
      }      
    }

    importComponents = [...new Set(importComponents)]
    let importCode = ""
    for(let i=0; i< importComponents.length; i++){
      importCode += `import Preview${importComponents[i]} from '${pathPrefix + this.lowerFirstLetter(importComponents[i])}'\n`
    }

    let nodeCode = nodeOperation.flattenedData2Code(nodeData, 'deploy')
    let indexJsCode = `
import React, { Component } from 'react';
import withRoot from '../withRoot';    
${importCode}    
class Index extends Component {
  render() {
    return (
    ${nodeCode}
   );
  }
}

export default withRoot(Index);    
    `
    this.download(indexJsCode, 'deploy.txt', 'text/plain')
  }
    
  // 测试代码生成的功能，应该由后端完成
  // TODO Do it at Backend 
  download = (text, name, type) => {
    var a = document.getElementById("a");
    var file = new Blob([text], {type: type});
    a.href = URL.createObjectURL(file);
    a.download = name;
  }

  render() {
    return (
      <div>

        <Button onClick={this.addLetfRightGridNode}>增加一个左右布局</Button>
        <Button onClick={this.addTextAreaNode}>增加一个上下输入框布局</Button>
        <Button variant="raised" color="primary" onClick={this.preview}>预览</Button>
        <Button id={"QWE"} style={{marginLeft:15}} variant="raised" color="secondary" onClick={this.deploy}>一键部署</Button>
        <a href="" id="a" style={{marginLeft:15}}>下载代码</a>
        {this.props.children}
      </div>
    );
  }
}


EditableRoot.contextTypes = {
  store: PropTypes.object
};