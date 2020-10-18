import {ICreateComponentStrategy} from "./ICreateComponentStrategy";
import { GraphStorage , VertexStorage , StyleStorage } from "../../graph-dependency";
import {StyleLibrary} from "../../../shared/styleLibrary";
import { DataBinding } from "../util/DataBinding";
// no need to databinding
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

    // Initialized
    let inputVertexStorage = graphStorage.insertVertex(parent, component.id, "", textGeometry, styleStorage, component);
    inputVertexStorage.setIsPrimary(true);

    inputVertexStorage.vertex["componentPart"] = "box";
    inputVertexStorage.vertex["dataBinding"] = this.createDataBinding("box");
    inputVertexStorage.vertex["isPrimary"] = true;
    // component.vertexStorage = vertexStorage;
    // component["style"] = inputVertexStorage.getStyle();
    component["x"] = inputVertexStorage.getVertexX();
    component["y"] = inputVertexStorage.getVertexY();
    component["width"] = inputVertexStorage.getVertexWidth();
    component["height"] = inputVertexStorage.getVertexHeight();
    return inputVertexStorage;
  }

  createDataBinding(part: String, index?){
    return new DataBinding(false, "", -1);
  }
}
