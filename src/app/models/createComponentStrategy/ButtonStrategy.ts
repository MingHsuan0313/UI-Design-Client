import { ICreateComponentStrategy } from "./ICreateComponentStrategy";
import { GraphStorage } from "../graph-storage.model";
import { StyleLibrary } from "../../shared/styleLibrary";
import { StyleStorage } from "../style-storage.model";
import { DataBinding } from "../util/DataBinding";

export class ButtonStrategy implements ICreateComponentStrategy {
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

  createDataBinding() {
    let dataBindingName = "text";
    let hasDataBining = true;
    let isList = -1;
    let dataBinding = new DataBinding(
      hasDataBining,
      dataBindingName,
      isList
    )
    return dataBinding;
  }

  createComponent(graphStorage: GraphStorage, component, parent) {
    let dataBinding = this.createDataBinding();

    const style = StyleLibrary[0]["button"];
    const styleName = "style" + component.id;
    const styleStorage = new StyleStorage(styleName, style);
    graphStorage.getGraph().getStylesheet().putCellStyle(styleName, style);

    const width = 15 * component.text.length;
    const buttonGeometry = new mxGeometry(this.basex, this.basey, width, 40);
    let buttonVertexStorage = graphStorage.insertVertex(parent, component.id, component.text, buttonGeometry, styleStorage, component,dataBinding);

    component.width = width;
    component.height = 40;
    component["style"] = style;

    return buttonVertexStorage;
  }
}
