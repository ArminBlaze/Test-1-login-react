import React from 'react';
import './Header.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = ({ isLoggedIn }) => {
  return (
    <header className="Header row">
      <Link to="/" className="Header__logo text-dark">React Login</Link>
      <ul className="d-flex">
        <li>
          <Link to="/news/">News</Link>
        </li>
        <li>
          <Link to="/profile/">Profile</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
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