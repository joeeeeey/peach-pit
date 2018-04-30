import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Tabs, { Tab } from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';

// login form
import LoginFrom from '../../components/common/forms/login'

function TabContainer({ children, dir = "x-reverse" }) {
  return (
    <div>
      <Paper style={{ width: 500, paddingTop: 16, paddingBottom: 16, marginTop: 2 * 3 }} elevation={4}>
        {children}
      </Paper>
    </div>
  );
}

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
  },
  textFieldRoot: {
    padding: 0,
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
  },
  textFieldInput: {
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 12px',
    width: 'calc(100% - 24px)',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
  textFieldFormLabel: {
    fontSize: 18,
  },
});
class AdminLogin extends React.Component {
  constructor(props, context){
    super(props)
    this.state = {
      value: 0,
    };
  }

  getChildContext() {
    return { store: this.context.store };
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <Grid container style={{ flexGrow: 1, marginTop: '3.75rem' }}>
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
                  <Tabs value={0}  fullWidth>
                    <Tab label="登录" />
                  </Tabs>
                </Paper>
                {value === 0 && <TabContainer ><LoginFrom role={'admin'}/></TabContainer>}
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}


AdminLogin.contextTypes = {
  store: PropTypes.object
};

AdminLogin.childContextTypes = {
  store: PropTypes.object
};

export default withStyles(styles)(AdminLogin);







