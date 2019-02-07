import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../servises';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router) { }

  form = {
    login: '',
    password: ''
  }

  ngOnInit() {
    if (this.authService.isAuthenticated){
      this.router.navigateByUrl('/');
    }
  }

  onSubmit(){
    this.authService.register(this.form)
    this.router.navigateByUrl('/login');
  }
}
