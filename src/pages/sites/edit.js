import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
import purple from 'material-ui/colors/purple';
import AppBar from '../../components/common/appBar'
const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
});


const func = (function (React /*``*/) {
  return function App() {
    return (
      <div>
        {
          React.createElement(
            AppBar,
            null
          )
        }
        {
          React.createElement(
            "h1",
            null,
            "Hello, world!")
        }
      </div>
    )
  }
})

const App = func(React)
export default App;

// export default withStyles(styles)(App);
