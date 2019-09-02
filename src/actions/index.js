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
  dispatch( loginRequested() );
  loginService.setLogin(isLoggedIn)
    .then( (data) => dispatch(loginLoaded(data)) )
    .catch( (err) => dispatch(loginError(err)) )
}

export {
  getLogin,
  setLogin,
};