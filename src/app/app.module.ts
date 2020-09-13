import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from "./app.component";
import { AppGraphEditorComponent } from "./components/app-graph-editor/app-graph-editor.component";
import { AppSettingComponent } from "./components/app-setting/app-setting.component";
// import { WizardComponent } from "./components/control-panel/wizard/wizard.component";
// import { NavigationComponent } from "./components/control-panel/navigation/navigation.component";
import {NavigationComponent} from "./containers/default-layout/navigation/navigation.component";

import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from "./app.routing";
import { DefaultLayoutComponent } from "./containers";
import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { MonacoEditorModule } from 'ngx-monaco-editor';
// import {AppHeaderComponent} from './components/app-header/app-header.component';

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from "@coreui/angular";

import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import {WizardComponent} from "./containers/default-layout/wizard/wizard.component";
import { StyleEditorComponent } from './components/style-editor/style-editor.component';
import { NavEditorComponent } from './components/nav-editor/nav-editor.component';
import { PageEditorComponent } from './components/page-editor/page-editor.component';
import { CodeEditorComponent } from './components/code-editor/code-editor.component';
import { CodeEditorDialogComponent } from './components/code-editor-dialog/code-editor-dialog.component';
import { ServiceComponentConfigurationComponent } from './components/service-component-configuration/service-component-configuration.component';

@NgModule({
  declarations: [
    AppComponent,
    AppGraphEditorComponent,
    AppSettingComponent,
    WizardComponent,
    NavigationComponent,
    DefaultLayoutComponent,
    StyleEditorComponent,
    NavEditorComponent,
    PageEditorComponent,
    CodeEditorComponent,
    CodeEditorDialogComponent,
    ServiceComponentConfigurationComponent
  ],
  imports: [
    PerfectScrollbarModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MonacoEditorModule.forRoot() ,
    FormsModule,
    HttpClientModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppHeaderModule,
    AppFooterModule,
    AppSidebarModule,
    BsDropdownModule.forRoot(),
    MatTabsModule,
    MatButtonModule,
    MatDialogModule
  ],
  entryComponents: [
    CodeEditorComponent,
    CodeEditorDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
