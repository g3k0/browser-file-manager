import { Injectable } from '@angular/core';
import * as contentJSON from '../../assets/content-tree.json';
import { ContentTree } from '../models/ContentTree';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  private content: ContentTree = {
    contentTree: []
  };

  public setContent(c: ContentTree): void {
    this.content = c;
  }

  public getContent(): ContentTree {
    return this.content;
  }

  static getContentJSON(): ContentTree {
    return contentJSON;
  }
}
