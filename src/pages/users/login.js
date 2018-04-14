import React from 'react';

// Ant
import 'antd/dist/antd.css'
import { Form, Icon, Input, Button, Checkbox } from 'antd';

// Mu
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import MuButton from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
// input
import MuInput, { InputLabel, InputAdornment } from 'material-ui/Input';
import Visibility from 'material-ui-icons/Visibility';
import VisibilityOff from 'material-ui-icons/VisibilityOff';



const FormItem = Form.Item;


class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }


  // state = {
  //   amount: '',
  //   password: '',
  //   weight: '',
  //   weightRange: '',
  //   showPassword: false,
  // };

  // handleChange = prop => event => {
  //   this.setState({ [prop]: event.target.value });
  // };

  // handleMouseDownPassword = event => {
  //   event.preventDefault();
  // };

  // handleClickShowPassword = () => {
  //   this.setState({ showPassword: !this.state.showPassword });
  // };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem style={{maxWidth: 260, margin: 'auto'}}>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请填入用户名' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="手机号或邮箱" />
          )}
        </FormItem>
        <FormItem style={{maxWidth: 260, margin: 'auto'}}>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请填入登录密码' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
          )}

        </FormItem>
        <FormItem style={{ textAlign: 'center' }}>
          <MuButton variant="raised" color="secondary" style={{marginTop: 10,width: 260}} type="submit">
            Let Me In
          </MuButton>
        </FormItem>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);


function TabContainer({ children, dir = "x-reverse" }) {
  return (
    <div>
      <Paper style={{ width: 500, paddingTop: 16, paddingBottom: 16, marginTop: 2 * 3 }} elevation={4}>
        <WrappedNormalLoginForm />
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
      <Grid container style={{ flexGrow: 1, marginTop: 30 }}>
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
                  <Tabs value={value} onChange={this.handleChange} fullWidth>
                    <Tab label="登录" />
                    <Tab label="注册" />
                  </Tabs>
                </Paper>

                {value === 0 && <TabContainer >登录</TabContainer>}
                {value === 1 && <TabContainer >注册</TabContainer>}
              </div>

            </Grid>
          </Grid>
        </Grid>
      </Grid>


    );
  }
}


export default withStyles(styles)(SimpleTabs);












// import React from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from 'material-ui/styles';
// import AppBar from 'material-ui/AppBar';
// import Tabs, { Tab } from 'material-ui/Tabs';
// import Typography from 'material-ui/Typography';
// import Paper from 'material-ui/Paper';
// import Grid from 'material-ui/Grid';

// import Input, { InputLabel } from 'material-ui/Input';
// import TextField from 'material-ui/TextField';
// import { FormControl } from 'material-ui/Form';
// import purple from 'material-ui/colors/purple';

// const styles = theme => ({
//   container: {
//     display: 'flex',
//     flexWrap: 'wrap',
//   },
//   formControl: {
//     margin: theme.spacing.unit,
//   },
//   inputLabelFocused: {
//     color: purple[500],
//   },
//   inputUnderline: {
//     '&:after': {
//       backgroundColor: purple[500],
//     },
//   },
//   textFieldRoot: {
//     padding: 0,
//     'label + &': {
//       marginTop: theme.spacing.unit * 3,
//     },
//   },
//   textFieldInput: {
//     borderRadius: 4,
//     backgroundColor: theme.palette.common.white,
//     border: '1px solid #ced4da',
//     fontSize: 16,
//     padding: '10px 12px',
//     width: 'calc(100% - 24px)',
//     transition: theme.transitions.create(['border-color', 'box-shadow']),
//     '&:focus': {
//       borderColor: '#80bdff',
//       boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
//     },
//   },
//   textFieldFormLabel: {
//     fontSize: 18,
//   },
// });


// function TabContainer({ children, dir = "x-reverse" }) {
//   return (
//     <div>
//       <Paper style={{ width: 500, paddingTop: 16, paddingBottom: 16, marginTop: 2 * 3 }} elevation={4}>
//           {/* <FormControl className={classes.formControl}>
//             <InputLabel
//               FormLabelClasses={{
//                 focused: classes.inputLabelFocused,
//               }}
//               htmlFor="custom-color-input"
//             >
//               Name
//             </InputLabel>
//             <Input
//               classes={{
//                 underline: classes.inputUnderline,
//               }}
//               id="custom-color-input"
//             />
//           </FormControl> */}
//       </Paper>
//     </div>
//   );
// }

// TabContainer.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// // TabContainer.propTypes = {
// //   children: PropTypes.node.isRequired,
// // };

// const styles = theme => ({
//   root: {
//     flexGrow: 1,
//     marginTop: theme.spacing.unit * 3,
//     backgroundColor: theme.palette.background.paper,
//   },
// });

// class SimpleTabs extends React.Component {
//   state = {
//     value: 0,
//   };

//   handleChange = (event, value) => {
//     this.setState({ value });
//   };

//   render() {
//     const { classes, theme } = this.props;
//     const { value } = this.state;

//     return (

//       <Grid container className={{ flexGrow: 1 }}>
//         <Grid item xs={12}>
//           <Grid
//             container
//             spacing={16}
//             alignItems={'center'}
//             direction={'row'}
//             justify={'center'}
//           >

//             <Grid item>
//               <div className={classes.root}>
//                 <Paper style={{ width: 500 }}>
//                   <Tabs value={value} onChange={this.handleChange} fullWidth>
//                     <Tab label="Item One" />
//                     <Tab label="Item Two" />
//                   </Tabs>
//                 </Paper>

//                 {value === 0 && <TabContainer >登录</TabContainer>}
//                 {value === 1 && <TabContainer >注册</TabContainer>}
//               </div>

//             </Grid>
//           </Grid>
//         </Grid>
//       </Grid>


//     );
//   }
// }

// SimpleTabs.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(SimpleTabs);


// // const styles = theme => ({
// //   root: {
// //     backgroundColor: theme.palette.background.paper,
// //     width: 500,
// //   },
// // });

