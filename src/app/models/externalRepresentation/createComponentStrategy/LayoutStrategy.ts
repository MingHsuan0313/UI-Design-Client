import { ICreateComponentStrategy } from "./ICreateComponentStrategy";
import { StyleLibrary } from "../../../shared/styleLibrary";
import { DataBinding } from "../util/DataBinding";
import { SelabEditor } from '../../externalRepresentation/selab-editor.model';
import { Storage } from '../../../shared/storage';
import { LayoutComponent } from "../../internalRepresentation/LayoutComponent.model";
import { SelabVertex } from "../../store/selabVertex.model";
import { PageUICDL } from "../../internalRepresentation/pageUICDL.model";

export class LayoutStrategy implements ICreateComponentStrategy {
  basex: number;
  basey: number;
  graphNode: HTMLElement;
  defaultWidth: number;
  defaultHeight: number;

  constructor(basex?, basey?) {
    this.graphNode = document.getElementById('graphContainer-0');
    this.defaultWidth = this.graphNode.offsetWidth - 25;
    this.defaultHeight = this.graphNode.offsetHeight - 15;
    // basic component
    if (basex == undefined || basey == undefined) {
      this.basex = 0;
      this.basey = 0;
    } else {
      this.basex = basex;
      this.basey = basey;
    }
  }
  
  createLayout(selabEditor: SelabEditor,bodyComponent: LayoutComponent) {
    let parent = selabEditor.getGraph().getDefaultParent();
    let style = StyleLibrary[0]['Layout1'];
    const layoutGeometry = new mxGeometry(0, 0, this.defaultWidth, this.defaultHeight);
    // this.layout = selabEditor.insertVertex(parent, null, "", layoutGeometry, styleStorage, bodyComponent);
    let id = (parseInt(bodyComponent.getId())).toString();
    let selabVertex = new SelabVertex()
      .setID(bodyComponent.getSelector() + "-" + id)
      .setUIComponentID(bodyComponent.getId())
      .setParentID(parent.id)
      .setIsPrimary(true);

    let layoutBodyCell = selabEditor.insertVertex(selabVertex, bodyComponent, layoutGeometry, style);
    layoutBodyCell["componentPart"] = "box";
    layoutBodyCell["dataBinding"] = this.createDataBinding("box");
    layoutBodyCell["isPrimary"] = false;
  }
  
  createHeader(selabEditor: SelabEditor, headerComponent: LayoutComponent) {
    let parent = selabEditor.getGraph().getDefaultParent();
    let style = StyleLibrary[0]['Layout1Header'];
    const layoutHeaderGeometry = new mxGeometry(0, 0, this.defaultWidth, this.defaultHeight / 15);
    let id = (parseInt(headerComponent.getId())).toString();
    let selabVertex = new SelabVertex()
      .setID(headerComponent.getSelector() + "-" + id)
      .setUIComponentID(headerComponent.getId())
      .setParentID(parent.id)
      .setIsPrimary(true);

    let layoutHeaderCell = selabEditor.insertVertex(selabVertex, headerComponent, layoutHeaderGeometry, style);
    layoutHeaderCell["componentPart"] = "header";
    layoutHeaderCell["dataBinding"] = this.createDataBinding("header");
    layoutHeaderCell["isPrimary"] = true;
  }
  
  createBody(selabEditor: SelabEditor, bodyComponent: LayoutComponent) {
    let parent = selabEditor.getGraph().getDefaultParent();
    let style = StyleLibrary[0]['Layout1Body'];
    const layoutBodyGeometry = new mxGeometry(this.defaultWidth / 7, this.defaultHeight / 15, this.defaultWidth * 5 / 7, this.defaultHeight * 13 / 15);
    let id = (parseInt(bodyComponent.getId())).toString();
    let selabVertex = new SelabVertex()
      .setID(bodyComponent.getSelector() + "-" + id)
      .setUIComponentID(bodyComponent.getId())
      .setParentID(parent.id)
      .setIsPrimary(true);
    let layoutBodyCell = selabEditor.insertVertex(selabVertex, bodyComponent, layoutBodyGeometry, style);
    layoutBodyCell["componentPart"] = "body";
    layoutBodyCell["dataBinding"] = this.createDataBinding("body");
    layoutBodyCell["isPrimary"] = true; 
  }
  
