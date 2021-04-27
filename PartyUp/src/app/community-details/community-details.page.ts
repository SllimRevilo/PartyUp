import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-community-details',
  templateUrl: './community-details.page.html',
  styleUrls: ['./community-details.page.scss'],
})
export class CommunityDetailsPage implements OnInit {

  isPrivate: boolean = true;
  isModerator: boolean = true;
  isOwner: boolean = true;

  constructor() { }

  ngOnInit() {
  }

  test()
  {
    console.log("lul test");
    console.log(this.isPrivate);
  }
}
