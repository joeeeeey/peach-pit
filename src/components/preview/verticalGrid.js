// 可传入 props: children array
// 垂直布局最外层是水平布局的 Grid
// 而子 Grid 里才是垂直

import React, { Component } from 'react';
import Grid from 'material-ui/Grid';

export default class PreviewVerticalGrid extends Component {
  render() {
    return (
      <div>
        <Grid container style={{ flexGrow: 1 }} direction="row" justify="space-around" alignItems="center">
          {this.props.children &&
            React.Children.toArray(this.props.children).map((child, index) => {
              return (
                <Grid key={index} item xs={12} style={{ padding: '22px 0'}}>
                  {child}
                </Grid>
              )
            })
          }
        </Grid>
      </div>
    );
  }
}
