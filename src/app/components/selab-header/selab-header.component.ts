
import {Component, Input, OnInit} from '@angular/core';

import {
  Router,
  NavigationEnd,
  ActivatedRoute,
  RouteConfigLoadEnd
} from '@angular/router';
import {Storage} from '../../shared/storage';
import {Layout, TextComponent} from '../../models/ui-component-dependency';
import {PropertyGenerator} from '../../shared/property-generator';
import GraphEditorService from '../../services/externalRepresentation/graph-editor.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import ImportService from '../../services/internalRepresentation/import.service';
import ExportService from '../../services/internalRepresentation/export.service';

@Component({
  selector: 'selab-header',
  templateUrl: './selab-header.component.html',
  styleUrls: ['./selab-header.component.scss']
})
export class SelabHeaderComponent implements OnInit {
  public navItems = null;
  public sidebarMinimized = true;
  private changes: MutationObserver;
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
  private files: any[];
  public userName = 'undefined';
  private images: any[] = [];


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
    // selector is now meaningless
    // this.layoutComponent = new Layout({id: PropertyGenerator.getID(this.graphEditorService.getMaxVertexID()), selector: this.layout_selected, type: 'layout'});
    // Storage.setLayoutComponent(this.layoutComponent);
    // this.graphEditorService.bindComponent(this.layoutComponent);
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

  openForm(s) {
    console.log("open form 1")
    document.getElementById('myForm').style.display = 'block';
  }

  closeForm() {
    document.getElementById('myForm').style.display = 'none';
  }

  openForm2() {
    console.log("open form 2")
    document.getElementById('navigationForm').style.display = 'block';
  }

  import() {
    this.importService.import();
  }

  showFiles() {
    this.files = this.importService.pages;
  }

  save() {
    this.graphEditorService.syncMxCells();
    this.graphEditorService.syncStorage();
  }

  closeForm2() {
    document.getElementById('navigationForm').style.display = 'none';
  }

  insertEdge(sf) {
    const graphStorage = this.graphEditorService.getGraphStorage();
    const graph = graphStorage.getGraph();
    const parent = graph.getDefaultParent();
    const graphNode = document.getElementById('graphContainer0');
    const defaultWidth = graphNode.offsetWidth;
    const defaultHeight = graphNode.offsetHeight;
    let style = new Object();
    style[mxConstants.STYLE_ROUNDED] = true;
    style[mxConstants.STYLE_FONTSIZE] = 20;
    graph.getStylesheet().putCellStyle('rounded', style);
    let v1 = graphStorage.findVertex(sf['value']['source']);
    let srcStyle = this.findImageStyle(sf['value']['source']);
    let tarStyle = this.findImageStyle(sf['value']['target']);
    if (v1 == null) {
      v1 = graph.insertVertex(parent, null, "", defaultWidth / 2 - 400, defaultHeight / 2, 150, 90, srcStyle, '');
    }
    let v2 = graph.insertVertex(parent, null, "", defaultWidth / 2, defaultHeight / 2, 150, 90, tarStyle, '');
    graphStorage.insertEdge(v1, v2);
    document.getElementById('navigationForm').style.display = 'none';
  }

  storeNDL() {
    this.exportService.postNDL().subscribe(
      response => console.log(response['body'])
    );
  }

  showImage() {
    this.images = Storage.images;

  }

  findImageStyle(page) {
    for (let i = 0; i < this.images.length; i++) {
      if (this.images[i]['page'] == page) {

        var style = {};

        style = mxUtils.clone(style); 
        style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_LABEL;

        style[mxConstants.STYLE_STROKECOLOR] = '#ffffff';

        style[mxConstants.STYLE_FONTCOLOR] = '#2422a0';

        style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;

        style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_BOTTOM;

        style[mxConstants.STYLE_FONTSIZE] = 30;

        style[mxConstants.STYLE_IMAGE_ALIGN] = mxConstants.ALIGN_CENTER;

        style[mxConstants.STYLE_IMAGE_VERTICAL_ALIGN] = mxConstants.ALIGN_CENTER;

        //style[mxConstants.STYLE_IMAGE] = 'images/icons48/gear.png';
        style[mxConstants.STYLE_IMAGE] = Storage.images[i]['img'];

        style[mxConstants.STYLE_IMAGE_WIDTH] = 300;

        style[mxConstants.STYLE_IMAGE_HEIGHT] = 200;

        style[mxConstants.STYLE_SPACING_TOP] = 30;

        style[mxConstants.STYLE_SPACING] = 10;

        style[mxConstants.STYLE_FILLCOLOR] = '#ffffff';
        this.graphEditorService.selectedGraphStorage.getGraph().getStylesheet().putCellStyle('style' + i.toString(), style);
        return 'style' + i.toString();
      }
    }
  }
}