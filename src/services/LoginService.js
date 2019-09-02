
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

}