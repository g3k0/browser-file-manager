import { HostListener, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Content, ContentTree } from '../models/ContentTree';
import { UtilsService } from '../services/utils.service';
import {Sort} from '@angular/material/sort';
import { AbstractKeypress } from './abstract-keypress';
import { KeyboardNavigationService } from '../services/keyboard-navigation.service';

@Component({
  selector: 'content-component',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent extends AbstractKeypress implements OnInit {
  
  constructor(
    private utilsService: UtilsService,
    private router : Router,
    private keyService: KeyboardNavigationService,
  ) {
    super(keyService);
  }

  override ngOnInit() {
    this.href = this.router.url.substring(1);
    this.contentTree = this.utilsService.getContent();
    this.folder =  this.getCurrentFolder();

    if (this.folder[0].content) {
      this.sortedData = this.folder[0].content.slice();
      this.sortedDataLength = this.sortedData.length;
      this.sortedDataKeyboardIndex = 0;
    }
  }

  private href: string = '';
  private contentTree: ContentTree = { contentTree: [] };
  private backContent: Content[] = [];
  public folder: Content[]  = [];
  public columnsToDisplay = ['name', 'date-modified', 'type', 'size'];
  public sortedData: Content[] = [];
  public searchString: string = '';

  private keyDownContent: Content[] = [];
  private keyUpContent: Content[] = [];
  private sortedDataLength: number = 0;
  private sortedDataKeyboardIndex: number = 0;

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

  private compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  private loopForBack = (a: Content, b:Content[]) => {

    if (a.content) {
      a.content.map((sc:Content) => {
        if (sc.path === b[0].path && a.path.length) {
          this.backContent = [a];
          return; 
        } else {
          this.loopForBack(sc,b);
        }
        return sc;
      })
    }
  };

  private loopForSearch = (stringToSearch: string, content:Content[], resultsContentArray: Content[]) => {
    content.map((c:Content) => {
      if (c.name.includes(stringToSearch)) {
        resultsContentArray.push(c);
      }
      if (c.content) {
        this.loopForSearch(stringToSearch, c.content, resultsContentArray);
      }
    });
    return resultsContentArray;
  }

  public doubleClick(element: Content): void {

    if (element.type === 'folder') {
      this.router.navigateByUrl(element.path);
    }
    return;
  }

  public sortData(sort: Sort): void {

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

  /**
   * I loop into the main content tree structure searching for the parent content,
   * navigate to the previous route is more simple but in this case the back button doesn't work 
   * if the user press the "go back" button after making a search.
   * 
   */
  public goBack(content: Content[]): void {
    this.loopForBack(this.contentTree.contentTree[0], content);
    this.folder = this.backContent;

    if (this.backContent && this.backContent.length) {
      this.router.navigateByUrl(this.backContent[0].path);
      if (this.folder[0].content) {
        this.sortedData = this.folder[0].content.slice();
        this.sortedDataLength = this.sortedData.length;
        this.sortedDataKeyboardIndex = 0;
      }
    }
  }

  public search() {
    const searchResult: ContentTree = {
      contentTree: [{
        path: "",
        modificationDate: "",
        type: "folder",
        name: "",
        content: [],
      }] 
    };

    const resultsArray = this.loopForSearch(this.searchString, this.contentTree.contentTree, []);
    searchResult.contentTree[0].content = resultsArray;
    this.folder = searchResult.contentTree;
    if (this.folder[0].content) {
      this.sortedData = this.folder[0].content.slice();
      this.sortedDataLength = this.sortedData.length;
      this.sortedDataKeyboardIndex = 0;
    }
  }

  public clearSearch() {
    this.searchString = '';
    this.folder = this.contentTree.contentTree;
    if (this.folder[0].content) {
      this.sortedData = this.folder[0].content.slice();
      this.sortedDataLength = this.sortedData.length;
      this.sortedDataKeyboardIndex = 0;
    }
  }

  public keyActions: {[key: string]: () => void} = {
    'KeyB': () => { this.goBackKeyboardNavigation() },
    'KeyW': () => { this.goUpKeyboardNavigation() },
    'KeyS': () => { this.goDownKeyboardNavigation() },
    'Enter': () => { this.executeActionKeyboardNavigation(); },
  };

  @HostListener('document:keypress', ['$event'])
  public reactToKeyPress(key: any): void {
    if (this.keyActions[key.code]) this.keyActions[key.code]();
  }

  private goBackKeyboardNavigation() {
    this.goBack(this.folder);
  }

  private executeActionKeyboardNavigation() {
    if (this.keyDownContent.length) {
      this.doubleClick(this.keyDownContent[0]);
    } else if (this.keyUpContent.length) {
      this.doubleClick(this.keyUpContent[0]);
    }
  }

  private goUpKeyboardNavigation() {

    this.keyDownContent = [];

    if (this.sortedDataKeyboardIndex > 0) {
      this.sortedDataKeyboardIndex--;
      this.keyDownContent = [this.sortedData[this.sortedDataKeyboardIndex]];
    } else {
      this.sortedDataKeyboardIndex = 0;
      this.keyDownContent = [this.sortedData[0]];
    }
  }

  private goDownKeyboardNavigation() {

    this.keyUpContent = [];

    if (!this.keyDownContent.length) {
      this.keyDownContent = [this.sortedData[0]];
      return;
    } else if (this.sortedDataKeyboardIndex < this.sortedDataLength) {
      this.sortedDataKeyboardIndex++;
      this.keyDownContent = [this.sortedData[this.sortedDataKeyboardIndex]];
    } else {
      this.keyDownContent = [];
      return;
    }
  }

}
