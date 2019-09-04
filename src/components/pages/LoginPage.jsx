import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import withLoginService from 'hocs/withLoginService';
import {compose, bindActionCreators} from 'redux';
import { setLogin } from 'actions';
import Spinner from 'components/Spinner/Spinner';
import ErrorIndicator from 'components/ErrorIndicator/ErrorIndicator';
import './LoginPage.css';

class LoginPage extends React.Component  {
  state = {
    name: '',
    password: ''
  }

  onNameChange = (e) => {
		this.setState({
      name: e.target.value
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
      name: this.state.name,
      password: this.state.password,
    });
		
		//Очищаем форму не через reset(), т.к. reset не сбросит state
		//При изменении state - запустится render и у input будет очищено значение
		//Интересный факт. Событие onchange input'а не вызывается ни при form.reset(), ни при изменении input.value
		this.setState({
      name: '',
      password: ''
		})
  }

  render() {
    const { isLoggedIn, loading, error } = this.props;

    if(loading) return <Spinner />
    if(error) return <ErrorIndicator />

    if(isLoggedIn) return <Redirect to='/profile'/>;

    return (
      <div className='jumbotron'>
        <p>Войдите, чтобы увидеть секретную страницу!</p>
        <form onSubmit={ this.onFormSubmit }>
          <div class="invalid-tooltip">
            Вы ввели неправильные имя и пароль.
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputName1">Имя</label>
            <input type="text" className="form-control" id="exampleInputName1" aria-describedby="nameHelp" placeholder="Введите имя" 
            value={ this.state.name }
            onChange={ this.onNameChange }
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Пароль</label>
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Введите пароль" 
            value={ this.state.password } 
            onChange={ this.onPasswordChange }
            />
          </div>
          <button type="submit" 
            className="btn btn-primary">
              Войти
          </button>
        </form>
      </div>
    )
  }
};


const mapStateToProps = (state) => {
  const {isLoggedIn, loading, error, wrongPassword} = state;

  return {
    isLoggedIn,
    loading,
    error,
    wrongPassword,
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