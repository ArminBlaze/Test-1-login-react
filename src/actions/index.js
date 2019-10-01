const fetchRequested = () => {
  return {
    type: 'FETCH_REQUEST'
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


// const loginSend = () => {
//   return {
//     type: 'SET_LOGIN_REQUEST'
//   }
// }

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
  dispatch( fetchRequested() );
  loginService.getLogin()
    .then( (id) => dispatch(loginLoaded(id)) )
    .catch( (err) => dispatch(loginError(err.message)) )
}

const setLogin = (loginService) => (data) => (dispatch) => {
  dispatch( fetchRequested() );
  loginService.setLogin(data)
    .then( (id) => dispatch(loginSendOk(id)) )
    .catch( (err) => {
      console.dir(err);
      dispatch(loginSendFail(err.message)) 
    })
}

const getUser = (userService) => (id) => (dispatch) => {
  dispatch( fetchRequested() );
  userService.getUser(id)
    .then( (data) => dispatch(userLoaded(data)) )
    .catch( (err) => dispatch(loginError(err.message)) )
}

const userLoaded = (data) => {
  return {
    type: 'FETCH_USER_SUCCESS',
    value: data,
  }
}


export {
  getLogin,
  setLogin,
  getUser,
};