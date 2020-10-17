import { ICreateComponentStrategy } from "./ICreateComponentStrategy";
import { StyleLibrary } from "../../../shared/styleLibrary";
import { DataBinding } from "../util/DataBinding";
import { GraphStorage , VertexStorage , StyleStorage } from "../../graph-dependency";
import { Storage } from '../../../shared/storage';

export class LayoutStrategy implements ICreateComponentStrategy {
  basex: number;
  basey: number;

  constructor(basex?, basey?) {
    // basic component
    if (basex == undefined || basey == undefined) {
      this.basex = 0;
      this.basey = 0;
    } else {
      this.basex = basex;
      this.basey = basey;
    }
  }

  createComponent(graphStorage: GraphStorage) {
    let parent = graphStorage.getGraph().getDefaultParent();
    const graphNode = document.getElementById('graphContainer0');
    const defaultWidth = graphNode.offsetWidth;
    const defaultHeight = graphNode.offsetHeight;
    
    let pageUICDL = Storage.pageUICDL;
    let bodyComponent = pageUICDL.getBody();
    let headerComponent = pageUICDL.getHeader();
    let sidebarComponent = pageUICDL.getSidebar();
    let footerComponent = pageUICDL.getFooter();
    let asidebarComponent = pageUICDL.getAsidebar();


    let style = StyleLibrary[0]['Layout1'];
    let styleName = 'Layout1';
    let styleStorage = new StyleStorage(styleName, style);
    const layoutGeometry = new mxGeometry(0, 0, defaultWidth, defaultHeight);
    graphStorage.getGraph().getStylesheet().putCellStyle(styleName, style);
    const layout = graphStorage.insertVertex(parent, null, "", layoutGeometry, styleStorage, bodyComponent);
    layout.setIsPrimary(true);
    layout.vertex["componentPart"] = "box";
    layout.vertex["dataBinding"] = this.createDataBinding("box");
    layout.vertex["isPrimary"] = true;

    // component.text, component, .... attributeds not yet finished

    style = StyleLibrary[0]['Layout1Header'];
    styleName = "Layout1Header";
    styleStorage = new StyleStorage(styleName, style);
    const layoutHeaderGeometry = new mxGeometry(0, 0, defaultWidth, defaultHeight / 15);
    graphStorage.getGraph().getStylesheet().putCellStyle(styleName, style);
    const header = graphStorage.insertVertex(layout.getVertex(), null, "", layoutHeaderGeometry, styleStorage,headerComponent);
    header.vertex["componentPart"] = "header";
    header.vertex["dataBinding"] = this.createDataBinding("header");
    header.vertex["isPrimary"] = false;

    style = StyleLibrary[0]['Layout1Footer'];
    styleName = "Layout1Footer";
    styleStorage = new StyleStorage(styleName, style);
    const layoutFooterGeometry = new mxGeometry(defaultWidth / 7, defaultHeight * 14 / 15, defaultWidth * 5 / 7, defaultHeight * 1 / 15);
    graphStorage.getGraph().getStylesheet().putCellStyle(styleName, style);
    const footer = graphStorage.insertVertex(layout.getVertex(), null, "", layoutFooterGeometry, styleStorage, footerComponent);
    footer.vertex["componentPart"] = "footer";
    footer.vertex["dataBinding"] = this.createDataBinding("footer");
    footer.vertex["isPrimary"] = false;


    style = StyleLibrary[0]['Layout1Sidebar'];
    styleName = "Layout1Sidebar";
    styleStorage = new StyleStorage(styleName, style);
    const layoutSidebarGeometry = new mxGeometry(0, defaultHeight / 15, defaultWidth / 7, defaultHeight * 14 / 15);
    graphStorage.getGraph().getStylesheet().putCellStyle(styleName, style);
    const siderbar = graphStorage.insertVertex(layout.getVertex(), null, "", layoutSidebarGeometry, styleStorage, sidebarComponent);
    siderbar.vertex["componentPart"] = "siderbar";
    siderbar.vertex["dataBinding"] = this.createDataBinding("siderbar");
    siderbar.vertex["isPrimary"] = false;

    style = StyleLibrary[0]['Layout1Body'];
    styleName = "Layout1Body";
    styleStorage = new StyleStorage(styleName, style);
    const layoutBodyGeometry = new mxGeometry(defaultWidth / 7, defaultHeight / 15, defaultWidth * 5 / 7, defaultHeight * 13 / 15);
    graphStorage.getGraph().getStylesheet().putCellStyle(styleName, style);
    const body = graphStorage.insertVertex(layout.getVertex(), null,"", layoutBodyGeometry, styleStorage,bodyComponent);
    body.vertex["componentPart"] = "body";
    body.vertex["dataBinding"] = this.createDataBinding("body");
    body.vertex["isPrimary"] = false;

    style = StyleLibrary[0]['Layout1Asidebar'];
    styleName = "Layout1Asidebar";
    styleStorage = new StyleStorage(styleName, style);
    const layoutAsidebarGeometry = new mxGeometry(defaultWidth * 6 / 7, defaultHeight / 15, defaultWidth / 7, defaultHeight * 14 / 15);
    graphStorage.getGraph().getStylesheet().putCellStyle(styleName, style);
    const asidebar = graphStorage.insertVertex(layout.getVertex(), null, "", layoutAsidebarGeometry, styleStorage,asidebarComponent);
    asidebar.vertex["componentPart"] = "asidebar";
    asidebar.vertex["dataBinding"] = this.createDataBinding("asidebar");
    asidebar.vertex["isPrimary"] = false;
  }

  createDataBinding(part: String, index?){
    return new DataBinding(false, part, -1);
  }

}

