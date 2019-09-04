import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import withLoginService from 'hocs/withLoginService';
import {compose, bindActionCreators} from 'redux';
import { setLogin } from 'actions';
import Spinner from 'components/Spinner/Spinner';
import ErrorIndicator from 'components/ErrorIndicator/ErrorIndicator';

const LoginPage = ({ isLoggedIn, setLogin, loading, error }) => {
  if(loading) return <Spinner />
  if(error) return <ErrorIndicator />

  if(isLoggedIn) return <Redirect to='/profile'/>;

  return (
    <div className='jumbotron'>
     <form>
        <div className="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
        </div>
        <button type="submit" 
          className="btn btn-primary"
          onClick={ () => setLogin(true) }>
            Login
        </button>
      </form>
    </div>
  )
  
  // return (
  //   <div className='jumbotron'>
  //     <p>Войдите, чтобы увидеть секретную страницу!</p>
  //     <button 
  //       className='btn btn-primary'
  //       onClick={ () => setLogin(true) }>
  //         Login
  //     </button>
  //   </div>
  // )
};


const mapStateToProps = (state) => {
  const {isLoggedIn, loading, error} = state;

  return {
    isLoggedIn,
    loading,
    error,
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { loginService } = ownProps;
  return bindActionCreators({
    setLogin: setLogin(loginService),
  }, dispatch)
};


const connectedLoginPage = compose(
  withLoginService,
  connect(mapStateToProps, mapDispatchToProps)
)(LoginPage);

export {connectedLoginPage as LoginPage};