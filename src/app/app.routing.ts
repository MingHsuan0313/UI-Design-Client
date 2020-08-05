import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
// Import Containers
import {DefaultLayoutComponent} from './containers';
import {NavigationComponent} from './containers/default-layout/navigation/navigation.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full'
  },
  {
    path: 'index',
    component: DefaultLayoutComponent,
    children: [
      {
        path: ':id',
        component: NavigationComponent

      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
