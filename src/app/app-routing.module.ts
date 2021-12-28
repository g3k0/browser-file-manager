import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UtilsService } from './services/utils.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { ContentComponent } from './content/content.component';
import { Content } from './models/ContentTree';

/**
 * Get the json of the directory structure
 */
const content = UtilsService.getContentJSON();

/**
 * loop the json and extract the paths
 */
const a: string[] = []
const loopContent = (routes: string[],content: Content[]): string[] => {
  for (let [key, value] of Object.entries(content)) {
    if (key === 'default') continue;
    routes.push(value.path);
    if (value.content && value.content.length) {
      value.content.map((c: Content) => {
        if (c.content && c.content.length) {
          routes.push(c.path);
          loopContent(routes,c.content);
          return c;
        }
        return c;
      });
    }
  }
  function onlyUnique(value: string, index: number, self: any): boolean {
    return self.indexOf(value) === index;
  }
  const uniqueRoutes = routes.filter(onlyUnique);

  return uniqueRoutes;
}

const paths = loopContent(a, content.contentTree);
const routes: Routes = [];

/**
 * define the routes based on the paths extracted
 */

// case 1: the root content is empty
if (!content.contentTree.length) {
  routes.push({ path: '', component: ContentComponent });
// case 2, there is content to show (only folders, only files or folders and files)
} else {
  routes.push({ path: '', component: ContentComponent });
  paths.map((path: string) => {
    routes.push({ path, component: ContentComponent });
    return path;
  });
}
routes.push({ path: '**', component: NotFoundComponent });



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
