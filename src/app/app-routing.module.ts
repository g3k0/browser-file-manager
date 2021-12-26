import { NgModule, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentTree } from '../app/models/ContentTree';
import { ContentService } from './shared/services/content.service';
import { SharedModule } from './shared/shared.module';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { ContentComponent } from './shared/components/content/content.component';
 
const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes), SharedModule],
  exports: [RouterModule]
})
export class AppRoutingModule implements OnInit { 

  constructor(
    private contentService: ContentService,
  ) {

  }

  ngOnInit() {
    this.defineRoutes();
  }

  content: ContentTree = this.contentService.getContentTree();


  defineRoutes = () => {
    routes.push(
      { path: '', component: ContentComponent },
      // { path: this.content.contentTree[0].path, component: ContentComponent },
      // { path: '', component: ContentComponent },
      // { path: '**', component: NotFoundComponent },

    )
  }

}
