import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import withLoginService from 'hocs/withLoginService';
import {compose, bindActionCreators} from 'redux';
import { setLogin } from 'actions';
import SpinnerInner from 'components/SpinnerInner/SpinnerInner';
import PropTypes from 'prop-types';
import './LoginPage.css';

import { store } from 'react-notifications-component';


class LoginPage extends PureComponent  {
  state = {
    email: '',
    password: ''
  }

  static propTypes = {
    setLogin: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.object,
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  }

  componentDidUpdate(prevProps) {
    const error = this.props.error;
    if(!error) return;

    if(!prevProps.error || prevProps.error !== error) {
      this.showPopup(error);
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

  onMailChange = (e) => {
		this.setState({
      email: e.target.value
		})
  }
  
  onPasswordChange = (e) => {
		this.setState({
      password: e.target.value
		})
  }
  
  onFormSubmit = (e) => {
    e.preventDefault();

    this.props.setLogin({
      email: this.state.email,
      password: this.state.password,
    });
		
		//Очищаем форму не через reset(), т.к. reset не сбросит state
		//При изменении state - запустится render и у input будет очищено значение
		//Интересный факт. Событие onchange input'а не вызывается ни при form.reset(), ни при изменении input.value
		this.setState({
      password: ''
		})
  }

  render() {
    const { user, loading, error } = this.props;

    // if(loading) return <Spinner />
    let spinner = (loading) ? <SpinnerInner /> : null;
    // if(error) return <ErrorIndicator error={error}/>

    if(user) return <Redirect to='/profile'/>;

    let errorClass = (error) ? 'show' : '';

    let isButtonDisabled = (loading) ? 'disabled' : false;

    return (
      <div className='LoginPage jumbotron'>
        <div className={`${errorClass} LoginPage__error alert alert-danger`}>
          {error && error.message}
        </div>
        <p>Войдите, чтобы увидеть секретную страницу!</p>
        <form onSubmit={ this.onFormSubmit }>
          <div className="form-group">
            <label htmlFor="email">Почта</label>
            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Введите емейл" 
            required
            value={ this.state.email }
            onChange={ this.onMailChange }
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <input type="password" className="form-control" id="password" placeholder="Введите пароль" 
            required
            value={ this.state.password } 
            onChange={ this.onPasswordChange }
            />
          </div>
          <button type="submit" disabled={isButtonDisabled}
            className="LoginPage__btn btn btn-primary">
              {spinner}
              Войти
          </button>
        </form>
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
    setLogin: setLogin(loginService),
  }, dispatch)
};


const connectedLoginPage = compose(
  withLoginService,
  connect(mapStateToProps, mapDispatchToProps)
)(LoginPage);

export {connectedLoginPage as LoginPage};