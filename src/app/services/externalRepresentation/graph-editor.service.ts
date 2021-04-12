import { Injectable } from "@angular/core";
import StyleEditorService from "./style-editor.service";
import { StyleConverter } from "../../shared/styleTable";
import { AppState } from "src/app/models/store/app.state";
import { Store } from "@ngrx/store";
import { SelabEditor } from "src/app/models/externalRepresentation/selab-editor.model";
import { UIComponent } from "src/app/models/ui-component-dependency";
import { pageUICDLSelector, themeSelector, NDLSelector } from "src/app/models/store/selectors/InternalRepresentationSelector";
import IRTransformer from "../internalRepresentation/IRTransformer.service";
import { MatDialog } from "@angular/material";
import { LayoutStrategy } from "src/app/models/externalRepresentation/component-strategy-dependency";
import { SelabGlobalStorage } from 'src/app/models/store/globalStorage'
import { Configuration } from "./util/configuration";
import { IRInsertPageImageAction, IRInsertPageUICDLAction, IRSyncWithERAction, IRInsertNDLPageAction } from "src/app/models/store/actions/internalRepresentation.action";
import SaveServie from "../internalRepresentation/save.service";
import NavigationService from "../navigation/navigation.service";


@Injectable({
  providedIn: "root"
})
export default class GraphEditorService {
  selectedUIComponent: UIComponent;
  editor: SelabEditor;
  inNavigation: string;  // None, theme, themes
  zoomFactor = 1;

  selectedPageId: string;
  selectedThemeIndex: number;

  backgroundCells: {};

  constructor(private styleEditorService: StyleEditorService,
    private store: Store<AppState>,
    private IRTransformerService: IRTransformer,
    private dialog: MatDialog,
    private saveService: SaveServie,
  ) {

  }

  initialService(){
    this.inNavigation = "None";
    setTimeout(() => {
      let element = document.getElementById('graph-container');
      this.editor = new SelabEditor(element, this.store, this, this.dialog);
    }, 100);
  }

  getSelectedPageId(): string {
    return this.selectedPageId;
  }

  setSelectedPageId(pageId: string) {
    this.selectedPageId = pageId;
  }

  getSelectedThemeIndex(): number {
    return this.selectedThemeIndex;
  }

  setSelectedThemeIndex(index: number) {
    this.selectedThemeIndex = index;
  }

  renderPage(pageId: string) {
    let pagesObservable = this.store.select(pageUICDLSelector());
    let subscription = pagesObservable.subscribe((pageUICDLs) => {
      let pageUICDL = pageUICDLs[pageId];
      let uiComponentList = this.IRTransformerService.transform(pageUICDL, this.getGraph());
      if (pageUICDL.layout.length > 0)
        this.applyLayout(pageUICDL.layout);
      uiComponentList.forEach((uiComponent) => {
        this.bindComponent(uiComponent, uiComponent.geometry);
      })
    })
    subscription.unsubscribe();
  }

  changePage(sourcePageId: string, targetPageId: string) {
    if (this.inNavigation != "None") {
      this.clearGraphEditor();
      Configuration.removeConnectionHandlerListener(this.getGraph());
      this.inNavigation = "None";
      this.zoomFactor = 1;
      this.zoomTo(this.zoomFactor);
    }

    this.syncStorage();
    this.clearGraphEditor();
    this.setSelectedPageId(targetPageId);
    this.renderPage(targetPageId);
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
    let subscription = this.store.select(themeSelector())
      .subscribe((themes) => {
        if (xOffset != undefined && yOffset != undefined)
          this.editor.applyLayout(layout, themes, xOffset, yOffset);
        else
          this.editor.applyLayout(layout, themes);
      })
    subscription.unsubscribe();
  }

  syncStorage() {
    let model = this.getGraphModel().cells;
    let cells = this.generateGraphModel(model);
    this.store.dispatch(new IRSyncWithERAction(this.selectedPageId, cells as any))
    this.savePageImg();
  }

  savePageImg() {
    let changedPageId = this.selectedPageId;
    this.saveService.getImageFromModel(this.editor.getGraphModel()).subscribe(
      response => {
        let image = 'data:image/png;base64,' + response['body'];
        this.store.dispatch(new IRInsertPageImageAction(changedPageId, image))
      }
    );
  }

  navigation(flag) {
    console.log(this.inNavigation)
    this.selectedPageId = "navigation";
    if (this.inNavigation == flag)
      return;
    if (this.inNavigation == "None") {
      Configuration.configConnectionHadlerListener(this.getGraph(), this.dialog);
    }
    this.inNavigation = flag;
    this.syncStorage();
    this.clearGraphEditor();
    let pageInfo = this.renderAllPages(flag);
    this.recoverNavigationEdges(flag, pageInfo);
    this.getGraph().refresh();
    this.zoomTo(0.4);
  }

