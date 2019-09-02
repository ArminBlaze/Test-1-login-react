import React from 'react';
import { LoginServiceConsumer } from 'components/LoginServiceContext/LoginServiceContext';


const withLoginService = (Component, mapMethodsToProps) => {

  return (props) => {
    return (
      <LoginServiceConsumer>
        {
          (loginService) => {
            return <Component {...props} 
              loginService={loginService} />
          }
        }
      </LoginServiceConsumer>
    )
  }
}

export default withLoginService;