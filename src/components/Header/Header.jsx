import React from 'react';
// import './ShopHeader.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const ShopHeader = ({ isLoggedIn }) => {
  return (
    <header className="ShopHeader row">
      <Link to="/" className="ShopHeader__logo text-dark">ReStore</Link>
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


export default connect(mapStateToProps)(ShopHeader);