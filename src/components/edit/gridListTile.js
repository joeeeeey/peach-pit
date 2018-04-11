import React from 'react';
import PropTypes from 'prop-types';
import { GridListTile } from 'material-ui/GridList';


export default class EditableGridListTile extends React.Component {
  constructor(props, context) {
    super(props)
  }

  render() {
    // const tileData = [
    //   {
    //     img: `/images/IMG_7881.jpg`,
    //     title: 'Image',
    //     author: 'author',
    //     cols: 3,
    //     rows: 1,
    //   },
      // {
      //   img: '/images/ORG_DSC01101.jpg',
      //   title: 'Image',
      //   cols: 3,
      //   rows: 3
      // },
    // ];

    const {cols, rows, img, title, src, alt} = this.props
    return (
      <div>
        {React.createElement('img', { src: src, alt: alt })}
      </div>
      
      // <GridListTile cols={cols || 1} rows={rows || 1}>
      //   {this.props.children}
      //   {/* <img src={img} alt={title} />
      //   {React.createElement('img', { src: img, alt: title })} */}
    
      // </GridListTile>       
      // React.createElement(
      //   GridListTile,
      //   { key: img, cols: cols || 1, rows: rows || 1 },
      //   React.createElement('img', { src: img, alt: title })
      // )        
      

 
      // <GridListTile key={tile.img} cols={tile.cols || 1} rows={tile.rows || 1}>
      //   <img src={tile.img} alt={tile.title} />
      // </GridListTile>
    );
  }
}


// EditableGridList.propTypes = {
//   classes: PropTypes.object.isRequired,
// };
