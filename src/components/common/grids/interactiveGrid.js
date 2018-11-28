import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Grid from "material-ui/Grid";
import { FormControl, FormLabel, FormControlLabel } from "material-ui/Form";
import Radio, { RadioGroup } from "material-ui/Radio";
import Paper from "material-ui/Paper";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  demo: {
    height: 240
  },
  paper: {
    // padding: theme.spacing.unit * 2,
    // height: '100%',

    padding: theme.spacing.unit * 1,
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: 240,
    margin: 15
  },
  control: {
    padding: theme.spacing.unit * 2
  }
});

class InteractiveGrid extends React.Component {
  state = {
    direction: "row", // ["row", "row-reverse", "column"]
    justify: "space-around", // ["flex-start", "center", "flex-end", "space-between", "space-around"]
    alignItems: "center" // ["flex-start","center","flex-end","stretch","baseline"]
  };

  handleChange = key => (event, value) => {
    this.setState({
      [key]: value
    });
  };

  render() {
    const { classes } = this.props;
    // change to be prop
    const { alignItems, direction, justify } = this.state;
    return (
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Grid
            container
            spacing={16}
            className={classes.demo}
            alignItems={alignItems}
            direction={direction}
            justify={justify}>
            <Grid item md={5} xs={12} sm={6}>
              <Paper className={classes.paper}>test_12</Paper>
            </Grid>
            <Grid item md={5} xs={12} sm={6}>
              <Paper className={classes.paper}>test_12</Paper>
            </Grid>

            {/* [0,1,2] change to be prop */}
            {/* {[0, 1, 2].map(value => (
              <Grid key={value} item>
                <Paper
                  className={classes.paper}
                  style={{ paddingTop: (value + 1) * 20, paddingBottom: (value + 1) * 20 }}
                >
                  {`Cell ${value + 1}`}
                </Paper>
              </Grid>
            ))} */}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

InteractiveGrid.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(InteractiveGrid);
