import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup,ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from '../firebase.service';
import firebase from 'firebase/app';
import 'firebase/storage';
import { CommunityService } from '../community.service';

@Component({
  selector: 'app-add-community',
  templateUrl: './add-community.page.html',
  styleUrls: ['./add-community.page.scss'],
})
export class AddCommunityPage implements OnInit {

  add_community_form: FormGroup;
  community = {name:"",description:"", pic:""}

  constructor(private router: Router,
    public formBuilder: FormBuilder,
    public fbService: FirebaseService,
    public communityService: CommunityService) { }

  ngOnInit() {
    this.add_community_form = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      pic: new FormControl('',Validators.required)
    });
  }

  createCommunity(value){
    this.communityService.createCommunity(value.name,value.description,value.pic,this.fbService.getUserID())
    this.add_community_form.reset()
    this.goBack();
  }

  goBack(){
    this.router.navigate(['/tabs/tab1'])
  }

}
