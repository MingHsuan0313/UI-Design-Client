import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { AppHeaderComponent } from "./components/app-header/app-header.component";
import { AppGraphEditorComponent } from "./components/app-graph-editor/app-graph-editor.component";
import { AppSettingComponent } from "./components/app-setting/app-setting.component";
import { WizardComponent } from "./components/control-panel/wizard/wizard.component";
import { NavigationComponent } from "./components/control-panel/navigation/navigation.component";
import { ControlPanelComponent } from "./components/control-panel/control-panel.component";
import { FormsModule} from "@angular/forms";
import { HttpClientModule} from "@angular/common/http";
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import { BrowserAnimationsModule,NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button'
import { MatToolbarModule } from  '@angular/material/toolbar';
import { MatIconModule} from  '@angular/material/icon';
import { MatSidenavModule} from  '@angular/material/sidenav';
import { MatListModule } from  '@angular/material/list';

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
  entryComponents: [
    WizardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
