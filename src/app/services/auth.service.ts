import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { map } from 'rxjs/operators';
import { promise } from 'protractor';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afsAuth : AngularFireAuth) { }

  registerUser(email:string,pass:string){
    return  new Promise((resolve, reject) =>{
      this.afsAuth.auth.createUserWithEmailAndPassword(email, pass)
      .then( userData => resolve(userData),
      err => reject(err));
    });
  }


  loginEmailUser(email: string, pass: string) {
    return  new Promise((resolve, reject) =>{
      this.afsAuth.auth.signInWithEmailAndPassword(email, pass)
      .then(userData => resolve(userData),
      err => reject(err));
    });
  }
  loginGoogleUser(){
    return this.afsAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    // return this.router.navigate(['/']);
  }
  loginFacebookUSer(){
   return  this.afsAuth.auth.signInWithPopup(new auth.FacebookAuthProvider());
  }
  logoutUser(){}

  isAuth(){
    return this.afsAuth.authState.pipe(map(auth =>auth));
  }

//   getCurrentUser(): UserInterface {
//     let user_string = localStorage.getItem("currentUser");
//     if (!isNullOrUndefined(user_string)) {
//       let user: UserInterface = JSON.parse(user_string);
//       return user;
//     } else {
//       return null;
//     }
// }
}
