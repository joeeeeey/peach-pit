import React from 'react';
import { Redirect, Route } from 'react-router-dom'

function CheckUserLogin({ component: Component, store, role = 'user', shouldBe, ...rest }) {
  let pathname = null
  if (role === 'user') {
    pathname = shouldBe ? '/user/login' : '/chooseTmp'
  } else if (role === 'admin') {
    role = 'administrator'
    pathname = shouldBe ? '/admin/login' : '/admin/home'
  }

  return (
    <Route
      {...rest}
      render={(props) => !!store.getState()[role].isLogin === shouldBe
        ? <Component {...props} />
        : <Redirect to={{ pathname: pathname, state: { from: props.location } }} />}
    />
  )
}

export default CheckUserLogin;