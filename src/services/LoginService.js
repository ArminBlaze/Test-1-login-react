

//тут написать запись в сторейдж и получение оттуда: 2 метода
export default class LoginService {
  // _apiBase = `https://mysterious-reef-29460.herokuapp.com/api/v1/validate`;

  data = {
    user: (localStorage.getItem('user')) ? localStorage.getItem('user') : '',
    name: 'Admin',
    password: '12345',
  }

	getUrl = async (url, data) => {
		const response = await fetch( `${this._apiBase + url}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;'
			},
			body: JSON.stringify(data)
		} );

		if(!response.ok) {
      console.log('Ошибка сервера');
      console.dir(response);
      throw new Error(`Ошибка сервера: ${response.status} ${response.statusText} \nЗапрашиваемый адрес: ${response.url}`)
    } 

    const json = await response.json();
    console.log(json);
    
		return json;
	}
		
  getLogin() {

    return new Promise( (resolve, reject) => {
      setTimeout( () => {
        
        resolve(this.data.user);
      }, 700);
    })
  }

  //сделать логин и разлогин
  //при логине сделать проверку пароля
  setLogin(data) {
    return new Promise( (resolve, reject) => {
      
      setTimeout( () => {
        if (Math.random() > 1) {
          reject(new Error('Пропал интернет! (тестовая ошибка)'))
        }
        else {
          if(data) {
            let correctPassword = this.testLogin(data);

            if(correctPassword) {
              this.data.user = data.name;
              this.setStorage(data.name);

              resolve(this.data.user);
            }
            else {
              reject({
                msg: 'Вы ввели неправильные имя и (или) пароль.'
              });
            }
            
            return;
          }


          this.data.user = '';
          this.setStorage('');

          resolve(null);
        }
      }, 700);
    })
  }

  setStorage(data) {
    localStorage.setItem('user', data);
  }

  testLogin(data) {
    return data.name === this.data.name && data.password === this.data.password
  }

}