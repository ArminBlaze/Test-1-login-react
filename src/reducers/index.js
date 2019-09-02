const initialState = {
  isLoggedIn: false,
  loading: true,
  error: null,
};


const reducer = (state = initialState, action) => {
  console.log(action.type);

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
        error: action.value,
      }
    }

    case 'SET_LOGIN_REQUEST': {
      return {
        ...state,
        loading: true,
        error: null,
      }
    }

    case 'SET_LOGIN_SUCCESS': {
      return {
        ...state,
        isLoggedIn: action.value,
        loading: false,
        error: null,
      }
    }

    case 'SET_LOGIN_FAILURE': {
      return {
        ...state,
        loading: false,
        error: action.value,
      }
    }

    
    default: 
      return state;
  }

}


export default reducer;