import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AppGraphEditorComponent } from './components/app-graph-editor/app-graph-editor.component';
import { AppSettingComponent } from './components/app-setting/app-setting.component';
import { WizardComponent } from './components/control-panel/wizard/wizard.component';
import { NavigationComponent } from './components/control-panel/navigation/navigation.component';
import { ControlPanelComponent } from './components/control-panel/control-panel.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppGraphEditorComponent,
    AppSettingComponent,
    WizardComponent,
    NavigationComponent,
    ControlPanelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
