
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';

function TabContainer({ children, dir = "x-reverse" }) {
  return (
    <div>
      <Paper style={{ width: 500, paddingTop: 16, paddingBottom: 16, marginTop: 2 * 3 }} elevation={4}>
        <Typography variant="headline" component="h3">
          {children}
        </Typography>
        <Typography component="p">
          Paper can be used to build surface or other elements for your application.
        </Typography>
      </Paper>
    </div>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

// TabContainer.propTypes = {
//   children: PropTypes.node.isRequired,
// };

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing.unit * 3,
    backgroundColor: theme.palette.background.paper,
  },
});

class SimpleTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes, theme } = this.props;
    const { value } = this.state;

    return (

      <Grid container className={{ flexGrow: 1 }}>
        <Grid item xs={12}>
          <Grid
            container
            spacing={16}
            alignItems={'center'}
            direction={'row'}
            justify={'center'}
          >

            <Grid item>

              <div className={classes.root}>
                <Paper style={{ width: 500 }}>
                  <Tabs value={value} onChange={this.handleChange}

                    fullWidth
                  >
                    <Tab label="Item One" />
                    <Tab label="Item Two" />
                  </Tabs>
                </Paper>

                {value === 0 && <TabContainer >Item One</TabContainer>}
                {value === 1 && <TabContainer >Item Two</TabContainer>}
              </div>

            </Grid>
          </Grid>
        </Grid>
      </Grid>


    );
  }
}

SimpleTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTabs);


// const styles = theme => ({
//   root: {
//     backgroundColor: theme.palette.background.paper,
//     width: 500,
//   },
// });

// class FullWidthTabs extends React.Component {
//   state = {
//     value: 0,
//   };

//   handleChange = (event, value) => {
//     this.setState({ value });
//   };

//   handleChangeIndex = index => {
//     this.setState({ value: index });
//   };

//   render() {
//     const { classes, theme } = this.props;

//     return (
//       <div className={classes.root}>
//         <AppBar position="static" color="default">
//           <Tabs
//             value={this.state.value}
//             onChange={this.handleChange}
//             indicatorColor="primary"
//             textColor="primary"
//             fullWidth
//           >
//             <Tab label="Item One" />
//             <Tab label="Item Two" />
//             <Tab label="Item Three" />
//           </Tabs>
//         </AppBar>
//         <SwipeableViews
//           axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
//           index={this.state.value}
//           onChangeIndex={this.handleChangeIndex}
//         >
//           <TabContainer dir={theme.direction}>Item One</TabContainer>
//           <TabContainer dir={theme.direction}>Item Two</TabContainer>
//           <TabContainer dir={theme.direction}>Item Three</TabContainer>
//         </SwipeableViews>
//       </div>
//     );
//   }
// }

// FullWidthTabs.propTypes = {
//   classes: PropTypes.object.isRequired,
//   theme: PropTypes.object.isRequired,
// };

// export default withStyles(styles, { withTheme: true })(FullWidthTabs);