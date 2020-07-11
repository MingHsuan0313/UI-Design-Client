import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AppSidebarComponent } from './components/app-sidebar/app-sidebar.component';
import { AppGraphEditorComponent } from './components/app-graph-editor/app-graph-editor.component';
import { AppSettingComponent } from './components/app-setting/app-setting.component';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppSidebarComponent,
    AppGraphEditorComponent,
    AppSettingComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
