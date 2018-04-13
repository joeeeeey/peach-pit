import React from 'react';
import {Redirect, Route } from 'react-router-dom'

function CheckUserLogin ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/userLogin', state: {from: props.location}}} />}
    />
  )
}

export default CheckUserLogin;