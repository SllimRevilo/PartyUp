import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  constructor(private router:Router) { }

  user= {email:"username@gmail.com", password:"password", passwordConfirm:"password"}
  ngOnInit() {
  }

  signUp(email: string, password: string, passwordConfirm)
  {
    this.router.navigate(["home"]);
  }
}