  uploadPageUICDL(pageUICDL) {
    let themeId;
    let subscription = this.store.select(themeSelector()).subscribe(themes => themeId = themes[this.selectedThemeIndex].id)
    pageUICDL["themeId"] = themeId
    this.store.dispatch(new IRInsertPageUICDLAction(this.selectedThemeIndex, pageUICDL, false));
    this.store.dispatch(new IRInsertNDLPageAction(pageUICDL))
    subscription.unsubscribe();
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

  renderAllPages(flag) {

    let subscribtion;
    let pagesIDInTheme = [];
    let pagesNameinTheme = []
    let pageUICDLs;
    if (flag == "theme") {
      subscribtion = this.store.select(themeSelector()).subscribe((themes) => {
        themes[this.selectedThemeIndex].pages.forEach(
          page => {
            pagesIDInTheme.push(page.id)
            pagesNameinTheme.push(page.name)
          })
      })
      subscribtion.unsubscribe();
    }

    subscribtion = this.store.select(pageUICDLSelector()).subscribe(
      (pages) => {
        pageUICDLs = pages
        let keys = Object.keys(pages);
        let xOffset = 0;
        let yOffset = 0;
        for (let index = 0; index < keys.length; index++) {
          let key = keys[index];
          let page = pages[key];
          if (flag == "themes" || flag == "theme" && pagesIDInTheme.includes(key)) {
            if (page['layout'].length > 0) {
              let layoutStrategy = new LayoutStrategy("graph-container", new mxGeometry(0, 0, 0, 0)).setOffset(xOffset, yOffset);
              layoutStrategy.createLayoutComponent(this.editor, page, []);
            }
            let uiComponentList = this.IRTransformerService.transform(page, this.editor.getGraph());
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
        }
      })
    subscribtion.unsubscribe();
    return {
      "pages": pageUICDLs,
      "pagesNameInTheme": pagesNameinTheme
    }
  }

  recoverNavigationEdges(flag, pageInfo) {
    let pagesNameInTheme = pageInfo["pagesNameInTheme"]
    let pages = pageInfo["pages"]
    let ndl;
    let subscribtion = this.store.select(NDLSelector()).subscribe(
      navigationDL => ndl = navigationDL
    )
    subscribtion.unsubscribe();
    let cells = Object.values(this.getGraphModel().cells);
    if (ndl != null) {
      let keys = Object.keys(ndl)
      for (let key of keys) {
        let pageNdl = ndl[key]
        let pageName = pageNdl["component"]
        if (flag == "themes" || flag == "theme" && pagesNameInTheme.includes(pageName)) {
          for (let componentSelector in pageNdl["edges"]) {
            let targetInfo = pageNdl["edges"][componentSelector]
            let parameter = targetInfo["parameter"]
            let targetPageId = ((Object.values(pages)).find(page => page["name"] == targetInfo["target"]))["id"]
            let sourceCell = cells.find(cell => cell["selector"] == componentSelector)
            let targetCell = cells.find(cell =>
              cell["pageId"] == targetPageId && cell["componentPart"] == "box" && cell["type"] == "layout"
            )
            this.renderEdge(sourceCell, targetCell, parameter)
          }
        }
      }
    }
  }

  renderEdge(sourceCell, targetCell, parameter) {
    let size = 12 / this.getGraph().zoomFactor;
    let x = sourceCell['geometry'].width - size / 2;
    let y = sourceCell['geometry'].height / 2 - size / 2;
    let style = "shape=ellipse;rounded=0;strokeColor=#2b9cff;fillColor=#FFFFFF;strokeWidth=4"
    let toolTipVertex = this.getGraph().insertVertex(sourceCell, "", "", x, y, size, size, style, false);
    toolTipVertex["connectToolTip"] = true;
    style = "strokeColor=#2b9cff;strokeWidth=6;edgeStyle=orthogonalEdgeStyle;curved=1;rounded=0;orthogonalLoop=1;"
    let edge = this.getGraph().insertEdge(toolTipVertex, "", "", toolTipVertex, targetCell, style)
    edge.value = parameter;
  }

  generateGraphModel(model) {
    let cells = [];
    for (let key in model) {
      if (model[key].componentID == undefined) {
        continue;
      }

      let cell = {
        geometry: {},
        style: model[key].style,
        value: model[key].value,
        componentID: model[key].componentID,
        isPrimary: model[key].isPrimary,
        dataBinding: model[key].dataBinding
      }

      if (model[key].geometry != undefined) {
        cell["geometry"]["x"] = model[key].geometry.x;
        cell["geometry"]["y"] = model[key].geometry.y;
        cell["geometry"]["width"] = model[key].geometry.width;
        cell["geometry"]["height"] = model[key].geometry.height;
        let styleObj = StyleEditorService.convertStyleDescriptionToJsobObject(model[key].style);
        let styleConverter = new StyleConverter();
        styleObj = styleConverter.convertObject(styleObj);
        cell["style"] = styleObj;
      }
      cells.push(cell);
    }
    return cells;
  }
}