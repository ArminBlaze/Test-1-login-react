import getUrl from 'utils/getUrl';
import {apiBase} from 'constants/urls';

export default class UserService {

  //Зачем тут сохранять пользователя?
  // user = null;

  async getUser(id) {

    let response = await getUrl(apiBase + '/user-info/' + id);

    if(response.status !== 'ok') {
      if(response.message === 'user_not_found') {
        throw new Error(`Нет такого пользователя.`)
      }
      
      throw new Error(`Неизвестная ошибка при получении данных пользователя: ${response.message}`)
    }

    // console.log('UserService response: ', response);
    
    return(response.data);
  }

}