  createSideBar(selabEditor: SelabEditor, sidebarComponent: LayoutComponent) {
    let parent = selabEditor.getGraph().getDefaultParent();
    let style = StyleLibrary[0]['Layout1Sidebar'];
    const layoutSidebarGeometry = new mxGeometry(0, this.defaultHeight / 15, this.defaultWidth / 7, this.defaultHeight * 14 / 15);
    let id = (parseInt(sidebarComponent.getId())).toString();
    let selabVertex = new SelabVertex()
      .setID(sidebarComponent.getSelector() + "-" + id)
      .setUIComponentID(sidebarComponent.getId())
      .setParentID(parent.id)
      .setIsPrimary(true);

    let layoutSiderbarCell = selabEditor.insertVertex(selabVertex, sidebarComponent, layoutSidebarGeometry, style);
    layoutSiderbarCell["componentPart"] = "siderbar";
    layoutSiderbarCell["dataBinding"] = this.createDataBinding("siderbar");
    layoutSiderbarCell["isPrimary"] = true; 
  }
  
  createAsideBar(selabEditor: SelabEditor, asidebarComponent: LayoutComponent) {
    let parent = selabEditor.getGraph().getDefaultParent();
    let style = StyleLibrary[0]['Layout1Asidebar'];
    const layoutAsidebarGeometry = new mxGeometry(this.defaultWidth * 6 / 7, this.defaultHeight / 15, this.defaultWidth / 7, this.defaultHeight * 14 / 15);
    let id = (parseInt(asidebarComponent.getId())).toString();
    let selabVertex = new SelabVertex()
      .setID(asidebarComponent.getSelector() + "-" + id)
      .setUIComponentID(asidebarComponent.getId())
      .setParentID(parent.id)
      .setIsPrimary(true);
    let layoutAsidebarCell = selabEditor.insertVertex(selabVertex, asidebarComponent, layoutAsidebarGeometry, style);

    layoutAsidebarCell["componentPart"] = "asidebar";
    layoutAsidebarCell["dataBinding"] = this.createDataBinding("asidebar");
    layoutAsidebarCell["isPrimary"] = true; 
  }
  
  createFooter(selabEditor: SelabEditor, footerComponent: LayoutComponent) {
    let parent = selabEditor.getGraph().getDefaultParent();
    let style = StyleLibrary[0]['Layout1Footer'];
    const layoutFooterGeometry = new mxGeometry(this.defaultWidth / 7, this.defaultHeight * 14 / 15, this.defaultWidth * 5 / 7, this.defaultHeight * 1 / 15);
    let id = (parseInt(footerComponent.getId())).toString();
    let selabVertex = new SelabVertex()
      .setID(footerComponent.getSelector() + "-" + id)
      .setUIComponentID(footerComponent.getId())
      .setParentID(parent.id)
      .setIsPrimary(true);

    let layoutFooterCell = selabEditor.insertVertex(selabVertex, footerComponent, layoutFooterGeometry, style);
    layoutFooterCell["componentPart"] = "footer";
    layoutFooterCell["dataBinding"] = this.createDataBinding("footer");
    layoutFooterCell["isPrimary"] = true
  }

  createLayoutComponent(selabEditor: SelabEditor,pageUICDL: PageUICDL) {
    let bodyComponent = pageUICDL.getBody();
    let headerComponent = pageUICDL.getHeader();
    let sidebarComponent = pageUICDL.getSidebar();
    let footerComponent = pageUICDL.getFooter();
    let asidebarComponent = pageUICDL.getAsidebar();

    this.createLayout(selabEditor,bodyComponent);
    this.createHeader(selabEditor,headerComponent);
    this.createFooter(selabEditor,footerComponent);
    this.createSideBar(selabEditor,sidebarComponent);
    this.createBody(selabEditor,bodyComponent);
    this.createAsideBar(selabEditor,asidebarComponent);
  }
  
  createComponent(selabEditor) {

  }

  createDataBinding(part: String, index?){
    return new DataBinding(false, part, -1);
  }
}

