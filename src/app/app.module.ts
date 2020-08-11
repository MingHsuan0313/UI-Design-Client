import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from "./app.component";
import { AppGraphEditorComponent } from "./components/app-graph-editor/app-graph-editor.component";
import { AppSettingComponent } from "./components/app-setting/app-setting.component";
// import { WizardComponent } from "./components/control-panel/wizard/wizard.component";
// import { NavigationComponent } from "./components/control-panel/navigation/navigation.component";
import {NavigationComponent} from "./containers/default-layout/navigation/navigation.component";
import { ControlPanelComponent } from "./components/control-panel/control-panel.component";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from "./app.routing";
import { DefaultLayoutComponent } from "./containers";
import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { MonacoEditorModule } from "ngx-monaco-editor";
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
import { CodeEditorComponent } from './components/code-editor/code-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    AppGraphEditorComponent,
    AppSettingComponent,
    WizardComponent,
    NavigationComponent,
    ControlPanelComponent,
    DefaultLayoutComponent,
    CodeEditorComponent
  ],
  imports: [
    PerfectScrollbarModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppHeaderModule,
    AppFooterModule,
    AppSidebarModule,
    BsDropdownModule.forRoot(),
    MonacoEditorModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
