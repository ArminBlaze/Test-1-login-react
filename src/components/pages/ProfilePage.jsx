import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import withLoginService from 'hocs/withLoginService';
import {compose, bindActionCreators} from 'redux';
import { getLogin } from 'actions';
import Spinner from 'components/Spinner/Spinner';
import ErrorIndicator from 'components/ErrorIndicator/ErrorIndicator';
import PropTypes from 'prop-types';


class ProfilePage extends React.Component {

  static propTypes = {
    getLogin: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool,
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  }

  componentDidMount() {
    this.props.getLogin();
  }

  render() {
    const { user, loading, error } = this.props;
    
    if(loading) return <Spinner />
    if(error) return <ErrorIndicator />

    if(!user) return <Redirect to='/login'/>;
  
    return (
      <div className='jumbotron text-center'>
        <h3>Профиль.</h3>
        <p>Виден только после входа.</p>
      </div>
    )
  }
  
};


const mapStateToProps = (state) => {
  const {user, loading, error} = state;

  return {
    user,
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
