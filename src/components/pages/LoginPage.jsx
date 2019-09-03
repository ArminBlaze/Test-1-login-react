import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const LoginPage = ({ isLoggedIn, onLogin }) => {
  if(isLoggedIn) return <Redirect to='/'/>;

  return (
    <div className='jumbotron'>
      <p>Войдите, чтобы увидеть секретную страницу!</p>
      <button 
        className='btn btn-primary'
        onClick={ onLogin }>
          Login
      </button>
    </div>
  )
};

const mapStateToProps = (state) => {
  const {isLoggedIn} = state;

  return {
    isLoggedIn
  }
};

//тут нужно сделать кнопку "вход"
//нужен сервис для получения
//нужен экшен запроса входа
//нужен ...
const mapDispatchToProps = (dispatch, ownProps) => {
  const { bookstoreService } = ownProps;
  return bindActionCreators({
    // fetchBooks: fetchBooks(dispatch, bookstoreService),
    fetchBooks: fetchBooks(bookstoreService),
    onAddToCart: bookAddedToCart,
  }, dispatch)
};

const connectedLoginPage = connect(mapStateToProps)(LoginPage);

export {connectedLoginPage as LoginPage};