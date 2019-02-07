import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-custom-error',
  templateUrl: './custom-error.component.html',
  styleUrls: ['./custom-error.component.css']
})
export class CustomErrorComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }

}
