import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { AppGraphEditorComponent } from "./components/app-graph-editor/app-graph-editor.component";
import { AppSettingComponent } from "./components/app-setting/app-setting.component";
import { WizardComponent } from "./components/control-panel/wizard/wizard.component";
import { NavigationComponent } from "./components/control-panel/navigation/navigation.component";
import { ControlPanelComponent } from "./components/control-panel/control-panel.component";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {AppHeaderComponent} from './components/app-header/app-header.component';
import { AppFooterComponent } from './components/app-footer/app-footer.component';


@NgModule({
  declarations: [
    AppComponent,
    AppGraphEditorComponent,
    AppSettingComponent,
    WizardComponent,
    NavigationComponent,
    ControlPanelComponent,
    AppHeaderComponent,
    AppFooterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
