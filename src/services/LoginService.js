
//тут написать запись в сторейдж и получение оттуда: 2 метода
export default class BookstoreService {
  data = {
    isLoggedIn: true,
  };
		
  getLogin() {
    return new Promise( (resolve, reject) => {
      setTimeout( () => {
        resolve(this.data);
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
          resolve(this.data);
        }
      }, 700);
    })
  }

}