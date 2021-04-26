import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user= {email:"username@gmail.com", password:"password"}

  constructor(private router:Router) { }

  ngOnInit() {
  }

  login(email: string, password: string)
  {
    this.router.navigate(["home"]);
  }

}
