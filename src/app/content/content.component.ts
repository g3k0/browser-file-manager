import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Content, ContentTree } from '../models/ContentTree';
import { UtilsService } from '../services/utils.service';
import {Sort} from '@angular/material/sort';

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

    if (this.folder[0].content) {
      this.sortedData = this.folder[0].content.slice();
    }
  }

  private href: string = '';
  private contentTree: ContentTree = { contentTree: [] }
  public folder: Content[]  = [];
  public columnsToDisplay = ['name', 'date-modified', 'type', 'size'];
  public sortedData: Content[] = [];

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

  doubleClick(element: Content): void {
    if (element.type === 'folder') {
      this.router.navigateByUrl(element.path);
    }
    return;
  }

  private compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  sortData(sort: Sort): void {

    if (this.folder[0].content) {
      const data = this.folder[0].content.slice();
      if (!sort.active || sort.direction === '') {
        this.sortedData = data;
        return;
      }

      this.sortedData = data.sort((a, b) => {
        const isAsc = sort.direction === 'asc';
        switch (sort.active) {
          case 'name':
            return this.compare(a.name, b.name, isAsc);
          case 'date-modified':
            return this.compare(a.modificationDate, b.modificationDate, isAsc);
          case 'type':
            return this.compare(a.type, b.type, isAsc);
          default:
            return 0;
        }
      });
    }
  }

  public goBack(content: Content[]): void {
    console.log(content);
  }

}
