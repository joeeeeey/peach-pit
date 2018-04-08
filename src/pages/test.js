import React, { Component } from 'react';
import EditableButton from '../components/edit/button'
import EditableTextArea from '../components/edit/textArea'

import Grid from 'material-ui/Grid';
// ["row", "row-reverse", "column"]

// function getTmpData() {
//   //  TODO 数据从后端返回
//   return [{
//     native: true, nodeName: 'div', props: { style: { color: "blue" } },
//     children:
//       [
//         { native: false, nodeName: 'AppBar', props: null },
//         {
//           native: true, nodeName: 'h1',
//           props: { style: { color: "blue" } },
//           children: "Hello World"
//         },
//         {
//           native: false, nodeName: 'FullWidthGrid',
//           props: {
//             containerConfig: { spacing: 40, justify: 'space-around' },
//             itemsConfig: {
//               lists: [{ data: { content: "网页模板1", imgUrl: "IMG_7881.jpg", templateId: 1, }, key: 1 }],
//               itemName: 'WebTemplateCard'
//             }
//           }
//         }
//       ]
//   }]
// }


class Test extends Component {
  constructor(props) {
    super(props);
    this.state = { children1: "测试文字1", children2: "测试文字2", children3: "测试文字3" }
    this.handler = this.handler.bind(this)
  }

  handler(e) {
    e.preventDefault()
    console.log(e.target.location)

    this.setState({children2: e.target.value});
    // this.setState({
    //   someVar: someValue
    // })
  }

  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <Grid container direction="row" spacing={16} justify={'center'} alignItems={'baseline'}>
          <Grid item lg={5} md={5} sm={5} xs={11} style={{ border: '0.005rem solid #6d6d6d' }}>
            <Grid container direction="column" >
              <Grid item lg={12} md={12} sm={12} xs={12} >
                <EditableTextArea children={this.state.children1} handler = {this.handler} />
                <EditableTextArea children={this.state.children2} handler = {this.handler} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={11} style={{ border: '0.005rem solid #6d6d6d' }}>
            <Grid container direction="column" >
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <EditableTextArea children={this.state.children3} handler = {this.handler} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <h1>底下的东西</h1>
      </div>
    );
  }
}

export default Test;


// class Parent extends React.Component {
//   constructor(props) {
//     super(props)

//     this.handler = this.handler.bind(this)
//   }

//   handler(e) {
//     e.preventDefault()
//     this.setState({
//       someVar: someValue
//     })
//   }

//   render() {
//     return <Child handler = {this.handler} />
//   }
// }

// class Child extends React.Component {
//   render() {
//     return <Button onClick = {this.props.handler}/ >
//   }
// }