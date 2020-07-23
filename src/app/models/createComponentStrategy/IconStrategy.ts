import {ICreateComponentStrategy} from "./ICreateComponentStrategy";
import {GraphStorage} from "../graph-storage.model";
import {Text} from "../components/text.model";
import {StyleLibrary} from "../../shared/styleLibrary";
import {DataBinding} from "../util/DataBinding";
import {StyleStorage} from "../style-storage.model";


export class IconStrategy implements ICreateComponentStrategy {
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

  // ICON STYLE IS UNDEFINE
  createComponent(graphStorage: GraphStorage, component, parent) {
    const style = StyleLibrary[0]["icon"];
    const styleName = "style" + component.id;
    const styleStorage = new StyleStorage(styleName, style);
    const textGeometry = new mxGeometry(this.basex, this.basey, 30, 30);
    graphStorage.getGraph().getStylesheet().putCellStyle(styleName, style);

    // Initialized
    graphStorage.insertVertex(parent, component.id, component.text, textGeometry, styleStorage, component);
    // component.vertexStorage = vertexStorage;
    component["style"] = style;
  }
}