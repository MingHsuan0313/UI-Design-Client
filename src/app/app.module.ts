import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WizardComponent } from './wizard/wizard.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    WizardComponent,
    NavigationComponent,
    ControlPanelComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
