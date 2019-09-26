const loginRequested = () => {
  return {
    type: 'FETCH_LOGIN_REQUEST'
  }
}

const loginLoaded = (id) => {
  if(!id) {
    return {
      type: 'SET_LOGOUT_SUCCESS',
    }
  }

  return {
    type: 'FETCH_LOGIN_SUCCESS',
    value: id,
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

const loginSendOk = (id) => {
  if(!id) {
    return {
      type: 'SET_LOGOUT_SUCCESS',
    }
  }
  
  return {
    type: 'SET_LOGIN_SUCCESS',
    value: id,
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
    .then( (id) => dispatch(loginLoaded(id)) )
    .catch( (err) => dispatch(loginError(err.message)) )
}

const setLogin = (loginService) => (data) => (dispatch) => {
  dispatch( loginSend() );
  loginService.setLogin(data)
    .then( (id) => dispatch(loginSendOk(id)) )
    .catch( (err) => {
      console.dir(err);
      dispatch(loginSendFail(err.message)) 
    })
}

export {
  getLogin,
  setLogin,
};