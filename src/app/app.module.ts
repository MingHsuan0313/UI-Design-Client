import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MonacoEditorModule } from 'ngx-monaco-editor';

import {FormsModule} from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app.routing";
import { DefaultLayoutComponent } from "./containers";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";


import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from "@coreui/angular";

import { AppComponent } from "./app.component";
import { SelabGraphEditorComponent } from "./components/selab-graph-editor/selab-graph-editor.component";
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
import { SelabHeaderNavigationFormComponent } from './components/selab-header-navigation-form/selab-header-navigation-form.component';
import { SelabWizardComponent } from './components/selab-wizard/selab-wizard.component';
import { BuildTabComponent } from './components/selab-wizard/build-tab/build-tab.component';
import { ComposeTabComponent } from './components/selab-wizard/compose-tab/compose-tab.component';
import { PipelineTabComponent } from './components/selab-wizard/pipeline-tab/pipeline-tab.component';
import { InformationTabComponent } from './components/selab-wizard/information-tab/information-tab.component';
import { BindServiceTabComponent } from './components/selab-wizard/bind-service-tab/bind-service-tab.component';
import { BPELDesignerComponent } from "./containers/bpel-designer/bpel-designer.component";
import { PaletteComponent } from "./bpel-designer/components/palette/palette.component";
import { PropertyEditorComponent } from "./bpel-designer/components/property-editor/property-editor.component";
import { PipelineDataMenuComponent } from './components/selab-wizard/pipeline-tab/pipeline-data-menu/pipeline-data-menu.component';
import { MenuItemComponent } from './components/selab-wizard/pipeline-tab/pipeline-data-menu/menu-item/menu-item.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { pipelineStorageReducer } from "./models/store/reducers/PipelineStorageReducer";
import { Action, StoreModule } from "@ngrx/store";
import { PipelineStorage } from "./models/wizard-task-dependency";
import { AppState, ExternalRepresentation, InternalRepresentation } from "./models/store/app.state";
import { PageUICDL } from "./models/internalRepresentation/pageUICDL.model";
import { externalRepresentationReducer } from "./models/store/reducers/ExternalRepresentationReducer";
import { internalRepresentationReducer } from "./models/store/reducers/InternalRepresentationReducer";
import { ConfirmDialogComponent } from './components/utils/confirm-dialog/confirm-dialog.component';
import { TabNameDialogComponent } from './components/selab-graph-editor/tab-name-dialog/tab-name-dialog.component';
import { ComponentInfoComponent } from './components/selab-setting/component-info/component-info.component';
import { EndpointTestComponent } from './components/selab-setting/endpoint-test/endpoint-test.component'; 
import { AngularMaterialModule } from "./angular-material/angular-material.module";

const appState = {
  pipelineStorage: new PipelineStorage(),
  internalRepresentation: new InternalRepresentation(),

  externalRepresentation: new ExternalRepresentation()
}

export const rootReducer = (
  state = appState,
  action: Action 
) => {
  return {
    pipelineStorage: pipelineStorageReducer(state.pipelineStorage,action),
    externalRepresentation: externalRepresentationReducer(state.externalRepresentation,action),
    internalRepresentation: internalRepresentationReducer(state.internalRepresentation,action),
  }; 
}

export function reducerFactory() {
  return rootReducer;
}

@NgModule({
  declarations: [
    AppComponent,
    SelabGraphEditorComponent,
    SelabFooterComponent,
    SelabHeaderComponent,
    SelabSettingComponent,
    WizardComponent,
    DefaultLayoutComponent,
    StyleEditorComponent,
    NavEditorComponent,
    PageEditorComponent,
    CodeEditorComponent,
    CodeEditorDialogComponent,
    ServiceComponentConfigurationComponent,
    XTerminalComponent,
    SelabBodyComponent,
    SelabHeaderNavigationFormComponent,
    SelabWizardComponent,
    BuildTabComponent,
    ComposeTabComponent,
    PipelineTabComponent,
    InformationTabComponent,
    BindServiceTabComponent,
    BPELDesignerComponent,
    PaletteComponent,
    PropertyEditorComponent,
    PipelineDataMenuComponent,
    MenuItemComponent,
    ConfirmDialogComponent,
    TabNameDialogComponent,
    ComponentInfoComponent,
    EndpointTestComponent
  ],
  imports: [
    AngularMaterialModule,
    PerfectScrollbarModule,
    AppRoutingModule,
    CommonModule,
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
    ReactiveFormsModule,
    StoreModule.forRoot(undefined,{
      reducerFactory
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  entryComponents: [
    CodeEditorComponent,
    CodeEditorDialogComponent,
    SelabWizardComponent,
    ConfirmDialogComponent,
    TabNameDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
