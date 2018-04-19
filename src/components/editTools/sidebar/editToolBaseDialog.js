import React from 'react';

export default class editToolBaseDialog extends React.Component {
  buttonStyle = () => {
    return { color: 'white', width: '100%', justifyContent: 'left' }
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
}

