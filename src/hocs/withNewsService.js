import React from 'react';
import { ServicesConsumer } from 'components/ServicesContext/ServicesContext';


const withNewsService = (Component, mapMethodsToProps) => {

  return (props) => {
    return (
      <ServicesConsumer>
        {
          ({newsService}) => {
            return <Component {...props} 
              newsService={newsService} />
          }
        }
      </ServicesConsumer>
    )
  }
}

export default withNewsService;