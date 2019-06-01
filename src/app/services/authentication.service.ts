import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app'; 


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private Authentication: AngularFireAuth) { }

  
  registerWithEmail(email,password){
    return this.Authentication.auth.createUserWithEmailAndPassword(email,password);
  }

  loginWithEmail(email,password){
    return this.Authentication.auth.signInWithEmailAndPassword(email,password);
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.Authentication.auth.signInWithPopup(provider);
  }

  getStatus(){
    return this.Authentication.authState;
  }


  
}
