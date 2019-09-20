const loginRequested = () => {
  return {
    type: 'FETCH_LOGIN_REQUEST'
  }
}

const loginLoaded = (user) => {
  if(!user) {
    return {
      type: 'SET_LOGOUT_SUCCESS',
    }
  }

  return {
    type: 'FETCH_LOGIN_SUCCESS',
    value: user,
  }
}

const loginError = (error) => {
  return {
    type: 'FETCH_LOGIN_FAILURE',
    value: error,
  }
}


const loginSend = () => {
  return {
    type: 'SET_LOGIN_REQUEST'
  }
}

const loginSendOk = (user) => {
  if(!user) {
    return {
      type: 'SET_LOGOUT_SUCCESS',
    }
  }
  
  return {
    type: 'SET_LOGIN_SUCCESS',
    value: user,
  }
}

const loginSendFail = (error) => {
  
  return {
    type: 'SET_LOGIN_FAILURE',
    value: error,
  }
}

const getLogin = (loginService) => () => (dispatch) => {
  dispatch( loginRequested() );
  loginService.getLogin()
    .then( (user) => dispatch(loginLoaded(user)) )
    .catch( (err) => dispatch(loginError(err)) )
}

const setLogin = (loginService) => (data) => (dispatch) => {
  dispatch( loginSend() );
  loginService.setLogin(data)
    .then( (user) => dispatch(loginSendOk(user)) )
    .catch( (err) => dispatch(loginSendFail(err)) )
}

export {
  getLogin,
  setLogin,
};