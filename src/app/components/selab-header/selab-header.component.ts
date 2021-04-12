
import { Component, Input, OnInit } from '@angular/core';

import { Storage } from '../../shared/storage';
import { LayoutComponent, TextComponent, UIComponent } from '../../models/ui-component-dependency';
import { PropertyGenerator } from '../../shared/property-generator';
import GraphEditorService from '../../services/externalRepresentation/graph-editor.service';
import { HttpClient } from '@angular/common/http';
import LoadService from '../../services/internalRepresentation/Load.service';
import SaveServie from '../../services/internalRepresentation/save.service';
import IRTransformer from '../../services/internalRepresentation/IRTransformer.service'
import {
  MatDialog,
  MatSnackBar,
  MatSnackBarVerticalPosition
} from '@angular/material';
import { SelabWizardComponent } from '../selab-wizard/selab-wizard.component';
import { SelabWebAppDashboardComponent } from '../selab-webApp-dashboard/selab-webApp-dashboard.component';
import { HttpClientService } from '../../services/http-client.service';
import { AppState } from 'src/app/models/store/app.state';
import { Store } from '@ngrx/store';
import { PageUICDL } from 'src/app/models/internalRepresentation/pageUICDL.model';
import { pageUICDLSelector, projectNameSelector, themeSelector } from "src/app/models/store/selectors/InternalRepresentationSelector";
import { SelabGlobalStorage } from 'src/app/models/store/globalStorage';
import NavigationService from '../../services/navigation/navigation.service';
import { forkJoin } from 'rxjs';
import axios from 'axios';
import { concatMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { WizardTask } from 'src/app/models/wizardTask/TaskGraph.model';
import { UIComponentConfig } from '../selab-wizard/uicomponent-config';
import { UIComponentFactory } from '../selab-wizard/uicomponent-factory';
import { UIComponentBuilder } from '../selab-wizard/UIComponentBuilder';
import { IRDeleteAllDLsAndThemes } from 'src/app/models/store/actions/internalRepresentation.action';
import { InviteGroupComponent } from '../login/invite-group/invite-group.component';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectGroupSettingDialogComponent } from '../project-group-setting-dialog/project-group-setting-dialog.component';

@Component({
  selector: 'selab-header',
  templateUrl: './selab-header.component.html',
  styleUrls: ['./selab-header.component.scss']
})
export class SelabHeaderComponent implements OnInit {
  public navItems = null;
  public sidebarMinimized = true;
  verticalPosition: MatSnackBarVerticalPosition = "top";

  public element: HTMLElement = document.body;

  // test_data
  layout: any[] = ['Prime', 'Alba', 'Leaf'];
  genre: any[];
  categories: any[];
  components: any[];
  layout_selected: any = 'Layout';
  genre_selected: any = 'Genre';
  category_selected: any = 'Category';
  component_selected: any = 'Component';
  componentProperties: any[];

  storageComponents: any[] = Storage.components;
  private layoutComponent: any;
  private layoutPart: any;
  public userName = 'undefined';
  private images: any[] = [];
  username: string = "";

  constructor(
    private graphEditorService: GraphEditorService,
    private loadService: LoadService,
    private saveService: SaveServie,
    private snackBar: MatSnackBar,
    public wizard: MatDialog,
    public inviteGroupDialog: MatDialog,
    public projectGroupSettingDialog: MatDialog,
    private IRTransformerService: IRTransformer,
    private store: Store<AppState>,
    public navigationService: NavigationService,
    private router: Router,
    private authService: AuthService,
    public webAppDashboard: MatDialog) {
  }

  ngOnInit(): void {
    this.genre = Storage.getGenre();
    this.userName = SelabGlobalStorage.getUserName();
  }

  setLayout(selection: any) {
    console.log("Set Layout: " + selection);
    this.layout_selected = selection;
    Storage.layout = this.layout_selected;
  }

  setGenre(genere: string) {
    console.log("Set Genere: " + genere);
    this.genre_selected = genere;
    this.categories = Storage.getCategories(this.genre_selected);
  }

  setCategory(category: string) {
    console.log("Set Category: " + category);
    this.category_selected = category;
    this.components = Storage.getComponents(this.genre_selected, this.category_selected);
    this.component_selected = 'Component';
  }

  setComponent(componentType: any) {
    console.log("Set Component Type: " + componentType);
    this.component_selected = componentType;
  }

  fresh() {
    this.componentProperties = [];
  }

  show() {
    console.log(Storage.components);
  }

