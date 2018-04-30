import React, { Component } from 'react';
import Card from 'material-ui/Card';
import Grid from 'material-ui/Grid';

class BlankCard extends Component {
  render() {
    const {
      lg = 4,
      md = 4,
      sm = 5,
      xs = 11,
      gridStyle = {
        marginTop: 12,
        paddingLeft: 16,
        paddingRight: 16,
        height: 'auto'
      },
      cardStyle = { minWidth: 230 }
    } = this.props
    return (
      <Grid item lg={lg} md={md} sm={sm} xs={xs} style={gridStyle}>
        <Card style={cardStyle}>
          {this.props.children}
        </Card>
      </Grid>
    )
  }
}

// BlankCard.contextTypes = {
//   store: PropTypes.object
// };

// BlankCard.childContextTypes = {
//   store: PropTypes.object
// };

export default BlankCard 