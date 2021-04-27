import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-community-page',
  templateUrl: './community-page.page.html',
  styleUrls: ['./community-page.page.scss'],
})
export class CommunityPagePage implements OnInit {

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