  storePDL() {
    // let exportProjectName;
    // let exportThemeId;
    // let exportThemes;
    // let exportPageUICDLs;
    // this.openSnackBar("save PDL to database", "save");
    // let subscribtion = this.store.select(themeSelector()).subscribe(themes => {
    //   exportThemeId = themes[this.graphEditorService.selectedThemeIndex].id
    // })
    // subscribtion = this.store.select(projectNameSelector()).subscribe(projectName => exportProjectName = projectName)
    // subscribtion = this.store.select(themeSelector()).subscribe(themes => exportThemes = themes)
    // subscribtion = this.store.select(pageUICDLSelector()).subscribe(pageUICDLs => exportPageUICDLs = pageUICDLs)
    // subscribtion.unsubscribe();

    // var responseObservable = this.exportService.deletePageUICDL(exportProjectName).pipe(
    //   concatMap( () => {
    //     return this.exportService.deleteTheme(exportProjectName)
    //   }),
    //   concatMap( () => {
    //     let postTask = []
    //     for(let index=0; index<exportThemes.length; index++){
    //       let theme = {
    //         "id": exportThemes[index].id,
    //         "name": exportThemes[index].name
    //       }
    //       postTask.push(this.exportService.postTheme(exportProjectName, theme))
    //       console.log(theme)
    //     }
    //     return forkJoin(postTask)
    //   }),
    //   concatMap(()=>{
    //     console.log("post theme complete")
    //     let postTask = []
    //     let pageIds = Object.keys(exportPageUICDLs)
    //     for(let index=0; index<pageIds.length; index++){
    //       let themeId = exportPageUICDLs[pageIds[index]].themeId;
    //       postTask.push(this.exportService.postPageUICDL(exportProjectName, themeId, exportPageUICDLs[pageIds[index]]))
    //     }
    //     return forkJoin(postTask)
    //   }),
    // )
    // responseObservable.subscribe(response => console.log(response));
    // subscribtion.unsubscribe();

  }

  applyLayout(layout: string) {
    this.graphEditorService.setLayout(layout);
    this.graphEditorService.applyLayout(layout);
  }

  addLayoutItem(sf) {
    document.getElementById('myForm').style.display = 'none';
    const properties = sf.value;
    properties['id'] = PropertyGenerator.getID(this.graphEditorService.getMaxVertexID());
    properties['selector'] = 'text';
    properties['type'] = 'text';
    properties['layout'] = this.layoutPart;
    const text = new TextComponent(properties);
    if (this.layoutPart == 'sidebar') {
      this.layoutComponent['sidebar'].push(text);
    } else if (this.layoutPart == 'header') {
      this.layoutComponent['header'].push(text);
    } else if (this.layoutPart == 'footer') {
      this.layoutComponent['footer'].push(text);
    } else if (this.layoutPart == 'asidebar') {
      this.layoutComponent['asidebar'].push(text);
    }
    this.graphEditorService.bindComponent(text);

    for (const element of properties) {
      sf['value'][element] = '';
    }
    sf.resetForm(sf['value']);
  }

  openForm2() {
    console.log("open form 2")
    document.getElementById('navigationForm').style.display = 'block';
  }

  loadProject() {
    //this.loadService.loadProject();
  }

  save() {
    this.openSnackBar("synchronize vertex with ui component", "sync");
    this.graphEditorService.syncStorage();
  }

  storeNDL() {
    this.openSnackBar("save NDL to database", "save");
    if (this.graphEditorService.inNavigation == "theme") {
      this.navigationService.storeNDL("theme");
    }
    else if (this.graphEditorService.inNavigation == "themes") {
      this.navigationService.storeNDL("themes");
    }

  }

  showImage() {
    this.images = Storage.images;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: this.verticalPosition
    })
  }

  launchWizard(genere: string, category: string, type: string) {
    let compositeComponentTypes = ["card", "inputgroup", "form"];
    let isComposite = false;
    if (compositeComponentTypes.indexOf(type) >= 0)
      isComposite = true;

    SelabGlobalStorage.initializeTasks(new WizardTask().setIsRoot(true).setComponentType(type));
    if (this) {
      let wizardRef = this.wizard.open(SelabWizardComponent, {
        width: '45%',
        height: '55%',
        data: {
          isPipeline: false,
          isComposite: isComposite,
          genere: genere,
          category: category,
          type: type,
        },
        disableClose: true,
        autoFocus: true
      });
      wizardRef.afterClosed()
        .subscribe((task: WizardTask) => {
          task.finish();
          SelabGlobalStorage.taskGraph.next()
        })
    }
  }

  launchWebAppDashboard() {
    this.webAppDashboard.open(SelabWebAppDashboardComponent, {
      width: '70%',
      height: '70%',
      data: {},
      disableClose: true,
      autoFocus: true
    })
  }

  uploadFromDB() {
    this.loadService
  }

  uploadPageUICDL($event) {
    console.log('upload file');
    let selectedFile = $event.target.files[0]
    const fileReader = new FileReader();
    fileReader.readAsText(selectedFile, "UTF-8");
    fileReader.onload = () => {
      let pageUICDLObject = JSON.parse(fileReader.result as any);
      let pageUICDL = UIComponentFactory.createFromPageUICDLFromJSONObject(pageUICDLObject);
      this.graphEditorService.uploadPageUICDL(pageUICDL);
    }
    fileReader.onerror = (error) => {
      console.log(error);
    }
  }

  async logout() {
    let themeIDs = [];
    this.store.select(themeSelector()).subscribe(
      themes => {
        themes.forEach(theme => themeIDs.push(theme.id));
      }
    )

    this.authService.logout(themeIDs)
      .subscribe((response) => {
        console.log("Logout success");
        SelabGlobalStorage.closeSession();
        this.store.dispatch(new IRDeleteAllDLsAndThemes());
        this.router.navigate(['/login'])
      }, (error) => {
        console.log("logout fail")
      })
  }

  projectGroupSetting() {
    this.projectGroupSettingDialog.open(ProjectGroupSettingDialogComponent, {
      autoFocus: true
    });
  }

  saveProject() {
    console.log("export project");
    console.log(SelabGlobalStorage.getProjectName())
    this.storeNDL();
    this.saveService.saveProject(SelabGlobalStorage.getProjectName(), SelabGlobalStorage.getUserID())
  }
}