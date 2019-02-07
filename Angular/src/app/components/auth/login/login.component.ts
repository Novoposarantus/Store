import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {AuthService} from '../../../servises';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router,
              private cd: ChangeDetectorRef) { }
  form = {
    login: '',
    password: ''
  }
  ngOnInit() {
    if(this.authService.isAuthenticated){
      this.router.navigateByUrl('/');
    }
  }
  onSubmit(){
    this.authService.login(this.form)
    this.router.navigateByUrl('/');
  }
  register(){
    this.router.navigateByUrl('/register');
  }
}
