import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  static isEmpLoggedIn = false;
  static isManLoggedIn = false;
  static errorMessage: any;
  email: any;

  constructor(public firebaseAuth : AngularFireAuth) { }

  // SIGNUP
  async signup(email:string, password:string){
    await this.firebaseAuth.createUserWithEmailAndPassword(email,password)
    .then(res => {
      FirebaseService.isEmpLoggedIn = true;
      localStorage.setItem('user',JSON.stringify(res.user?.email));
      console.log('signup successfull ...');
    })
    .catch((error) => {
      FirebaseService.isEmpLoggedIn = false;
      const errorCode = error.code;
      FirebaseService.errorMessage = error.message;
      console.log(errorCode," ",FirebaseService.errorMessage);
    });
  }
  
  //SIGNIN
  async signin(email:string, password:string) {
    await this.firebaseAuth.signInWithEmailAndPassword(email,password)
    .then(res => {
      console.log(res.user?.getIdToken());
      FirebaseService.isEmpLoggedIn = true;
      this.email = res.user?.email;
      localStorage.setItem('user',this.email);
      console.log('login successfull ...');
    })
    .catch((error) => {
      FirebaseService.isEmpLoggedIn = false;
      const errorCode = error.code;
      FirebaseService.errorMessage = error.message;
      console.log(errorCode," ",FirebaseService.errorMessage);
    });
  }

  //MANAGER SIGNIN
  async msignin(email:string, password:string) {
    await this.firebaseAuth.signInWithEmailAndPassword(email,password)
    .then(res => {
      localStorage.setItem('user',JSON.stringify(res.user?.email));
      if(res.user?.email==='admin@tsm.com'){
        FirebaseService.isManLoggedIn = true;
        console.log('login successfull ...');
      }else {
        FirebaseService.isManLoggedIn = false;
        throw new Error('Unauthorised');
      }
    })
    .catch((error) => {
      FirebaseService.isManLoggedIn = false;
      reportError({message: error.message})
      FirebaseService.errorMessage = error.message;
      console.log(FirebaseService.errorMessage);
    });
  }

  //LOGOUT
  async logout() {
    await this.firebaseAuth.signOut()
    .then(()=> {
      FirebaseService.isEmpLoggedIn = false;
      localStorage.removeItem('user');
      console.log('emp logged out successfully ...')
    })
    .catch((error) => {
      console.log(error);
    });
  }

    //LOGOUT
    async mlogout() {
      await this.firebaseAuth.signOut()
      .then(()=> {
        FirebaseService.isManLoggedIn = false;
        localStorage.removeItem('user');
        console.log('manager logged out successfully ...')
      })
      .catch((error) => {
        console.log(error);
      });
    }

  //GOOGLE SIGNIN
  googleSignIn() {
    return this.firebaseAuth.signInWithPopup(new GoogleAuthProvider)
    .then((res) => {
      FirebaseService.isEmpLoggedIn = true;
      this.email = res.user?.email;
      localStorage.setItem('user',this.email);
      console.log('login with google successfull ...');
    })
    .catch((error)=> {
      FirebaseService.isEmpLoggedIn = false;
      FirebaseService.errorMessage = error.message;
      console.log(FirebaseService.errorMessage);
    })
  }

}
