import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Content, ContentTree } from '../models/ContentTree';
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
    this.href = this.router.url.substring(1);
    this.contentTree = this.utilsService.getContent();
    this.folder =  this.getCurrentFolder();
  }

  private href: string = '';
  private contentTree: ContentTree = { contentTree: [] }
  public folder: Content[]  = [];

  private getCurrentFolder(): Content[] {

    let folder: Content[] = [];

    if (!this.href) {
      return this.contentTree.contentTree;
    }

    
    const loopContent = (content: Content[]): void => {
      for (let [key, value] of Object.entries(content)) {
        if (value.path === this.href) {
          folder.push(value);
        } else if (value.content) {
          loopContent(value.content);
        }

      }
    }
    loopContent(this.contentTree.contentTree);

    return folder;
  } 

}
