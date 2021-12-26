import { Injectable } from '@angular/core';
import * as contentTree from '../assets/content-tree.json';
import { ContentTree } from './models/ContentTree';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }

  getContentTree(): ContentTree {
    return contentTree;
  }
}
