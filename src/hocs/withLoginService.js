import React from 'react';
import { ServicesConsumer } from 'components/ServicesContext/ServicesContext';


const withLoginService = (Component, mapMethodsToProps) => {

  return (props) => {
    return (
      <ServicesConsumer>
        {
          ({loginService}) => {
            return <Component {...props} 
              loginService={loginService} />
          }
        }
      </ServicesConsumer>
    )
  }
}

export default withLoginService;