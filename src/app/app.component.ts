import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './app.service';
import { ContentTree } from './models/ContentTree';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  constructor(
    private appService: AppService,
    private router : Router,
  ) {

  }

  ngOnInit() {
    this.href = this.router.url;

    console.log('----------------------------');
    console.log(this.router.url);
    console.log('-----------------------------');
  }

  private href: string = '';
  public content: ContentTree = this.appService.getContentTree();

}
