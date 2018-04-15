import React from 'react';
import {Redirect, Route } from 'react-router-dom'

function CheckUserLogin ({component: Component, store, ...rest}) {
  console.log("CheckUserLogin")
  console.log(store.getState().user)
  return (
    <Route
      {...rest}
      render={(props) => store.getState().user.isLogin === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/user/login', state: {from: props.location}}} />}
    />
  )
}

export default CheckUserLogin;