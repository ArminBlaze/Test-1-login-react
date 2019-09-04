import React from 'react';

import './ErrorIndicator.css';
// import icon from './death-star.png';

const ErrorIndicator = ({error}) => {
  return (
    <div className="ErrorIndicator">
      {/* <img src={icon} alt="error icon"/> */}
      <span className="boom">Ой!</span>
      <span>
        {error}
      </span>
      <span>
        Мы скоро все починим.
      </span>
    </div>
  );
};

export default ErrorIndicator;