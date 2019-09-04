


//тут написать запись в сторейдж и получение оттуда: 2 метода
export default class LoginService {
  data = {
    isLoggedIn: false,
    name: 'Admin',
    password: '12345',
  };

		
  getLogin() {
    return new Promise( (resolve, reject) => {
      setTimeout( () => {
        resolve(this.data.isLoggedIn);
      }, 700);
    })
  }

  //сделать логин и разлогин
  //при логине сделать проверку пароля
  setLogin(data) {
    return new Promise( (resolve, reject) => {
      
      setTimeout( () => {
        if (Math.random() > 0.75) {
          reject(new Error('Пропал интернет! (тестовая ошибка)'))
        }
        else {
          if(data) {
            this.data.isLoggedIn = this.testLogin(data);
            resolve(this.data.isLoggedIn);
            console.log('Вход');
            
            return;
          }


          this.data.isLoggedIn = false;
          console.log('Выход');
          resolve(this.data.isLoggedIn);
        }
      }, 700);
    })
  }

  testLogin(data) {
    return data.name === this.data.name && data.password === this.data.password
  }

}