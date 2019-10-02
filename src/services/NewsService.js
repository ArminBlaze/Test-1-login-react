import getUrl from 'utils/getUrl';
import {apiBase} from 'constants/urls';

export default class NewsService {

  async getNews() {

    let response = await getUrl(apiBase + '/news');

    if(response.status !== 'ok') {
      throw new Error(`Неизвестная ошибка при получении данных пользователя: ${response.message}`)
    }

    console.log('NewsService response: ', response);
    
    return(response.data);
  }

}