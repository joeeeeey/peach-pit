import React, { Component } from 'react';
// import EditableButton from '../components/edit/button'
import EditableTextArea from '../components/edit/textArea'

import Grid from 'material-ui/Grid';
import EditableLetfRightGrid from '../components/edit/letfRightGrid'
import EditableCard from '../components/edit/card'
import EditableCardMedia from '../components/edit/cardMedia'
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
class Test extends Component {
  constructor(props) {
    super(props);
    // this.state = { children1: "测试文字1", children2: "测试文字2", children3: "测试文字3" }
  }


  render() {
    return (
      <div>
        <EditableLetfRightGrid>
          <EditableTextArea content={'好吃的东西'}
            style={{ textAlign: 'center', fontSize: 30, fontWeight: 500, color: "#1c1a1a" }}
          ></EditableTextArea>
          <EditableTextArea content={'就是有点辣啊。就是有点辣啊。就是有点辣啊。就是有点辣啊。就是有点辣啊。就是有点辣啊。就是有点辣啊。就是有点辣啊。就是有点辣啊。就是有点辣啊。啊啊 啊啊啊啊啊啊啊啊'}
            style={{ textAlign: 'center', fontSize: 20, fontWeight: 400, color: "#1c1a1a", float: "center" }}
          ></EditableTextArea>
          <EditableCard style={{ maxWidth: 'auto', marginLeft: 20 }}>
            <EditableCardMedia 
            style={ { height: 280 }}
            image = {"/images/ORG_DSC01034.jpg"}
            />
          </EditableCard>
        </EditableLetfRightGrid>
      </div>
      // <div style={{ textAlign: 'center' }}>
      //   {/* 纵向布局，把屏幕分为左右两块的布局 */}
      //   <Grid container direction="row" spacing={16} justify={'center'} alignItems={'baseline'}>
      //     <Grid item lg={5} md={5} sm={5} xs={11} style={{ border: '0.005rem solid #6d6d6d' }}>
      //       <Grid container direction="column" >
      //           <EditableTextArea children={this.state.children1} handler = {this.handler} />
      //           <EditableTextArea children={this.state.children2} handler = {this.handler} />
      //       </Grid>
      //     </Grid>
      //     <Grid item lg={6} md={6} sm={6} xs={11} style={{ border: '0.005rem solid #6d6d6d' }}>
      //       <Grid container direction="column" >
      //           <EditableTextArea children={this.state.children3} handler = {this.handler} />
      //       </Grid>
      //     </Grid>
      //   </Grid>
      //   <h1>底下的东西</h1>
      // </div>
    );
  }
}

export default Test;