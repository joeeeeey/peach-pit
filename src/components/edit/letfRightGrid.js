// TODO CSS 传入，调整内部顺序
import React from 'react';
import Grid from 'material-ui/Grid';

export default class EditableLetfRightGrid extends React.Component {
  render() {
    return (
      <div style={{ flexGrow: 1, margin: 20, paddingLeft: 40, paddingRight:40 }}>
        <Grid container spacing={24} justify={'space-around'}>
          <Grid item xs={12} sm={7} >
            <Grid
              container
              spacing={24}
              alignItems={'stretch'}
              direction={'column'}
              justify={'space-around'}
            >
              <Grid item xs={12}>
                {this.props.children[0]}
              </Grid>
              {this.props.children[1]}
              <Grid item xs={12}>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={5}>
            {this.props.children[2]}
          </Grid>
        </Grid>
      </div>
    )
  }
}