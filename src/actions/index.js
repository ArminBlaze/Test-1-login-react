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

const fetchError = (error) => {
  return {
    type: 'FETCH_FAILURE',
    value: error,
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

const getLogin = (loginService) => () => (dispatch) => {
  dispatch( fetchRequested() );
  loginService.getLogin()
    .then( (id) => dispatch(loginLoaded(id)) )
    .catch( (err) => dispatch(fetchError(err)) )
}

const setLogin = (loginService) => (data) => (dispatch) => {
  dispatch( fetchRequested() );
  loginService.setLogin(data)
    .then( (id) => dispatch(loginSendOk(id)) )
    .catch( (err) => {
      dispatch(fetchError(err)) 
    })
}

const getUser = (userService) => (id) => (dispatch) => {
  dispatch( fetchRequested() );
  userService.getUser(id)
    .then( (data) => dispatch(userLoaded(data)) )
    .catch( (err) => dispatch(fetchError(err)) )
}

const userLoaded = (data) => {
  return {
    type: 'FETCH_USER_SUCCESS',
    value: data,
  }
}

const getNews = (newsService) => (id) => (dispatch) => {
  dispatch( fetchRequested() );
  newsService.getNews(id)
    .then( (data) => dispatch(newsLoaded(data)) )
    .catch( (err) => dispatch(fetchError(err)) )
}

const newsLoaded = (data) => {
  return {
    type: 'FETCH_NEWS_SUCCESS',
    value: data,
  }
}


export {
  getLogin,
  setLogin,
  getUser,
  getNews,
};