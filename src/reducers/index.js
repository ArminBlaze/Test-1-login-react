const initialState = {
  isLoggedIn: false,
  loading: true,
  error: null,
  wrongPassword: false,
};


const reducer = (state = initialState, action) => {
  console.log(action.type, action.value, typeof action.value);
  console.dir(action.value);

  switch (action.type) {
    case 'FETCH_LOGIN_REQUEST': {
      return {
        ...state,
        loading: true,
        error: null,
      }
    }

    case 'FETCH_LOGIN_SUCCESS': {
      return {
        ...state,
        isLoggedIn: action.value,
        loading: false,
        error: null,
      }
    }

    case 'FETCH_LOGIN_FAILURE': {
      return {
        ...state,
        loading: false,
        error: action.value.message,
      }
    }

    case 'SET_LOGIN_REQUEST': {
      return {
        ...state,
        loading: true,
        error: null,
        wrongPassword: false,
      }
    }

    case 'SET_LOGIN_SUCCESS': {
      return {
        ...state,
        isLoggedIn: action.value.isLoggedIn,
        loading: false,
        error: null,
        wrongPassword: action.value.wrongPassword
      }
    }

    case 'SET_LOGIN_FAILURE': {
      return {
        ...state,
        loading: false,
        error: action.value.message,
      }
    }

    
    default: 
      return state;
  }

}


export default reducer;