import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import withLoginService from 'hocs/withLoginService';
import {compose, bindActionCreators} from 'redux';
import { setLogin } from 'actions';
import SpinnerInner from 'components/SpinnerInner/SpinnerInner';
import PropTypes from 'prop-types';
import './LoginPage.css';

class LoginPage extends React.Component  {
  state = {
    name: '',
    password: ''
  }

  static propTypes = {
    setLogin: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
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
          {error}
        </div>
        <p>Войдите, чтобы увидеть секретную страницу!</p>
        <form onSubmit={ this.onFormSubmit }>
          <div className="form-group">
            <label htmlFor="exampleInputName1">Имя</label>
            <input type="text" className="form-control" id="exampleInputName1" aria-describedby="nameHelp" placeholder="Введите имя" 
            required
            value={ this.state.name }
            onChange={ this.onNameChange }
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Пароль</label>
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Введите пароль" 
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