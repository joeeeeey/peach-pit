import React from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import purple from 'material-ui/colors/purple';
import blue from 'material-ui/colors/blue';
// import green from 'material-ui/colors/green';
// 需要时引入以下色板
// import red from 'material-ui/colors/red';
// import pink from 'material-ui/colors/pink';
// import deepPurple from 'material-ui/colors/deepPurple';
// import indigo from 'material-ui/colors/indigo';
// import lightBlue from 'material-ui/colors/lightBlue';
// import cyan from 'material-ui/colors/cyan';
// import teal from 'material-ui/colors/teal';
// import lightGreen from 'material-ui/colors/lightGreen';
// import lime from 'material-ui/colors/lime';
// import yellow from 'material-ui/colors/yellow';
// import amber from 'material-ui/colors/amber';
// import orange from 'material-ui/colors/orange';
// import deepOrange from 'material-ui/colors/deepOrange';

import CssBaseline from 'material-ui/CssBaseline'; // 类似于 normalize.css, 用于规范 css

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
  palette: {
    primary: {
      light: purple[300],
      main: purple[500],
      dark: purple[700],
    },
    secondary: {
      light: blue[300],
      main: blue[500],
      dark: blue[700],
    }
  },
});

function withRoot(Component) {
  function WithRoot(props) {
    // MuiThemeProvider makes the theme available down the React tree
    // thanks to React context.
    return (
      <MuiThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...props} />
      </MuiThemeProvider>
    );
  }

  return WithRoot;
}

export default withRoot;
