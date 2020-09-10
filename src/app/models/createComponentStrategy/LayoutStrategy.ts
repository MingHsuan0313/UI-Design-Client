import {ICreateComponentStrategy} from './ICreateComponentStrategy';
import {GraphStorage} from '../graph-storage.model';
import {StyleLibrary} from '../../shared/styleLibrary';
import {StyleStorage} from '../style-storage.model';
import { DataBinding } from "../util/DataBinding";

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

  createComponent(graphStorage: GraphStorage, component, parent) {
    const graphNode = document.getElementById('graphContainer0');
    const defaultWidth = graphNode.offsetWidth;
    const defaultHeight = graphNode.offsetHeight;

    let style = StyleLibrary[0]['Layout1'];
    let styleName = 'style' + component.type;
    let styleStorage = new StyleStorage(styleName, style);
    const layoutGeometry = new mxGeometry(0, 0, defaultWidth, defaultHeight);
    graphStorage.getGraph().getStylesheet().putCellStyle(styleName, style);
    const layout = graphStorage.insertVertex(parent, null, component.text, layoutGeometry, styleStorage, component);
    layout.setIsPrimary(true);
    layout.vertex["componentPart"] = "box";
    layout.vertex["dataBinding"] = this.createDataBinding("box");
    layout.vertex["isPrimary"] = true;

    // component.text, component, .... attributeds not yet finished

    style = StyleLibrary[0]['Layout1Header'];
    styleName = 'style' + component.type + 'Header';
    styleStorage = new StyleStorage(styleName, style);
    const layoutHeaderGeometry = new mxGeometry(0, 0, defaultWidth, defaultHeight / 15);
    graphStorage.getGraph().getStylesheet().putCellStyle(styleName, style);
    const header = graphStorage.insertVertex(layout.getVertex(), null, component.text, layoutHeaderGeometry, styleStorage, component);
    header.vertex["componentPart"] = "header";
    header.vertex["dataBinding"] = this.createDataBinding("header");
    header.vertex["isPrimary"] = false;

    style = StyleLibrary[0]['Layout1Footer'];
    styleName = 'style' + component.type + 'Footer';
    styleStorage = new StyleStorage(styleName, style);
    const layoutFooterGeometry = new mxGeometry(defaultWidth / 7, defaultHeight * 14 / 15, defaultWidth * 5 / 7, defaultHeight * 1 / 15);
    graphStorage.getGraph().getStylesheet().putCellStyle(styleName, style);
    const footer = graphStorage.insertVertex(layout.getVertex(), null, component.text, layoutFooterGeometry, styleStorage, component);
    footer.vertex["componentPart"] = "footer";
    footer.vertex["dataBinding"] = this.createDataBinding("footer");
    footer.vertex["isPrimary"] = false;


    style = StyleLibrary[0]['Layout1Sidebar'];
    styleName = 'style' + component.type + 'Sidebar';
    styleStorage = new StyleStorage(styleName, style);
    const layoutSidebarGeometry = new mxGeometry(0, defaultHeight / 15, defaultWidth / 7, defaultHeight * 14 / 15);
    graphStorage.getGraph().getStylesheet().putCellStyle(styleName, style);
    const siderbar = graphStorage.insertVertex(layout.getVertex(), null, component.text, layoutSidebarGeometry, styleStorage, component);
    siderbar.vertex["componentPart"] = "siderbar";
    siderbar.vertex["dataBinding"] = this.createDataBinding("siderbar");
    siderbar.vertex["isPrimary"] = false;

    style = StyleLibrary[0]['Layout1Body'];
    styleName = 'style' + component.type + 'Body';
    styleStorage = new StyleStorage(styleName, style);
    const layoutBodyGeometry = new mxGeometry(defaultWidth / 7, defaultHeight / 15, defaultWidth * 5 / 7, defaultHeight * 13 / 15);
    graphStorage.getGraph().getStylesheet().putCellStyle(styleName, style);
    const body = graphStorage.insertVertex(layout.getVertex(), null, component.text, layoutBodyGeometry, styleStorage, component);
    body.vertex["componentPart"] = "body";
    body.vertex["dataBinding"] = this.createDataBinding("body");
    body.vertex["isPrimary"] = false;

    style = StyleLibrary[0]['Layout1Asidebar'];
    styleName = 'style' + component.type + 'Asidebar';
    styleStorage = new StyleStorage(styleName, style);
    const layoutAsidebarGeometry = new mxGeometry(defaultWidth * 6 / 7, defaultHeight / 15, defaultWidth / 7, defaultHeight * 14 / 15);
    graphStorage.getGraph().getStylesheet().putCellStyle(styleName, style);
    const asidebar = graphStorage.insertVertex(layout.getVertex(), null, component.text, layoutAsidebarGeometry, styleStorage, component);
    asidebar.vertex["componentPart"] = "asidebar";
    asidebar.vertex["dataBinding"] = this.createDataBinding("asidebar");
    asidebar.vertex["isPrimary"] = false;
  }

  createDataBinding(part: String, index?){
    return new DataBinding(false, part, -1);
  }

}

