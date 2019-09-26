const initialState = {
  user: null,
  loading: true,
  error: null,
};


const reducer = (state = initialState, action) => {
  // console.log(action.type, action.value, typeof action.value);
  // console.dir(action.value);

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
        user: {
          id: action.value
        },
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
      }
    }

    case 'SET_LOGIN_SUCCESS': {
      return {
        ...state,
        user: {
          id: action.value
        },
        loading: false,
        error: null,
      }
    }

    case 'SET_LOGOUT_SUCCESS': {
      return {
        ...state,
        user: null,
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