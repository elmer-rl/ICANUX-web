import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private router:Router, private authService:AuthService) { }
  public email: string ='';
  public pass: string = '';
  public name: string ='';
  public lastname: string = '';

  ngOnInit() {
  }

  onAddUser(){
    this.authService.registerUser(this.email,this.pass)
    .then((res) =>{
      this.router.navigate(['/']);
    }).catch(err => console.log('error',err.message));
  }
}
