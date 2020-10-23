import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from "./app.routing";
import { DefaultLayoutComponent } from "./containers";
import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSlideToggleModule} from '@angular/material/slide-toggle'; 
import {MatSelectModule} from '@angular/material/select'; 
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { MatFormFieldModule, MatInputModule } from "@angular/material";
// import {AppHeaderComponent} from './components/app-header/app-header.component';

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from "@coreui/angular";

import { AppComponent } from "./app.component";
import { SelabGraphEditorComponent } from "./components/selab-graph-editor/selab-graph-editor.component";
import { NavigationComponent } from "./containers/default-layout/navigation/navigation.component";
import { WizardComponent } from "./containers/default-layout/wizard/wizard.component";
import { StyleEditorComponent } from './components/style-editor/style-editor.component';
import { NavEditorComponent } from './components/nav-editor/nav-editor.component';
import { PageEditorComponent } from './components/page-editor/page-editor.component';
import { CodeEditorComponent } from './components/code-editor/code-editor.component';
import { CodeEditorDialogComponent } from './components/code-editor-dialog/code-editor-dialog.component';
import { ServiceComponentConfigurationComponent } from './components/service-component-configuration/service-component-configuration.component';
import { XTerminalComponent } from './components/code-editor/x-terminal/x-terminal.component';
import { SelabFooterComponent } from './components/selab-footer/selab-footer.component';
import { SelabHeaderComponent } from './components/selab-header/selab-header.component';
import { SelabSettingComponent } from './components/selab-setting/selab-setting.component';
import { SelabBodyComponent } from './components/selab-body/selab-body.component';

@NgModule({
  declarations: [
    AppComponent,
    SelabGraphEditorComponent,
    SelabFooterComponent,
    SelabHeaderComponent,
    SelabSettingComponent,
    WizardComponent,
    NavigationComponent,
    DefaultLayoutComponent,
    StyleEditorComponent,
    NavEditorComponent,
    PageEditorComponent,
    CodeEditorComponent,
    CodeEditorDialogComponent,
    ServiceComponentConfigurationComponent,
    XTerminalComponent,
    SelabBodyComponent,
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
    MatDialogModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatFormFieldModule,
    MatProgressSpinnerModule
  ],
  entryComponents: [
    CodeEditorComponent,
    CodeEditorDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
