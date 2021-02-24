import { Injectable } from "@angular/core";
import StyleEditorService from "./style-editor.service";
import { StyleConverter } from "../../shared/styleTable";
import { AppState } from "src/app/models/store/app.state";
import { Action, Store } from "@ngrx/store";
import { SelabEditor } from "src/app/models/externalRepresentation/selab-editor.model";
import { UIComponent } from "src/app/models/ui-component-dependency";
import { element } from "@angular/core/src/render3/instructions";
import { PageUICDL } from "src/app/models/internalRepresentation/pageUICDL.model";
import { SelabPageModel } from "./selab-page.model";
import { ERInsertGraphStorageAction } from "src/app/models/store/actions/externalRepresentation.action";
import { SelabGraph } from "src/app/models/externalRepresentation/selabGraph.model";
import { pageUICDLSelector } from "src/app/models/store/selectors/InternalRepresentationSelector";
import IRTransformer from "../internalRepresentation/IRTransformer.service";
import { MatDialog } from "@angular/material";
import { LayoutStrategy } from "src/app/models/externalRepresentation/component-strategy-dependency";
import { SelabGlobalStorage } from 'src/app/models/store/globalStorage'
import { Configuration } from "./util/configuration";
import { IRSyncWithERAction } from "src/app/models/store/actions/internalRepresentation.action";

@Injectable({
  providedIn: "root"
})
export default class GraphEditorService {
  selectedUIComponent: UIComponent;
  editor: SelabEditor;
  selectedPageId: string;
  backgroundCells: {};
  pages: string[]; // store all page name
  inNavigation: boolean;
  zoomFactor = 1;

  constructor(private styleEditorService: StyleEditorService,
    private store: Store<AppState>,
    private IRTransformerService: IRTransformer,
    private dialog: MatDialog
  ) {
    this.inNavigation = false;
    setTimeout(() => {
      let element = document.getElementById('graph-container');
      this.editor = new SelabEditor(element, store, this, dialog);
    }, 100);
  }

  getSelectedPageId(): string {
    return this.selectedPageId;
  }

  setSelectedPageId(pageId: string) {
    this.selectedPageId = pageId;
  }

  renderPage(pageId: string) {
    console.log('render page begin ...');
    let pagesObservable = this.store.select(pageUICDLSelector());
    let subscription = pagesObservable.subscribe((pageUICDLs) => {
      console.log('hey hey');
      console.log(pageUICDLs);
      let pageUICDL = pageUICDLs[pageId];
      // let uiComponentList = this.IRTransformerService.transform(pageUICDL, this.getGraph());
      let uiComponentList = pageUICDL['body']['componentList'];
      if (pageUICDL.layout.length > 0)
        this.applyLayout(pageUICDL.layout);

      uiComponentList.forEach((uiComponent) => {
        console.log('TTT')
        this.bindComponent(uiComponent, uiComponent.geometry);
      })
    })
    subscription.unsubscribe();
    console.log('render page end ...');
  }

  changePage2(sourcePageId: string, targetPageId: string) {
    this.syncStorage();
    this.clearGraphEditor();
    this.renderPage(targetPageId);
    this.setSelectedPageId(targetPageId);
  }


  changePage(sourcePageId: string, targetPageId: string) {
    if (this.inNavigation == true) {
      this.clearGraphEditor();
      Configuration.removeConnectionHandlerListener(this.getGraph());
      this.inNavigation = false;
      this.zoomFactor = 1
      this.zoomTo(this.zoomFactor);
    }

    let active = true;
    console.log('change page');
    this.syncStorage();
    this.selectedPageId = targetPageId;
    this.clearGraphEditor();
    let pageUICDLs = this.store.select(pageUICDLSelector());
    let subscribtion = pageUICDLs.subscribe((data) => {
      if (active == false)
        return;
      let targetPageUICDL = data[targetPageId];
      let uiComponentList = this.IRTransformerService.transform(targetPageUICDL, this.getGraph());
      console.log(uiComponentList)
      if (data[targetPageId].layout.length > 0)
        this.applyLayout(data[targetPageId].layout)
      uiComponentList.forEach(
        uiComponent => {
          this.bindComponent(uiComponent, uiComponent.geometry);
        }
      )
      active = false;
    })
    subscribtion.unsubscribe();
  }

