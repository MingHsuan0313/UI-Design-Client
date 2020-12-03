import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from "@coreui/angular";


@NgModule({
  imports: [
  ],
  declarations: [],
  exports: [
    AppAsideModule,
    AppHeaderModule,
    AppFooterModule,
    AppSidebarModule
  ]
})
export class AngularCoreUIModule { }
