import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-community-details',
  templateUrl: './community-details.page.html',
  styleUrls: ['./community-details.page.scss'],
})
export class CommunityDetailsPage implements OnInit {

  private pic:string="";
  private description: string ="";
  constructor() { }

  ngOnInit() {
  }

  test()
  {
    console.log("lul test");
    console.log(this.pic);
    console.log(this.description);
  }
}
