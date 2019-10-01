import React from 'react';
import { ServicesConsumer } from 'components/ServicesContext/ServicesContext';


const withUserService = (Component, mapMethodsToProps) => {

  return (props) => {
    return (
      <ServicesConsumer>
        {
          ({userService}) => {
            return <Component {...props} 
              userService={userService} />
          }
        }
      </ServicesConsumer>
    )
  }
}

export default withUserService;