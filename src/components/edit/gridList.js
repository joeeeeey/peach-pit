import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import GridList, { GridListTile } from 'material-ui/GridList';
import EditableGridListTile from '../edit/gridListTile'
/**
let props = {
  style: {
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
      },
      gridList: {
        width: 500,
        height: 'auto',
      }
    }, cellHeight: 200
}
*/


export default class EditableGridList extends React.Component {
  constructor(props, context) {
    super(props)
  }

  render() {
    // console.log(this.props)
    // const style = {
    //   root: {
    //     display: 'flex',
    //     flexWrap: 'wrap',
    //     justifyContent: 'space-around',
    //     overflow: 'hidden',
    //   },
    //   gridList: {
    //     width: 500,
    //     height: 'auto',
    //   }
    // }

    const {style, cellHeight, cols} = this.props
    const tile = {
      img: '/images/ORG_DSC01101.jpg',
      title: 'Image',
      cols: 1,
      rows: 1
    }

    return (
      <div style={style.root}>
        <GridList cellHeight={cellHeight} style={style.gridList} cols={cols}>
          {/* {this.props.children} */}
          {React.createElement(
            GridListTile,
            { key: tile.img, cols: tile.cols || 1, rows: tile.rows || 1 },
            React.createElement(EditableGridListTile, { src: tile.img, alt: tile.title })
          )}

   
          {/* {tileData.map(tile => (
            <GridListTile key={tile.img} cols={tile.cols || 1} rows={tile.rows || 1}>
              // <img src={tile.img} alt={tile.title} />
            </GridListTile>
          ))} */}
        </GridList>
      </div>
    );
  }
}


// EditableGridList.propTypes = {
//   classes: PropTypes.object.isRequired,
// };
