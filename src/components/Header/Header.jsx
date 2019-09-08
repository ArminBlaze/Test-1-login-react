import React from 'react';
import './Header.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LoginBox from 'components/LoginBox/LoginBox'

const Header = ({ isLoggedIn }) => {
  return (
    <header className="Header row">
      <Link to="/" className="Header__logo text-dark">React Login</Link>
      <ul className="d-flex">
        <li>
          <Link to="/news/">Новости</Link>
        </li>
        <li>
          <Link to="/profile/">Профиль</Link>
        </li>
        <li>
          <LoginBox />
        </li>
      </ul>
    </header>
  )
};


const mapStateToProps = (state) => {
  const {isLoggedIn} = state;

  return {
    isLoggedIn
  }
};


export default connect(mapStateToProps)(Header);