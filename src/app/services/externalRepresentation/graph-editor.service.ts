import { Injectable } from "@angular/core";
import StyleEditorService from "./style-editor.service";
import { StyleConverter } from "../../shared/styleTable";
import { AppState } from "src/app/models/store/app.state";
import { Action, Store } from "@ngrx/store";
import { SelabEditor } from "src/app/models/externalRepresentation/selab-editor.model";
import { UIComponent } from "src/app/models/ui-component-dependency";
import { IRInsertPageUICDLAction, IRRenamePageAction, IRSyncWithERAction } from "src/app/models/store/actions/internalRepresentation.action";
import { element } from "@angular/core/src/render3/instructions";
import { PageUICDL } from "src/app/models/internalRepresentation/pageUICDL.model";
import { SelabPageModel } from "./selab-page.model";
import { ERInsertGraphStorageAction } from "src/app/models/store/actions/externalRepresentation.action";
import { SelabGraph } from "src/app/models/externalRepresentation/selabGraph.model";
import { pageUICDLSelector } from "src/app/models/store/selectors/InternalRepresentationSelector";
import IRTransformer from "../internalRepresentation/IRTransformer.service";
import { MatDialog } from "@angular/material";
import { LayoutStrategy } from "src/app/models/externalRepresentation/component-strategy-dependency";

@Injectable({
  providedIn: "root"
})
export default class GraphEditorService {
  editors: Map<string, SelabEditor>;
  // selectedEditor: SelabEditor;
  selectedUIComponent: UIComponent;
  editor: SelabEditor;
  selectedPageId: string;
  backgroundCells: {};
  pages: string[]; // store all page name
  inNavigation: boolean;


  constructor(private styleEditorService: StyleEditorService,
    private store: Store<AppState>,
    private IRTransformerService: IRTransformer,
    private dialog: MatDialog
  ) {
    this.inNavigation = false;
    setTimeout(() => {
      this.pages = [];
      this.selectedUIComponent = undefined;
      let element = document.getElementById('graph-container');
      this.editor = new SelabEditor(element, this.store, this, this.dialog);
      this.backgroundCells = this.getGraphModel().cells;
      let pageId = this.createPage("ImsMain", true);
      this.selectedPageId = pageId;
    }, 500)
  }


  isModified(graphID: string) {
    // if (this.editors == undefined)
    //   return false;
    // if (this.editors.get(graphID) != undefined)
    //   return this.editors.get(graphID).getEditor().modified.valueOf();
  }

  getSelectedGraphID(): string {
    return this.selectedPageId;
  }

  createPage(pageName, isMain) {
    console.log('create page')
    let uuid = require('uuid');
    let pageId = `${this.editor.id}-${uuid.v1()}`;
    let newPage = new PageUICDL(pageId); // internalRepresentation
    this.store.dispatch(new IRInsertPageUICDLAction(newPage, isMain));
    this.store.dispatch(new IRRenamePageAction(pageId, pageName));
    this.store.dispatch(new ERInsertGraphStorageAction(new SelabGraph(pageId)))
    return pageId;
  }

  deletePage(pageId: string) {

  }
 
  

  navigation() {
    console.log(this.inNavigation)
    if(this.inNavigation == true)
      return;
    this.inNavigation = true;
    this.syncStorage();
    this.clearGraphModel();
    this.selectedPageId = "navigation";
    let pageUICDLs = this.store.select(pageUICDLSelector());
    pageUICDLs.subscribe((pages) => {
      let keys = Object.keys(pages);

      let xOffset = 0;
      let yOffset = 0;
      for (let index = 0; index < keys.length; index++) {
        let key = keys[index];
        let page = pages[key];
        console.log(page);
        if(page['layout'].length > 0) {
          // this.applyLayout(page['layout'], xOffset, yOffset);
          let layoutStrategy = new LayoutStrategy("graph-container", new mxGeometry(0,0,0,0)).setOffset(xOffset, yOffset);
          layoutStrategy.createLayoutComponent(this.editor, page);
        }
        let uiComponentList = this.IRTransformerService.transform(page,this.editor.getGraph());
        // this.applyLayout("prime")
        uiComponentList.forEach(
          uiComponent => {
            let copyComponent = {};
            copyComponent = JSON.parse(JSON.stringify(uiComponent));
            copyComponent["geometry"]["x"] = copyComponent["geometry"]["x"] + xOffset;
            this.bindComponent(copyComponent , copyComponent['geometry']);
          }
        )
        let offset = document.getElementById('graph-container').offsetWidth;
        xOffset = xOffset + offset;
      }
    })
    this.getGraph().refresh();
    for(let index = 0;index < 5;index++)
      this.getGraph().zoomOut();
  }

