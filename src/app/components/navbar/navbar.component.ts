import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../../models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService, private afsAuth: AngularFireAuth) { }
  public app_name: string = 'PachappEvent';
  public isLogged : boolean = false;
  user : User ={
    name:'',
    lastname:'',
    email:'',
    photourl:'',
  }
public providerId = 'null';
  ngOnInit() {
    this.getCurrentUser();
    this.authService.isAuth().subscribe(user => {
      if(user){
        this.user.name = user.displayName;
        this.user.email= user.email;
        this.user.photourl=user.photoURL;
        this.providerId = user.providerData[0].providerId;
        // console.log('info user',user);
      }
    })
  }

getCurrentUser(){
  this.authService.isAuth().subscribe(auth => {
    if(auth){
      console.log('user loged');
      this.isLogged= true;
    }
    else{
      console.log('user unloged');
      this.isLogged = false;
    }
  })
}

onLogout(){
  this.afsAuth.auth.signOut();
  this.isLogged = false
}
}
