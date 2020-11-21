
import { Component, Input, OnInit } from '@angular/core';

import { Storage } from '../../shared/storage';
import { TextComponent } from '../../models/ui-component-dependency';
import { PropertyGenerator } from '../../shared/property-generator';
import GraphEditorService from '../../services/externalRepresentation/graph-editor.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import ImportService from '../../services/internalRepresentation/import.service';
import ExportService from '../../services/internalRepresentation/export.service';
import { MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';
import { SelabWizardComponent } from '../selab-wizard/selab-wizard.component';

@Component({
  selector: 'selab-header',
  templateUrl: './selab-header.component.html',
  styleUrls: ['./selab-header.component.scss']
})
export class SelabHeaderComponent implements OnInit {
  public navItems = null;
  public sidebarMinimized = true;

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
    private snackBar: MatSnackBar,
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
    this.graphEditorService.applyLayout(this.layout_selected);
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
    this.graphEditorService.syncMxCells();
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
    })
  }

  launchWizard(genere: string, category: string, type: string) {
    let compositeComponentTypes = ["card", "breadcrumb", "inputgroup", "form"];
    let isComposite = false;
    if (compositeComponentTypes.indexOf(type) >= 0)
      isComposite = true;

    if (this) {
      this.wizard.open(SelabWizardComponent, {
        width: '55%',
        height: '65%',
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

  openWizard() {
    let compositeComponents = ["card", "breadcrumb", "inputgroup", "form"];
    let isComposite = false;
    if (compositeComponents.indexOf(this.component_selected) >= 0)
      isComposite = true;

    if (this) {
      this.wizard.open(SelabWizardComponent, {
        width: '55%',
        height: '65%',
        data: {
          isPipeline: false,
          isComposite: isComposite,
          genere: this.genre_selected,
          category: this.category_selected,

          type: this.component_selected,
          returnData: {}
        },
        disableClose: true,
        autoFocus: true
      });
    }
  }
}