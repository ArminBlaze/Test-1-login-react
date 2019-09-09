


//тут написать запись в сторейдж и получение оттуда: 2 метода
export default class LoginService {
  // data = {
  //   isLoggedIn: false,
  //   name: 'Admin',
  //   password: '12345',
  // };

  data = {
    isLoggedIn: (localStorage.getItem('isLoggedIn')) ? JSON.parse(localStorage.getItem('isLoggedIn')) : false,
    name: 'Admin',
    password: '12345',
  }
		
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
        if (Math.random() > 1) {
          reject(new Error('Пропал интернет! (тестовая ошибка)'))
        }
        else {
          if(data) {
            let correctPassword = this.testLogin(data);

            if(correctPassword) {
              this.data.isLoggedIn = true;
              this.setStorage(true);

              resolve({
                isLoggedIn: this.data.isLoggedIn,
                wrongPassword: false
              });
            }
            else {
              resolve({
                isLoggedIn: this.data.isLoggedIn,
                wrongPassword: true
              });
            }
            
            return;
          }


          this.data.isLoggedIn = false;
          this.setStorage(false);

          resolve({
            isLoggedIn: this.data.isLoggedIn,
            wrongPassword: false
          });
        }
      }, 700);
    })
  }

  setStorage(data) {
    localStorage.setItem('isLoggedIn', data);
  }

  testLogin(data) {
    return data.name === this.data.name && data.password === this.data.password
  }

}