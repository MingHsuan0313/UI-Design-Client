import { ICreateComponentStrategy } from "./ICreateComponentStrategy";
import { StyleLibrary } from "../../../shared/styleLibrary";
import { DataBinding } from "../util/DataBinding";
import { GraphStorage , VertexStorage , StyleStorage } from "../../graph-dependency";
import { Storage } from '../../../shared/storage';
import { LayoutComponent } from "../../internalRepresentation/LayoutComponent.model";

export class LayoutStrategy implements ICreateComponentStrategy {
  basex: number;
  basey: number;
  graphNode: HTMLElement;
  defaultWidth: number;
  defaultHeight: number;
  layout: VertexStorage;

  constructor(basex?, basey?) {
    this.graphNode = document.getElementById('graphContainer0');
    this.defaultWidth = this.graphNode.offsetWidth;
    this.defaultHeight = this.graphNode.offsetHeight;
    // basic component
    if (basex == undefined || basey == undefined) {
      this.basex = 0;
      this.basey = 0;
    } else {
      this.basex = basex;
      this.basey = basey;
    }
  }
  
  createLayout(graphStorage: GraphStorage,bodyComponent: LayoutComponent) {
    let parent = graphStorage.getGraph().getDefaultParent();
    let style = StyleLibrary[0]['Layout1'];
    let styleName = 'Layout1';
    let styleStorage = new StyleStorage(styleName, style);
    const layoutGeometry = new mxGeometry(0, 0, this.defaultWidth, this.defaultHeight);
    this.layout = graphStorage.insertVertex(parent, null, "", layoutGeometry, styleStorage, bodyComponent);

    this.layout.setIsPrimary(false);
    this.layout.vertex["componentPart"] = "box";
    this.layout.vertex["dataBinding"] = this.createDataBinding("box");
    this.layout.vertex["isPrimary"] = false;
  }
  
  createHeader(graphStorage: GraphStorage, headerComponent: LayoutComponent) {
    let style = StyleLibrary[0]['Layout1Header'];
    let styleName = "Layout1Header";
    let styleStorage = new StyleStorage(styleName, style);
    const layoutHeaderGeometry = new mxGeometry(0, 0, this.defaultWidth, this.defaultHeight / 15);
    const header = graphStorage.insertVertex(this.layout.getVertex(), null, "", layoutHeaderGeometry, styleStorage,headerComponent);

    header.vertex["componentPart"] = "header";
    header.vertex["dataBinding"] = this.createDataBinding("header");
    header.vertex["isPrimary"] = true;
    header.isPrimary = true;
  }
  
  createBody(graphStorage: GraphStorage, bodyComponent: LayoutComponent) {
    let style = StyleLibrary[0]['Layout1Body'];
    let styleName = "Layout1Body";
    let styleStorage = new StyleStorage(styleName, style);
    const layoutBodyGeometry = new mxGeometry(this.defaultWidth / 7, this.defaultHeight / 15, this.defaultWidth * 5 / 7, this.defaultHeight * 13 / 15);
    const body = graphStorage.insertVertex(this.layout.getVertex(), null,"", layoutBodyGeometry, styleStorage,bodyComponent);
    body.vertex["componentPart"] = "body";
    body.vertex["dataBinding"] = this.createDataBinding("body");
    body.vertex["isPrimary"] = true; 
    body.isPrimary = true;
  }
  
  createSideBar(graphStorage: GraphStorage, sidebarComponent: LayoutComponent) {
    let style = StyleLibrary[0]['Layout1Sidebar'];
    let styleName = "Layout1Sidebar";
    let styleStorage = new StyleStorage(styleName, style);
    const layoutSidebarGeometry = new mxGeometry(0, this.defaultHeight / 15, this.defaultWidth / 7, this.defaultHeight * 14 / 15);
    const siderbar = graphStorage.insertVertex(this.layout.getVertex(), null, "", layoutSidebarGeometry, styleStorage, sidebarComponent);
    siderbar.vertex["componentPart"] = "siderbar";
    siderbar.vertex["dataBinding"] = this.createDataBinding("siderbar");
    siderbar.vertex["isPrimary"] = true; 
    siderbar.isPrimary = true;
  }
  
  createAsideBar(graphStorage: GraphStorage, asidebarComponent: LayoutComponent) {
    let style = StyleLibrary[0]['Layout1Asidebar'];
    let styleName = "Layout1Asidebar";
    let styleStorage = new StyleStorage(styleName, style);
    const layoutAsidebarGeometry = new mxGeometry(this.defaultWidth * 6 / 7, this.defaultHeight / 15, this.defaultWidth / 7, this.defaultHeight * 14 / 15);
    const asidebar = graphStorage.insertVertex(this.layout.getVertex(), null, "", layoutAsidebarGeometry, styleStorage,asidebarComponent);
    asidebar.vertex["componentPart"] = "asidebar";
    asidebar.vertex["dataBinding"] = this.createDataBinding("asidebar");
    asidebar.vertex["isPrimary"] = true; 
    asidebar.isPrimary = true;
  }
  
  createFooter(graphStorage: GraphStorage, footerComponent: LayoutComponent) {
    let style = StyleLibrary[0]['Layout1Footer'];
    let styleName = "Layout1Footer";
    let styleStorage = new StyleStorage(styleName, style);
    const layoutFooterGeometry = new mxGeometry(this.defaultWidth / 7, this.defaultHeight * 14 / 15, this.defaultWidth * 5 / 7, this.defaultHeight * 1 / 15);
    const footer = graphStorage.insertVertex(this.layout.getVertex(), null, "", layoutFooterGeometry, styleStorage, footerComponent);
    footer.vertex["componentPart"] = "footer";
    footer.vertex["dataBinding"] = this.createDataBinding("footer");
    footer.vertex["isPrimary"] = true
    footer.isPrimary = true;
  }

  createComponent(graphStorage: GraphStorage) {
    
    let pageUICDL = Storage.pageUICDL;
    let bodyComponent = pageUICDL.getBody();
    let headerComponent = pageUICDL.getHeader();
    let sidebarComponent = pageUICDL.getSidebar();
    let footerComponent = pageUICDL.getFooter();
    let asidebarComponent = pageUICDL.getAsidebar();

    this.createLayout(graphStorage,bodyComponent);
    this.createHeader(graphStorage,headerComponent);
    this.createFooter(graphStorage,footerComponent);
    this.createSideBar(graphStorage,sidebarComponent);
    this.createBody(graphStorage,bodyComponent);
    this.createAsideBar(graphStorage,asidebarComponent);
  }

  createDataBinding(part: String, index?){
    return new DataBinding(false, part, -1);
  }
}

