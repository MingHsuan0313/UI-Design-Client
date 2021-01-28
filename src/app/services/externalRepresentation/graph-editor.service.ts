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

@Injectable({
  providedIn: "root"
})
export default class GraphEditorService {
  editors: Map<string, SelabEditor>;
  // selectedEditor: SelabEditor;
  selectedUIComponent: UIComponent;
  editor: SelabEditor;
  pageStorage: SelabPageModel[];
  selectedPageId: string;
  backgroundCells: {};

  constructor(private styleEditorService: StyleEditorService,
    private store: Store<AppState>
  ) {
    setTimeout(() => {
      this.selectedUIComponent = undefined;
      let element = document.getElementById('graph-container');
      this.editor = new SelabEditor(element, this.store, this);
      this.backgroundCells = this.getGraphModel().cells;
      this.pageStorage = []
      this.createPage();
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

  createPage() {
    console.log('create page')
    let uuid = require('uuid');
    let pageId = `${this.editor.id}-${uuid.v1()}`;
    let newPage = new PageUICDL(pageId); // internalRepresentation
    let selabPage = new SelabPageModel(pageId);
    this.pageStorage.push(selabPage);
    if(this.pageStorage.length == 0) {
      newPage.isMain = true
      this.selectedPageId = pageId;
    }
    else
      newPage.isMain = false
    this.store.dispatch(new IRInsertPageUICDLAction(newPage));
    this.store.dispatch(new IRRenamePageAction(pageId, 'newpage'));
    this.store.dispatch(new ERInsertGraphStorageAction(new SelabGraph(pageId)))
    // this.changePage(this.selectedPageId, pageId);
  }

  deletePage(pageId: string) {

  }

  changePage(sourcePageId: string, targetPageId: string) {
    console.log('change page');
    let sourcePage = this.searchPage(sourcePageId);
    let targetPage = this.searchPage(targetPageId);
    // first page
    if (sourcePageId == null)  {
      this.selectedPageId = targetPageId;
      return;
    }
    console.log(sourcePage.loadPage());
    console.log(targetPage.loadPage());
    sourcePage.savePage(this.getGraphModel());
    let targetCells = targetPage.loadPage();
    if(targetCells[0] == undefined) {
      targetCells[0] = this.backgroundCells[0];
      targetCells[1] = this.backgroundCells[1];
    }
    this.setGraphModel(targetCells);
    this.selectedPageId = targetPageId;
  }

  clearGraphModel() {
    let mxCells = this.getGraphModel().cells;
    console.log('ready to delte')
    console.log(mxCells)
    
    this.getGraph().cellsRemoved(mxCells);
  }

  setGraphModel(cells) {
    console.log("clear graph")
    this.getGraph().getModel().beginUpdate();
    // this.getGraphModel().clear();
    this.getGraph().removeCells(this.getGraph().getChildVertices(this.getGraph().getDefaultParent()));
    // this.editor.editor.graph.model = {};
    this.getGraph().getModel().endUpdate();
    this.getGraph().refresh();
    // console.log('current cell')
    // console.log(cells)
    // console.log('target cell')
    // console.log(this.getGraphModel().cells);

    console.log('cell ready to add')
    console.log(cells)
    this.getGraph().getModel().beginUpdate();
    for(let key in cells) {
      // console.log(cells[key]);
      this.getGraph().addCell(cells[key],cells[key].parent,cells[key].id, undefined, undefined);
    }

    this.getGraph().getModel().endUpdate();
    this.getGraph().refresh();
    // this.getGraph().getModel().endUpdate();
    // this.getGraph().refresh();
    // console.log("reset graph");
    // // this.getGraphModel().cells = cells;
  }

  searchPage(pageId: string) {
    for(let index = 0;index < this.pageStorage.length; index++) {
      if(this.pageStorage[index].pageId == pageId) {
        return this.pageStorage[index];
      }
    }
    return null;
  }

  setSelectedPage(pageId: string) {
    this.selectedPageId = pageId;
  }

  // setSelectedEditor(editorID: string) {
  //   this.selectedEditor = this.editors.get(editorID);
  // }

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

  bindComponent(component, geometry?) {
    const parent = this.editor.getGraph().getDefaultParent();
    if (geometry == undefined) {
      // const parent = this.selectedGraphStorage.getGraph().getDefaultParent();
      // this.selectedGraphStorage.createComponent(component, parent);
      this.editor.createComponent(component, parent);
    } else {
      this.editor.createComponent(component, parent, geometry, true);
    }


  }

  applyLayout(layout: string) {
    this.editor.applyLayout(layout);
    // this.selectedGraphStorage.applyLayout(layout);
  }

  syncStorage() {
    // for(let editor in this.editors)
    // this.editors.forEach((selabEditor, key) => {
    //   let model = selabEditor.getGraphModel().cells;
    //   let cells = this.generateGraphModel(model);
    //   this.store.dispatch(new IRSyncWithERAction(key, cells as any))
    //   selabEditor.editor.modified = false;
    // })
    // this.selectedGraphStorage.syncStyle(this.styleEditorService);
    // this.selectedGraphStorage.syncStorage();
  }

  generateGraphModel(model) {
    let cells = [];
    console.log("start generating");
    console.log(model)
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
