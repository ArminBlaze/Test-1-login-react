import React from 'react';

import './ErrorIndicator.css';
// import icon from './death-star.png';

const ErrorIndicator = () => {
  return (
    <div className="ErrorIndicator">
      {/* <img src={icon} alt="error icon"/> */}
      <span className="boom">Ой!</span>
      <span>
        Что-то пошло не так.
      </span>
      <span>
        Наши библиотекари скоро всё починят.
      </span>
    </div>
  );
};

export default ErrorIndicator;