import { Component, OnInit, AfterViewInit } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {auth} from 'firebase';
import {WindowService} from './common/window/window.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,AfterViewInit {
  title = 'FirebaseAuthSample';
  email:string;
  password:string;
  phoneNumber:string;
  otp:string;
  phoneSignIn=true;
  windowRef:any;
  disableOTPSendButton=true;
  constructor(private afAuth:AngularFireAuth,
    private windowService:WindowService){
     
    }
  ngOnInit(){
    // this.afAuth.authState.subscribe((user)=>console.log(user));
    this.windowRef=this.windowService.windwRef;
    // this.windowRef.recaptchaVerifier=new auth.RecaptchaVerifier('recaptcha-container',{
    //   size:'normal',
    //   callback:(resoponse)=>{
    //     //TODO
    //   }
    // });
    
  }

  ngAfterViewInit(){
    this.windowRef.recaptchaVerifier=new auth.RecaptchaVerifier('recaptcha-container',{
      'size':'normal',
      'callback':(resoponse)=>{
        this.disableOTPSendButton=false;
        //TODO
      }
    });
    this.windowRef.recaptchaVerifier.render();
  }
  sendOTP(){
    this.afAuth.auth.signInWithPhoneNumber(this.phoneNumber,this.windowRef.recaptchaVerifier)
    .then((confirmationResult) => {
      this.windowRef.confirmationResult=confirmationResult;
    });
  }

  verifyOTP(){
    this.windowRef.confirmationResult.confirm(this.otp)
    .then((userCredentials)=>console.log(userCredentials));
  }
 
  googleSignInViaPopup(){
  	this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
  	.then((userCredentials) => console.log(userCredentials));
  }

  googleSignInViaRedirect(){
    this.afAuth.auth.signInWithRedirect(new auth.GoogleAuthProvider())
  	.then((userCredentials) => console.log(userCredentials));
  }

  facebookSignInViaPopup(){
  	this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider())
  	.then((userCredentials) => console.log(userCredentials));
  }

  facebookSignInViaRedirect(){
    this.afAuth.auth.signInWithRedirect(new auth.FacebookAuthProvider())
  	.then((userCredentials) => console.log(userCredentials));
  }

  twitterSignInViaPopup(){
  	this.afAuth.auth.signInWithPopup(new auth.TwitterAuthProvider())
  	.then((userCredentials) => console.log(userCredentials));
  }

  twitterSignInViaRedirect(){
    this.afAuth.auth.signInWithRedirect(new auth.TwitterAuthProvider())
  	.then((userCredentials) => console.log(userCredentials));
  }

  githubSignInViaPopup(){
    this.afAuth.auth.signInWithPopup(new auth.GithubAuthProvider())
  	.then((userCredentials) => console.log(userCredentials));
  }

  githubSignInViaRedirect(){
    this.afAuth.auth.signInWithRedirect(new auth.GithubAuthProvider())
  	.then((userCredentials) => console.log(userCredentials));
  }

  signInAnounymously(){
    this.afAuth.auth.signInAnonymously()
    .then((userCredentials) =>console.log(userCredentials));
  }

  logout()
  {
    this.afAuth.auth.signOut();
  }
  signup(){
    this.afAuth.auth.createUserWithEmailAndPassword(this.email,this.password)
    .then((userCredentials)=>console.log(userCredentials));

  }
  signin(){
    this.afAuth.auth.signInWithEmailAndPassword(this.email,this.password)
    .then((userCredentials)=>console.log(userCredentials));
  }
  signInMode=false;
  signInOrSignUp(){
    this.signInMode?this.afAuth.auth.signInWithEmailAndPassword(this.email,this.password):this.afAuth.auth.createUserWithEmailAndPassword(this.email,this.password)
  }
  toggleSignInMode(){
    this.signInMode=!this.signInMode
  }

  

  togglePhoneSignIn(){
    this.phoneSignIn = !this.phoneSignIn;
  }

   
}
 