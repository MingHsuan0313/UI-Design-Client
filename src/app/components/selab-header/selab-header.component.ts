
import { Component, Input, OnInit } from '@angular/core';

import { Storage } from '../../shared/storage';
import { TextComponent, UIComponent } from '../../models/ui-component-dependency';
import { PropertyGenerator } from '../../shared/property-generator';
import GraphEditorService from '../../services/externalRepresentation/graph-editor.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import ImportService from '../../services/internalRepresentation/import.service';
import ExportService from '../../services/internalRepresentation/export.service';
import IRTransformer from '../../services/internalRepresentation/IRTransformer.service'
import {
  MatDialog,
  MatDialogConfig,
  MatSnackBar,
  MatSnackBarVerticalPosition
} from '@angular/material';
import { SelabWizardComponent } from '../selab-wizard/selab-wizard.component';
import { AppState } from 'src/app/models/store/app.state';
import { Store } from '@ngrx/store';
import { IRClearPageUICDLAction, IRDeletePageUICDLAction, IRInsertPageUICDLAction, IRRenamePageAction } from 'src/app/models/store/actions/internalRepresentation.action';
import { PageUICDL } from 'src/app/models/internalRepresentation/pageUICDL.model';
import { pageUICDLSelector } from "src/app/models/store/selectors/InternalRepresentationSelector";
import { ERInsertGraphStorageAction } from 'src/app/models/store/actions/externalRepresentation.action';
import { SelabGraph } from 'src/app/models/externalRepresentation/selabGraph.model';

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


  constructor(private httpClient: HttpClient,
    private graphEditorService: GraphEditorService,
    private importService: ImportService,
    private exportService: ExportService,
    private IRTransformerService: IRTransformer,
    private snackBar: MatSnackBar,
    private store: Store<AppState>,
    public wizard: MatDialog) {

  }

  ngOnInit(): void {
    this.genre = Storage.getGenre();
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
    const pageUICDL = Storage.getPageUICDL();
    this.openSnackBar("save PDL to database", "save");
    this.exportService.postPageUICDL(Storage.pageUICDL).subscribe(
      response => console.log(response['body'])
    );
  }

  apply() {
    // this.graphEditorService.applyLayout(this.layout_selected);
  }

  applyLayout(layout: string) {
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

  import() {
    this.importService.import();
  }

  save() {
    this.openSnackBar("synchronize vertex with ui component", "sync");
    // this.graphEditorService.syncMxCells();
    this.graphEditorService.syncStorage();
  }

  storeNDL() {
    this.openSnackBar("save NDL to database", "save");
    this.exportService.postNDL().subscribe(
      response => console.log(response['body'])
    );
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
    let compositeComponentTypes = ["card", "breadcrumb", "inputgroup", "form"];
    let isComposite = false;
    if (compositeComponentTypes.indexOf(type) >= 0)
      isComposite = true;

    if (this) {
      this.wizard.open(SelabWizardComponent, {
        width: '40%',
        height: '60%',
        data: {
          isPipeline: false,
          isComposite: isComposite,
          genere: genere,
          category: category,
          type: type,
          returnData: {}
        },
        disableClose: true,
        autoFocus: true
      });
    }
  }

  uploadPageUICDL($event) {
    let selectedFile = $event.target.files[0]
    const fileReader = new FileReader();
    fileReader.readAsText(selectedFile, "UTF-8");
    fileReader.onload = () => {
      let pageUICDLObject = JSON.parse(fileReader.result as any);
      let uuid = require('uuid');
      let pageId = `graph-container-${uuid.v1()}`;

      let pageUICDL = new PageUICDL(pageId); // internalRepresentation

      Object.assign(pageUICDL, pageUICDLObject);
      pageUICDL['id'] = pageId;
      this.store.dispatch(new IRInsertPageUICDLAction(pageUICDL));
      this.store.dispatch(new IRRenamePageAction(pageId, pageUICDL['name']));
      this.store.dispatch(new ERInsertGraphStorageAction(new SelabGraph(pageId)))

      //  let graphID = this.graphEditorService.selectedPageId;

      //  this.store.dispatch(new IRDeletePageUICDLAction(graphID));
      //  console.log(pageUICDL)
      //  console.log(this.store.select(pageUICDLSelector()))
      //  pageUICDL.setId(graphID); 
      //  this.store.dispatch(new IRInsertPageUICDLAction(pageUICDL));
      let originalId = this.graphEditorService.selectedPageId;
      this.graphEditorService.selectedPageId = pageId;
      let uiComponentList = this.IRTransformerService.transform(pageUICDL, this.graphEditorService.getGraph());
      this.applyLayout("prime")
      uiComponentList.forEach(
        uiComponent => {
          console.log(uiComponent)
          this.graphEditorService.bindComponent(uiComponent, uiComponent.geometry);
        }
      )
      this.graphEditorService.clearGraphModel();
      this.graphEditorService.selectedPageId = originalId;
    }
    fileReader.onerror = (error) => {
      console.log(error);
    }
  }

  // openWizard() {
  //   let compositeComponents = ["card", "breadcrumb", "inputgroup", "form"];
  //   let isComposite = false;
  //   if (compositeComponents.indexOf(this.component_selected) >= 0)
  //     isComposite = true;

  //   if (this) {
  //     this.wizard.open(SelabWizardComponent, {
  //       width: '55%',
  //       height: '65%',
  //       data: {
  //         isPipeline: false,
  //         isComposite: isComposite,
  //         genere: this.genre_selected,
  //         category: this.category_selected,

  //         type: this.component_selected,
  //         returnData: {}
  //       },
  //       disableClose: true,
  //       autoFocus: true
  //     });
  //   }
  // }
}