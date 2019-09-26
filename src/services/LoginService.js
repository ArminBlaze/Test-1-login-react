

//тут написать запись в сторейдж и получение оттуда: 2 метода
export default class LoginService {
  _apiBase = `https://mysterious-reef-29460.herokuapp.com/api/v1`;

  data = {
    id: (localStorage.getItem('id')) ? +localStorage.getItem('id') : 0,
    name: 'Admin',
    password: '12345',
  }

	async getUrl(url, data) {
    const response = await fetch( url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    } );

    if(!response.ok) {
      console.log('Ошибка сервера');
      console.dir(response);
      throw new Error(`Ошибка сервера: ${response.status} ${response.statusText} \nЗапрашиваемый адрес: ${response.url}`)
    } 

    const json = await response.json();

    return json;
  }
		
  getLogin() {

    return new Promise( (resolve, reject) => {
      setTimeout( () => {
        
        resolve(this.data.id);
      }, 700);
    })
  }

  //сделать логин и разлогин
  //при логине сделать проверку пароля
  async setLogin(data) {

    if(data) {
      let response = await this.testLogin(data);

      //response.status = "ok" "err"
      //"ok" > response.data.id
      //"err" > response.message
      //а если ошибка?
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
    return this.getUrl(this._apiBase + '/validate', data)
  }

}