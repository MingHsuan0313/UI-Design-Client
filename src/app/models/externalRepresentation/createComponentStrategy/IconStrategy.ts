import { ICreateComponentStrategy } from "./ICreateComponentStrategy";
import { StyleLibrary } from "../../../shared/styleLibrary";
import { DataBinding } from "../util/DataBinding";
import { GraphStorage , VertexStorage , StyleStorage } from "../../graph-dependency";

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

  createDataBinding(part, index?) {
    const hasDataBinding = true;
    const dataBindingName = "text";
    const isList = -1;
    const dataBinding = new DataBinding(
      hasDataBinding,
      dataBindingName,
      isList
    );
    return dataBinding;
  }

  // ICON STYLE IS UNDEFINE
  createComponent(graphStorage: GraphStorage, component, parent) {
    this.createDataBinding("icon");
    const style = StyleLibrary[0]["icon"];
    const styleName = "style" + component.id;
    const styleStorage = new StyleStorage(styleName, style);
    const textGeometry = new mxGeometry(this.basex, this.basey, 30, 30);
    graphStorage.getGraph().getStylesheet().putCellStyle(styleName, style);

    // Initialized
    let iconVertexStorage = graphStorage.insertVertex(parent, component.id, component.text, textGeometry, styleStorage, component);
    iconVertexStorage.vertex["componentPart"] = "box";
    iconVertexStorage.vertex["dataBinding"] = this.createDataBinding("box");
    iconVertexStorage.vertex["isPrimary"] = true;
    // component.vertexStorage = vertexStorage;
    iconVertexStorage.setIsPrimary(true);
    // component["style"] = style;
    component["x"] = iconVertexStorage.getVertexX();
    component["y"] = iconVertexStorage.getVertexY();
    component["width"] = iconVertexStorage.getVertexWidth();
    component["height"] = iconVertexStorage.getVertexHeight();
    return iconVertexStorage;
  }
}
