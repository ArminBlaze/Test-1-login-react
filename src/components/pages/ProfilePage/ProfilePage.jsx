import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import withLoginService from 'hocs/withLoginService';
import withUserService from 'hocs/withUserService';
import {compose, bindActionCreators} from 'redux';
import { getLogin, getUser } from 'actions';
import Spinner from 'components/Spinner/Spinner';
import ErrorIndicator from 'components/ErrorIndicator/ErrorIndicator';
import PropTypes from 'prop-types';
import './ProfilePage.css';

import { store } from 'react-notifications-component';


class ProfilePage extends React.Component {

  static propTypes = {
    getLogin: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  }

  componentDidMount() {
    if(!this.props.user) {
      this.props.getLogin();
    }
    if(this.props.user && this.props.user.id && !this.props.user.city) {
      this.props.getUser(this.props.user.id);
    }
  }

	componentDidUpdate(prevProps) {
    const {error, user} = this.props;

    if(user && user.id) {
      if(!prevProps.user) {
        this.props.getUser(user.id);
      }
      else if(prevProps.user && user.id !== prevProps.user.id) {
        this.props.getUser(user.id);
      }
    }

    if(error) {
      if(!prevProps.error || prevProps.error !== error) {
        this.showPopup(error);
      } 
    }
  }

  showPopup(error) {
    store.addNotification({
      title: "Ошибка!",
      message: error.message,
      type: "danger",
      insert: "top",
      container: "top-center",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: 5000,
        onScreen: true
      }
    });
  }

  render() {
    const { user, loading, error } = this.props;
    
    // if(error) {
    //   return <ErrorIndicator error={error}/>
    // }

    if(loading || (user && !user.city) ) return <Spinner />

    if(!user) return <Redirect to='/login'/>;

    return (
      <div className='jumbotron text-center'>
        <h3>Профиль.</h3>
        <p>Виден только после входа.</p>
        <p>Город: {user.city}</p>
        <span>Знание языков:</span> 
          <ul className='Profile__languages'>
            { this.generateLanguages(user.languages) }
          </ul>
        <div>
          <ul className='social__list'>
            { this.generateLinks(user.social) }
          </ul>
        </div>
      </div>
    )
  }


  generateLanguages(languages) {

    return languages.map( (item) => {
        return (<li
          key={item}
        >
        {item}
        </li>)
        })
  }

  generateLinks(social) {
    return social.map ( (item) => {
      return (<li key={item.label}>
        <a 
          className={`social__btn social__btn_${item.label}`} 
          href={item.link} target="_blank" 
          rel="noopener noreferrer"
          title={item.label}
        >
          {item.label}
        </a>
      </li>)
    })
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
  const { loginService, userService } = ownProps;

  return bindActionCreators({
    getLogin: getLogin(loginService),
    getUser: getUser(userService),
  }, dispatch)
};


const connectedProfilePage = compose(
  withLoginService,
  withUserService,
  connect(mapStateToProps, mapDispatchToProps)
)(ProfilePage);

export { connectedProfilePage as ProfilePage };
