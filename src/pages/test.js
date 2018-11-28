import React from "react";
import PropTypes from "prop-types";
// import { withStyles } from 'material-ui/styles';
import Grid from "material-ui/Grid";
// import { FormControl, FormLabel, FormControlLabel } from 'material-ui/Form';
// import Radio, { RadioGroup } from 'material-ui/Radio';
import Paper from "material-ui/Paper";
import EditableImageArea from "components/edit/imageArea";
import EditableTextArea from "components/edit/textArea";
import EditableVerticalLayout from "components/edit/verticalLayout";

const children = [
  {
    props: {},
    src:
      "http://blog-src.b0.upaiyun.com/taohe/dev/editPage/administrator/1/temporary/layout/a96322da6ff86340da9a23bc2fbb59a6"
  }
];

// const node = {
//   native: false,
//   nodeName: 'ImageDescription',
//   props: {
//   },
//   children: [
//     [
//       { native: false, nodeName: 'EditableImageArea', props: { src: "http://blog-src.b0.upaiyun.com/taohe/dev/editPage/administrator/1/temporary/layout/a96322da6ff86340da9a23bc2fbb59a6" } },
//       {
//         native: false,
//         nodeName: 'EditableVerticalLayout',
//         props: {
//           backgroundInfo: {
//             background: 'white',
//             backgroundType: 'pureColor',
//             imageInfo: {},
//             fillType: null,
//             enableParallex: null
//           }
//         }
//       },
//     ],
//     [
//       { native: false, nodeName: 'EditableImageArea', props: { src: "http://blog-src.b0.upaiyun.com/taohe/dev/editPage/administrator/1/temporary/layout/a96322da6ff86340da9a23bc2fbb59a6" } },
//       {
//         native: false,
//         nodeName: 'EditableVerticalLayout',
//         props: {
//           backgroundInfo: {
//             background: 'white',
//             backgroundType: 'pureColor',
//             imageInfo: {},
//             fillType: null,
//             enableParallex: null
//           }
//         }
//       },
//     ]
//     ,
//   ]
// }

