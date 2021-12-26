import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentTree } from '../app/models/ContentTree';
import { UtilsService } from './services/utils.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { ContentComponent } from './content/content.component';
 
const routes: Routes = [
  { path: '', component: ContentComponent },
  //{ path: this.content.contentTree[0].path, component: ContentComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

  constructor(
    private utilsService: UtilsService,
  ) {
    this.defineRoutes();
  }

  content: ContentTree = this.utilsService.getContentTree();


  defineRoutes = () => {
    routes.push(
      { path: '', component: ContentComponent },
      { path: this.content.contentTree[0].path, component: ContentComponent },
      { path: '', component: ContentComponent },
      { path: '**', component: NotFoundComponent },

    )
  }

}