  changePage(sourcePageId: string, targetPageId: string) {
    if(this.inNavigation == true) {
      this.clearGraphModel();
      this.inNavigation = false;
      for(let index = 0;index < 5;index++)
        this.getGraph().zoomIn();
    }

    let active = true;
    console.log('change page');
    this.syncStorage();
    this.selectedPageId = targetPageId;
    this.clearGraphModel();
    let pageUICDLs = this.store.select(pageUICDLSelector());
    pageUICDLs.subscribe((data) => {
      if (active == false)
        return;
      let targetPageUICDL = data[targetPageId];
      let uiComponentList = this.IRTransformerService.transform(targetPageUICDL, this.getGraph());
      if (data[targetPageId].layout.length > 0)
        this.applyLayout(data[targetPageId].layout)
      uiComponentList.forEach(
        uiComponent => {
          // console.log(uiComponent)
          this.bindComponent(uiComponent, uiComponent.geometry);
        }
      )
      active = false;
    })
  }

  clearGraphModel() {
    this.getGraphModel().beginUpdate();
    this.getGraph().removeCells(this.getGraph().getChildVertices(this.getGraph().getDefaultParent()));
    this.getGraph().getModel().endUpdate();
    this.getGraph().refresh();
  }

  setSelectedPage(pageId: string) {
    this.selectedPageId = pageId;
  }

  getGraph(): mxGraph {
    return this.editor.getGraph();
  }

  getGraphModel(): mxGraphModel {
    return this.editor.getGraphModel();
  }

  getGraphView(): mxGraphView {
    return this.editor.getGraphView();
  }

  zoomTo(zoomFactor: any) {
    let graph = this.getGraph();
    graph.zoomTo(zoomFactor, graph.centerZoom);
  }

  createGraph(element: HTMLElement) {
    // this.selectedGraphStorage = new GraphStorage(element, "graphContainer" + this.graphStorages.length.toString(),this.store);
    // this.graphStorages.push(this.selectedGraphStorage);
    // this.selectedGraphID = this.selectedGraphStorage.getID();
    // let pageID = "page" + this.selectedGraphID;
  }

  bindComponent(component, geometry?, xOffset?, yOffset?) {
    const parent = this.editor.getGraph().getDefaultParent();
    if (geometry == undefined) {
      // const parent = this.selectedGraphStorage.getGraph().getDefaultParent();
      // this.selectedGraphStorage.createComponent(component, parent);
      this.editor.createComponent(component, parent);
    } else {
      this.editor.createComponent(component, parent, geometry, true);
    }


  }

  applyLayout(layout: string, xOffset?, yOffset?) {
    if(xOffset != undefined && yOffset != undefined)
      this.editor.applyLayout(layout, xOffset, yOffset);
    else
      this.editor.applyLayout(layout);
  }

  syncStorage() {
    console.log('sync storage');
    let model = this.getGraphModel().cells;
    let cells = this.generateGraphModel(model);
    this.store.dispatch(new IRSyncWithERAction(this.selectedPageId, cells as any))
  }

  generateGraphModel(model) {
    let cells = [];
    console.log("start generating");
    // console.log(model)
    for (let key in model) {
      let cell = {
        geometry: {},
        style: model[key].style,
        value: model[key].value,
        componentID: model[key].componentID,
        isPrimary: model[key].isPrimary,
      }
      if (model[key].geometry != undefined) {
        cell["geometry"]["x"] = model[key].geometry.x;
        cell["geometry"]["y"] = model[key].geometry.y;
        cell["geometry"]["width"] = model[key].geometry.width;
        cell["geometry"]["height"] = model[key].geometry.height;
        let styleObj = this.styleEditorService.convertStyleDescriptionToJsobObject(model[key].style);
        let styleConverter = new StyleConverter();
        styleObj = styleConverter.convertObject(styleObj);
        cell["style"] = styleObj;
      }
      cells.push(cell);
    }
    return cells;
  }

  syncMxCells() {
    // this.selectedGraphStorage.syncMxCells();
  }

  addArrow() {

  }

  getMaxVertexID() {
    // return this.getGraphStorage().getMaxID();
  }
}
