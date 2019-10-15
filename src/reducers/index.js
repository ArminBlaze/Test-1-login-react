const initialState = {
  user: null,
  loading: true,
  error: null,
  news: null,
};


const reducer = (state = initialState, action) => {
  // console.log(action.type, action.value, typeof action.value);
  // console.dir(action.value);

  switch (action.type) {
    case 'FETCH_REQUEST': {
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

    // case 'FETCH_LOGIN_FAILURE': {
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.value,
    //   }
    // }

    case 'FETCH_FAILURE': {
      return {
        ...state,
        loading: false,
        error: handleErrorMessage( action.value ),
      }
    }

    // case 'SET_LOGIN_REQUEST': {
    //   return {
    //     ...state,
    //     loading: true,
    //     error: null,
    //   }
    // }

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

    // case 'SET_LOGIN_FAILURE': {
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.value,
    //   }
    // }

    case 'FETCH_USER_SUCCESS': {
      // if(!state.user) {
      //   return state
      // }

      const data = action.value;

      return {

        ...state,
        user: {
          ...state.user,
          city: data.city,
          languages: data.languages,
          social: filterSocial(data.social)
        },
        loading: false,
        error: null,
      }
    }

    case 'FETCH_NEWS_SUCCESS': {
      const news = action.value;

      return {

        ...state,
        news,
        loading: false,
        error: null,
      }
    }

    
    default: 
      return state;
  }

}


//найти web и поставить в новый массив на позицию 0
function filterSocial(social) {
  return social.slice().sort((item) => {
    return (item.label === 'web') ? -1 : 1;
  })
}

function handleErrorMessage(err) {
  if(err.message === 'Failed to fetch') {
    return {
      message: 'Сервер недоступен'
    }
  }
  else {
    return err;
  }
}

export default reducer;