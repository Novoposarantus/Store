import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nep',
  templateUrl: './nep.component.html',
  styleUrls: ['./nep.component.css']
})
export class NEPComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }

}
