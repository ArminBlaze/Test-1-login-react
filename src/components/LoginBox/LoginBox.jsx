import React from 'react';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';
import withLoginService from 'hocs/withLoginService';
import {compose, bindActionCreators} from 'redux';
import { setLogin, getLogin } from 'actions';
// import Spinner from 'components/Spinner/Spinner';
import SpinnerInner from 'components/SpinnerInner/SpinnerInner';
import ErrorIndicator from 'components/ErrorIndicator/ErrorIndicator';
import { Link } from 'react-router-dom';
import './LoginBox.css';

class LoginBox extends React.Component {

  componentDidMount() {
    this.props.getLogin();
  }

  onExitClick = () => {
    this.props.setLogin();
  }

  render() {
    const { isLoggedIn, loading, error } = this.props;
    console.log(loading);
    
    let spinner = (loading) ? <SpinnerInner /> : null;
    let isButtonDisabled = (loading) ? 'disabled' : false;

    if(error) return <ErrorIndicator />

    if(!isLoggedIn) return <Link to="/login"
      className="LoginBox__link"
    >
        {spinner}
        Войти
      </Link>;
  
    return (
      <button type="button" disabled={isButtonDisabled}
        className="LoginBox__btn"
        onClick={ this.onExitClick }
        >
          {spinner}
          Выход
      </button>
    )
  }
  
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
    getLogin: getLogin(loginService),
    setLogin: setLogin(loginService),
  }, dispatch)
};


export default compose(
  withLoginService,
  connect(mapStateToProps, mapDispatchToProps)
)(LoginBox)
