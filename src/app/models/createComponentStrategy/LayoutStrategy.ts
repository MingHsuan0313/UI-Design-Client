import {ICreateComponentStrategy} from "./ICreateComponentStrategy";
import {GraphStorage} from "../graph-storage.model";
import {StyleLibrary} from "../../shared/styleLibrary";
import {StyleStorage} from "../style-storage.model";

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
    const graphNode = document.getElementById("graphContainer0");
    const defaultWidth = graphNode.offsetWidth;
    const defaultHeight = graphNode.offsetHeight;

    let style = StyleLibrary[0]["Layout1"];
    let styleName = "style" + component.type;
    let styleStorage = new StyleStorage(styleName, style);
    const layoutGeometry = new mxGeometry(0, 0, defaultWidth , defaultHeight);
    graphStorage.getGraph().getStylesheet().putCellStyle(styleName, style);
    const layout = graphStorage.insertVertex(parent, null, component.text, layoutGeometry, styleStorage, component);
    layout.setIsPrimary(true);

    // component.text, component, .... attributeds not yet finished

    style = StyleLibrary[0]["Layout1Header"];
    styleName = "style" + component.type + "Header";
    styleStorage = new StyleStorage(styleName, style);
    const layoutHeaderGeometry = new mxGeometry(0, 0, defaultWidth , defaultHeight / 15 );
    graphStorage.getGraph().getStylesheet().putCellStyle(styleName, style);
    const header = graphStorage.insertVertex(layout.getVertex(), null, component.text, layoutHeaderGeometry, styleStorage, component);


    style = StyleLibrary[0]["Layout1Footer"];
    styleName = "style" + component.type + "Footer";
    styleStorage = new StyleStorage(styleName, style);
    const layoutFooterGeometry = new mxGeometry(0, defaultHeight * 14 / 15 , defaultWidth, defaultHeight * 1 / 15 );
    graphStorage.getGraph().getStylesheet().putCellStyle(styleName, style);
    graphStorage.insertVertex(layout.getVertex(), null, component.text, layoutFooterGeometry, styleStorage, component);

    style = StyleLibrary[0]["Layout1Sidebar"];
    styleName = "style" + component.type + "Sidebar";
    styleStorage = new StyleStorage(styleName, style);
    const layoutSidebarGeometry = new mxGeometry(0, defaultHeight / 15 , defaultWidth / 7, defaultHeight * 14 / 15 );
    graphStorage.getGraph().getStylesheet().putCellStyle(styleName, style);
    graphStorage.insertVertex(layout.getVertex(), null, component.text, layoutSidebarGeometry, styleStorage, component);


  }

}

