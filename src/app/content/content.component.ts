import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'content-component',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  
  constructor(
    private utilsService: UtilsService,
    private router : Router,
  ) {

  }

  ngOnInit() {
    this.href = this.router.url;

    console.log('----------------------------');
    console.log(this.router.url);
    console.log('-----------------------------');
    console.log(this.utilsService.getContent().contentTree);
  }

  private href: string = '';

}
