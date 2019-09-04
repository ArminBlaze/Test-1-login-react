import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import withLoginService from 'hocs/withLoginService';
import {compose, bindActionCreators} from 'redux';
import { getLogin } from 'actions';
import Spinner from 'components/Spinner/Spinner';
import ErrorIndicator from 'components/ErrorIndicator/ErrorIndicator';


class ProfilePage extends React.Component {

  componentDidMount() {
    this.props.getLogin();
  }

  render() {
    const { isLoggedIn, loading, error } = this.props;
    if(loading) return <Spinner />
    if(error) return <ErrorIndicator />

    if(!isLoggedIn) return <Redirect to='/login'/>;
  
    return (
      <div className='jumbotron text-center'>
        <h3>Профиль.</h3>
        <p>Виден только после входа.</p>
      </div>
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
  }, dispatch)
};


const connectedProfilePage = compose(
  withLoginService,
  connect(mapStateToProps, mapDispatchToProps)
)(ProfilePage);

export { connectedProfilePage as ProfilePage };
