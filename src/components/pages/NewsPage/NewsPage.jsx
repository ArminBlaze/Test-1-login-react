import React from 'react';
import { connect } from 'react-redux';
import withNewsService from 'hocs/withNewsService';
import {compose, bindActionCreators} from 'redux';
import { getNews } from 'actions';
import Spinner from 'components/Spinner/Spinner';
import ErrorIndicator from 'components/ErrorIndicator/ErrorIndicator';
import PropTypes from 'prop-types';
import './NewsPage.css';


class NewsPage extends React.Component {

  static propTypes = {
    getNews: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    news: PropTypes.array,
  }

  componentDidMount() {
    this.props.getNews();
  }


  render() {
    const { news, loading, error } = this.props;

    if(error) {
      return <ErrorIndicator error={error}/>
    }

    if(loading || !news) return <Spinner />


    return (
      <div className='NewsPage'>
        <p>Всего новостей: {news.length}</p>
        { this.generateNews(news) }
      </div>
    )
  }


  generateNews(news) {
    return news.map( (item) => {
      return (
      <article key={item.id}>
        <h3>{item.title}</h3>
        <p>{item.text}</p>
      </article>)
      })
  }
}


const mapStateToProps = (state) => {
  const {news, loading, error} = state;

  return {
    news,
    loading,
    error,
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { newsService } = ownProps;

  return bindActionCreators({
    getNews: getNews(newsService),
  }, dispatch)
};


const connectedNewsPage = compose(
  withNewsService,
  connect(mapStateToProps, mapDispatchToProps)
)(NewsPage);

export { connectedNewsPage as NewsPage };
