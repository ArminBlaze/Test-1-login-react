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
    if(!this.props.user) {
      this.props.getLogin();
    }
  }

	componentDidUpdate(prevProps) {
    console.log('DidUpdate. User =', this.props.user);
    
    if(!prevProps.user && this.props.user && this.props.user.id) {
      this.props.getUser(this.props.user.id);
      return;
    }

    if(prevProps.user && this.props.user && this.props.user.id !== prevProps.user.id) {
      this.props.getUser(this.props.user.id);
      return;
    }
	}

  render() {
    const { user, loading, error } = this.props;
    
    if(loading || !user.city) return <Spinner />
    if(error) return <ErrorIndicator />

    if(!user) return <Redirect to='/login'/>;
    console.log('Render. Loading = ',loading);
    console.log('Render. User = ', user);
    console.log('Render. User.City = ', user.city);
    

    return (
      <div className='jumbotron text-center'>
        <h3>Профиль.</h3>
        <p>Виден только после входа.</p>
        <p>Город: {user.city}</p>
        <span>Знание языков:</span> 
          <ul>
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

    return languages.map( (item, i) => {
        return (<li
          key={item}
        >
        + {item}
        </li>)
        })
  }

  generateLinks(social) {
    return social.map ( (item, i) => {
      return (<li key={item.link}>
        <a className={`social__btn social__btn_${item.label}`} href={item.link}>{item.label}</a>
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
