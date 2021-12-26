import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
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
  ) {

  }

  ngOnInit() {
    
  }

  public content: ContentTree = this.appService.getContentTree();

}
