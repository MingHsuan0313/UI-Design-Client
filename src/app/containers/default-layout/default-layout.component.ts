import {Component, Input, OnInit} from '@angular/core';

import {Storage} from '../../shared/storage';
import GraphEditorService from '../../services/externalRepresentation/graph-editor.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import ImportService from '../../services/internalRepresentation/import.service';
import ExportService from '../../services/internalRepresentation/export.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.css']
})
export class DefaultLayoutComponent implements OnInit {
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
  public userName = 'undefined';


  constructor(private httpClient: HttpClient, private graphEditorService: GraphEditorService, private importService: ImportService, private exportService: ExportService) {

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
    console.log('Show Internal Representation');
    console.log(Storage.components);
    console.log('Page UICDL');
    console.log(pageUICDL);

    this.exportService.postPageUICDL(Storage.pageUICDL).subscribe(
      response => console.log(response['body'])
    );
  }


  apply() {
    this.graphEditorService.applyLayout(this.layout_selected);
  }

  import() {
    this.importService.import();
  }

  save() {
    this.graphEditorService.syncMxCells();
    this.graphEditorService.syncStorage();
  }

  storeNDL() {
    this.exportService.postNDL().subscribe(
      response => console.log(response['body'])
    );
  }
}