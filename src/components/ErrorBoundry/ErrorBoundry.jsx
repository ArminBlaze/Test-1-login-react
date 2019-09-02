import React, { Component } from 'react';

import ErrorIndicator from "components/ErrorIndicator/ErrorIndicator";


export default class ErrorBoundry extends Component {
  state = {
    renderError: false
  };

  componentDidCatch() {
    console.log('componentDidCatch()');

    this.setState({
      renderError: true
    })
  }

  render() {

    //если ошибка - вместо контента будет заглушка
    if(this.state.renderError) {
      return <ErrorIndicator />
    }

    //а если всё впорядке - вернётся компонент, переданный в обертку <ErrorBoundry>
    return this.props.children;
  }
}