export default class EditableImageDescription extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      row: this.props.row || 3, // 默认三行
      childrenCounts: this.props.children || 0
    };
  }

  getChildContext() {
    return { store: this.context.store };
  }

  render() {
    const {
      classes,
      containerConfig = {
        justify: "center",
        spacing: 16
      }
    } = this.props;
    const { justify, spacing } = containerConfig;

    const horizontalGridStyle = {
      border: "1px solid black",
      marginTop: 20
      // height: '100%'
    };

    const horizontalGridChildStyle = {
      border: "1px solid blue"
    };

    return (
      <div style={{ background: "white", marginTop: 20 }}>
        <Grid
          name="水平"
          style={horizontalGridStyle}
          container
          direction={"row"}
          justify={"center"}>
          <Grid
            item
            xs={12}
            sm={3}
            md={3}
            lg={3}
            style={horizontalGridChildStyle}>
            <div name="girdContainer" style={{ padding: "5%" }}>
              <EditableImageArea
                src={children[0].src}
                imageContainerStyle={{}}
                // imageStyle={{ width: childPhotoInfo.width, height: childPhotoInfo.height }}
                noMeasure={false}
                {...children[0].props}
              />

              <Paper style={{ minHeight: 100 }}>
                <EditableVerticalLayout
                  backgroundInfo={{
                    background: "white",
                    backgroundType: "pureColor",
                    imageInfo: {},
                    fillType: null,
                    enableParallex: null
                  }}
                />

                {/* <EditableTextArea /> */}
              </Paper>
              <Paper>xs=12 sm=6</Paper>
            </div>
          </Grid>

          <Grid
            item
            xs={12}
            sm={4}
            md={4}
            lg={4}
            style={horizontalGridChildStyle}>
            <Paper style={{ height: "20%" }}>xs=12 sm=6</Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

EditableImageDescription.contextTypes = {
  store: PropTypes.object
};

EditableImageDescription.childContextTypes = {
  store: PropTypes.object
};

{
  /* <Grid item xs={12} sm={4} md={4} lg={4} style={horizontalGridChildStyle}>
<EditableImageArea 
imageStyle={{minHeight: 200, height: '100%', width: '100%'}} 
imageContainerStyle={{height: '100%'}}
src={'http://blog-src.b0.upaiyun.com/taohe/dev/editPage/administrator/1/temporary/layout/d2376afa10f903913950b7bbfe624415'}/>
</Grid>

<Grid item xs={12} sm={4} md={4} lg={4} style={horizontalGridChildStyle}>
<div style={{height: 20}}>
<Paper style={{height: '20'}}>adasdasd</Paper>
</div>

</Grid>
<Grid item xs={12} sm={4} md={4} lg={4} style={horizontalGridChildStyle}>
<Paper style={{height: '20'}}>asdadsda</Paper>
</Grid>
<Grid item xs={12} sm={4} md={4} lg={4} style={horizontalGridChildStyle}>
<Paper style={{height: '20%'}}>adadss</Paper>
</Grid> */
}

// const styles = theme => ({
//   root: {
//     flexGrow: 1,
//   },
//   demo: {
//     height: 240,
//   },
//   paper: {
//     padding: theme.spacing.unit * 2,
//     height: '100%',
//   },
//   control: {
//     padding: theme.spacing.unit * 2,
//   },
// });

// class InteractiveGrid extends React.Component {
//   state = {
//     direction: 'row',
//     justify: 'center',
//     alignItems: 'center',
//   };

//   handleChange = key => (event, value) => {
//     this.setState({
//       [key]: value,
//     });
//   };

//   render() {
//     const { classes } = this.props;
//     const { alignItems, direction, justify } = this.state;
//     return (
//       <Grid container className={classes.root}>
//         <Grid item xs={12}>
//           <Grid
//             container
//             spacing={16}
//             className={classes.demo}
//             alignItems={alignItems}
//             direction={direction}
//             justify={justify}
//           >
//             {[0, 1, 2,3,4,5,6,7].map(value => (
//               <Grid key={value} item>
//                 <Paper
//
//                   style={{ paddingTop: (value + 1) * 10, paddingBottom: (value + 1) * 10 }}
//                 >
//                   {`Cell ${value + 1}`}
//                 </Paper>
//               </Grid>
//             ))}
//           </Grid>
//         </Grid>
//         <Grid item xs={12}>
//           <Paper className={classes.control}>
//             <Grid container>
//               <Grid item xs={6} sm={4}>
//                 <FormControl component="fieldset">
//                   <FormLabel>direction</FormLabel>
//                   <RadioGroup
//                     name="direction"
//                     aria-label="direction"
//                     value={direction}
//                     onChange={this.handleChange('direction')}
//                   >
//                     <FormControlLabel value="row" control={<Radio />} label="row" />
//                     <FormControlLabel value="row-reverse" control={<Radio />} label="row-reverse" />
//                     <FormControlLabel value="column" control={<Radio />} label="column" />
//                     <FormControlLabel
//                       value="column-reverse"
//                       control={<Radio />}
//                       label="column-reverse"
//                     />
//                   </RadioGroup>
//                 </FormControl>
//               </Grid>
//               <Grid item xs={6} sm={4}>
//                 <FormControl component="fieldset">
//                   <FormLabel>justify</FormLabel>
//                   <RadioGroup
//                     name="justify"
//                     aria-label="justify"
//                     value={justify}
//                     onChange={this.handleChange('justify')}
//                   >
//                     <FormControlLabel value="flex-start" control={<Radio />} label="flex-start" />
//                     <FormControlLabel value="center" control={<Radio />} label="center" />
//                     <FormControlLabel value="flex-end" control={<Radio />} label="flex-end" />
//                     <FormControlLabel
//                       value="space-between"
//                       control={<Radio />}
//                       label="space-between"
//                     />
//                     <FormControlLabel
//                       value="space-around"
//                       control={<Radio />}
//                       label="space-around"
//                     />
//                   </RadioGroup>
//                 </FormControl>
//               </Grid>
//               <Grid item xs={6} sm={4}>
//                 <FormControl component="fieldset">
//                   <FormLabel>alignItems</FormLabel>
//                   <RadioGroup
//                     name="alignItems"
//                     aria-label="alignItems"
//                     value={alignItems}
//                     onChange={this.handleChange('alignItems')}
//                   >
//                     <FormControlLabel value="flex-start" control={<Radio />} label="flex-start" />
//                     <FormControlLabel value="center" control={<Radio />} label="center" />
//                     <FormControlLabel value="flex-end" control={<Radio />} label="flex-end" />
//                     <FormControlLabel value="stretch" control={<Radio />} label="stretch" />
//                     <FormControlLabel value="baseline" control={<Radio />} label="baseline" />
//                   </RadioGroup>
//                 </FormControl>
//               </Grid>
//             </Grid>
//           </Paper>
//         </Grid>
//       </Grid>
//     );
//   }
// }

// InteractiveGrid.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(InteractiveGrid);
