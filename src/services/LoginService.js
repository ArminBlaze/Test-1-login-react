
//тут написать запись в сторейдж и получение оттуда: 2 метода
export default class LoginService {
  data = {
    isLoggedIn: false,
  };
		
  getLogin() {
    return new Promise( (resolve, reject) => {
      setTimeout( () => {
        resolve(this.data.isLoggedIn);
      }, 700);
    })
  }

  setLogin(isLoggedIn) {
    return new Promise( (resolve, reject) => {
      
      setTimeout( () => {
        if (Math.random() > 0.75) {
          reject(new Error('BIG ERROR!'))
        }
        else {
          this.data.isLoggedIn = isLoggedIn;
          resolve(this.data.isLoggedIn);
        }
      }, 700);
    })
  }

}