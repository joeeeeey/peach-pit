import React from 'react';
import {Redirect, Route } from 'react-router-dom'

function CheckUserLogin ({component: Component, store, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => store.getState().user.isLogin === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/userLogin', state: {from: props.location}}} />}
    />
  )
}

export default CheckUserLogin;