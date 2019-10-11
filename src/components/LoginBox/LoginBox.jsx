import React from 'react';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';
import withLoginService from 'hocs/withLoginService';
import {compose, bindActionCreators} from 'redux';
import { setLogin, getLogin } from 'actions';
// import Spinner from 'components/Spinner/Spinner';
// import SpinnerInner from 'components/SpinnerInner/SpinnerInner';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './LoginBox.css';

class LoginBox extends React.Component {

  static propTypes = {
    getLogin: PropTypes.func.isRequired,
    setLogin: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  }

  componentDidMount() {
    this.props.getLogin();
  }

  onExitClick = () => {
    this.props.setLogin();
  }

  render() {
    const { user, loading } = this.props;
    
    // let spinner = (loading) ? <SpinnerInner /> : null;
    let isButtonDisabled = (loading) ? 'disabled' : false;


    if(!user) {
      return (
        <Link to="/login"
          className="LoginBox__link"
        >
          Войти
        </Link>
      );
    } 

    
    return (
      <button type="button" disabled={isButtonDisabled}
        className="LoginBox__btn"
        onClick={ this.onExitClick }
        >
          Выход
      </button>
    )
  }
  
};


const mapStateToProps = (state) => {
  const {user, loading} = state;

  return {
    user,
    loading,
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
