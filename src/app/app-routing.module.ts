import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UtilsService } from './services/utils.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { ContentComponent } from './content/content.component';

const content = UtilsService.getContentJSON();


const routes: Routes = [
  { path: '',   redirectTo:  content.contentTree[0].path, pathMatch: 'full' },
  { path: content.contentTree[0].path, component: ContentComponent },
  { path: content.contentTree[0].content![0].path, component: ContentComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [UtilsService],
})
export class AppRoutingModule {

  constructor(
    utilsService: UtilsService, 
  ) {
    utilsService.setContent(content);
  }
}
