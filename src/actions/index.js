const loginRequested = () => {
  return {
    type: 'FETCH_LOGIN_REQUEST'
  }
}

const loginLoaded = (isLoggedIn) => {
  return {
    type: 'FETCH_LOGIN_SUCCESS',
    value: isLoggedIn,
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

const loginSendOk = (isLoggedIn) => {
  return {
    type: 'SET_LOGIN_SUCCESS',
    value: isLoggedIn,
  }
}

const loginSendFail = (error) => {
  return {
    type: 'SET_LOGIN_FAILURE',
    value: error,
  }
}


// const fetchBooksOld = (dispatch, bookstoreService) => () => {
//   dispatch( booksRequested() );
//   bookstoreService.getBooks()
//     .then( (data) => dispatch(booksLoaded(data)) )
//     .catch( (err) => dispatch(booksError(err)) )
// }

const getLogin = (loginService) => () => (dispatch) => {
  dispatch( loginRequested() );
  loginService.getLogin()
    .then( (data) => dispatch(loginLoaded(data)) )
    .catch( (err) => dispatch(loginError(err)) )
}

const setLogin = (loginService) => (isLoggedIn) => (dispatch) => {
  dispatch( loginSend() );
  loginService.setLogin(isLoggedIn)
    .then( (data) => dispatch(loginSendOk(data)) )
    .catch( (err) => dispatch(loginSendFail(err)) )
}

export {
  getLogin,
  setLogin,
};