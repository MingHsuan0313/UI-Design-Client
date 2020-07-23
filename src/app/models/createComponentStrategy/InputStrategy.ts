import {ICreateComponentStrategy} from "./ICreateComponentStrategy";
import {GraphStorage} from "../graph-storage.model";
import {StyleLibrary} from "../../shared/styleLibrary";
import {StyleStorage} from "../style-storage.model";

export class InputStrategy implements ICreateComponentStrategy {
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
    const style = StyleLibrary[0]["input"];

    const styleName = "style" + component.id;
    const styleStorage = new StyleStorage(styleName, style);
    const textGeometry = new mxGeometry(this.basex, this.basey, 200, 30);
    graphStorage.getGraph().getStylesheet().putCellStyle(styleName, style);

    // Initialized
    graphStorage.insertVertex(parent, component.id, "", textGeometry, styleStorage, component);
    // component.vertexStorage = vertexStorage;
    component["style"] = style;
    return this;
  }
}
