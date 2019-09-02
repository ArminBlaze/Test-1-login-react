import { createStore, applyMiddleware } from 'redux';
import reducer from 'reducers';
import thunkMiddleware from 'redux-thunk';


const logMiddleware = store => dispatch => (action) => {
  return dispatch(action);
}

const stringMiddleware = store => dispatch => (action) => {
  if(typeof action === 'string') {
    return dispatch({
      type: action
    })
  }
  
  return dispatch(action);
}

	
const store = createStore(reducer, 
  applyMiddleware(thunkMiddleware, stringMiddleware, logMiddleware) );
  
store.dispatch('HELLO_WORLD');



export default store;