  clearGraphEditor() {
    this.getGraphModel().beginUpdate();
    this.getGraph().removeCells(this.getGraph().getChildVertices(this.getGraph().getDefaultParent()));
    this.getGraphModel().endUpdate();
    this.getGraph().refresh();
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

  bindComponent(component, geometry?, xOffset?, yOffset?) {
    const parent = this.editor.getGraph().getDefaultParent();
    if (geometry == undefined) {
      this.editor.createComponent(component, parent);
    } else {
      this.editor.createComponent(component, parent, geometry, true);
    }
  }

  setLayout(layout: string) {
    this.editor.setLayout(layout);
  }

  applyLayout(layout: string, xOffset?, yOffset?) {
    if (xOffset != undefined && yOffset != undefined)
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

  getMaxVertexID() {
    // return this.getGraphStorage().getMaxID();
  }

  zoomTo(zoomFactor: any) {
    let graph = this.getGraph();
    graph.zoomTo(zoomFactor, graph.centerZoom);
  }

  zoomIn() {
    this.zoomFactor = this.zoomFactor * 1.11;
    this.getGraph().zoomFactor = this.zoomFactor;
    this.zoomTo(this.zoomFactor);
  }

  zoomOut() {
    this.zoomFactor = this.zoomFactor * 0.9;
    this.getGraph().zoomFactor = this.zoomFactor;
    this.zoomTo(this.zoomFactor);
  }

  navigation() {
    console.log(this.inNavigation)
    if (this.inNavigation == true)
      return;
    this.inNavigation = true;
    Configuration.configConnectionHadlerListener(this.getGraph(), this.dialog);
    this.syncStorage();
    this.clearGraphEditor();
    this.selectedPageId = "navigation";
    let pageUICDLs = this.store.select(pageUICDLSelector());
    let subscribtion = pageUICDLs.subscribe((pages) => {
      let keys = Object.keys(pages);
      console.log("call navigation?")
      let xOffset = 0;
      let yOffset = 0;
      for (let index = 0; index < keys.length; index++) {
        let key = keys[index];
        let page = pages[key];
        console.log(page);
        if (page['layout'].length > 0) {
          // this.applyLayout(page['layout'], xOffset, yOffset);
          let layoutStrategy = new LayoutStrategy("graph-container", new mxGeometry(0, 0, 0, 0)).setOffset(xOffset, yOffset);
          layoutStrategy.createLayoutComponent(this.editor, page);
        }
        let uiComponentList = this.IRTransformerService.transform(page, this.editor.getGraph());
        // this.applyLayout("prime")
        uiComponentList.forEach(
          uiComponent => {
            let copyComponent = {};
            copyComponent = JSON.parse(JSON.stringify(uiComponent));
            copyComponent["geometry"]["x"] = copyComponent["geometry"]["x"] + xOffset;
            this.bindComponent(copyComponent, copyComponent['geometry']);
          }
        )
        let offset = document.getElementById('graph-container').offsetWidth;
        xOffset = xOffset + offset;
      }


      let ndl = SelabGlobalStorage.ndl;
      console.log(this.getGraphModel())
      let cells = Object.values(this.getGraphModel().cells);
      console.log(cells)
      console.log(ndl)
      if (ndl && ndl["children"] != null) {

        ndl["children"].forEach(
          pageNdl => {
            // console.log(pageNdl)
            pageNdl["edges"].forEach(
              edgeInfo => {

                let source = edgeInfo["source"]
                let targetPageId = ((Object.values(pages)).find(page => page["name"] == edgeInfo["target"]))["id"]
                let parameter = edgeInfo["passingParameter"]

                let sourceCell = cells.find(cell => cell["selector"] == source)
                let targetCell = cells.find(cell =>
                  cell["pageId"] == targetPageId && cell["componentPart"] == "box" && cell["type"] == "layout"
                )

                console.log(sourceCell)
                console.log(targetCell)
                let size = 12 / this.getGraph().zoomFactor;
                let x = sourceCell.geometry.width - size / 2;
                let y = sourceCell.geometry.height / 2 - size / 2;
                let style = "shape=ellipse;rounded=0;strokeColor=#2b9cff;fillColor=#FFFFFF;strokeWidth=4"
                let toolTipVertex = this.getGraph().insertVertex(sourceCell, "", "", x, y, size, size, style, false);
                toolTipVertex["connectToolTip"] = true;
                style = "strokeColor=#2b9cff;strokeWidth=6;edgeStyle=orthogonalEdgeStyle;curved=1;rounded=0;orthogonalLoop=1;"
                let edge = this.getGraph().insertEdge(toolTipVertex, "", "", toolTipVertex, targetCell, style)
                edge.value = parameter;
              }
            )
          }
        )

      }
    })
    subscribtion.unsubscribe();


    this.getGraph().refresh();
    for (let index = 0; index < 5; index++)
      this.zoomOut();
  }

}
