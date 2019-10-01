import getUrl from 'utils/getUrl';
import {apiBase} from 'constants/urls';

export default class LoginService {

  data = {
    id: (localStorage.getItem('id')) ? +localStorage.getItem('id') : 0,
  }

  getLogin() {

    return new Promise( (resolve, reject) => {
      resolve(this.data.id);
    })
  }

  async setLogin(data) {

    if(data) {
      let response = await this.testLogin(data);

      if(response.status !== 'ok') {
        if(response.message === 'wrong_email_or_password') {
          throw new Error(`'Вы ввели неправильные имя и (или) пароль.'`)
        }
        
        throw new Error(`Ошибка валидации: ${response.message}`)
      }

      console.log(response);
      
      let id = +response.data.id;
      
      this.data.id = id;
      this.setStorage(id);
  
      return(this.data.id);
    }

    this.data.id = 0;
    this.setStorage(0);
  
    return(null);
  }

  setStorage(data) {
    localStorage.setItem('id', data);
  }

  async testLogin(data) {
    return getUrl(apiBase + '/validate', data)
  }

}