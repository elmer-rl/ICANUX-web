import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, private router: Router, private authService: AuthService) { }
  public email: string ='';
  public pass: string = '';

  ngOnInit() {
  }

  onLogin():void{
    this.authService.loginEmailUser(this.email,this.pass)
    .then( (res)=>{
      this.router.navigate(['Eventos']);
    }).catch(err => console.log('error',err.message));
  }

  onLoginGoogle():void {
  this.authService.loginGoogleUser()
  .then((res) => {
    console.log('res',res)
    this.router.navigate(['/Eventos']);
  }).catch(err =>console.log('error',err.message));
  }
  onLoginFacebook():void {
    this.authService.loginFacebookUSer()
    .then( (res)=>{
      this.router.navigate(['Eventos']);
    }).catch(err => console.log('error', err.message));

  }
  onLogout(){
    this.afAuth.auth.signOut();
    this.router.navigate(['Eventos']);
  }
}
