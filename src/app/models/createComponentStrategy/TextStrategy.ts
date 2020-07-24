import { ICreateComponentStrategy } from "./ICreateComponentStrategy";
import { GraphStorage } from "../graph-storage.model";
import { StyleLibrary } from "../../shared/styleLibrary";
import { StyleStorage } from "../style-storage.model";
import { DataBinding } from "../util/DataBinding";
import { Text } from "../modelDependency";

export class TextStrategy implements ICreateComponentStrategy {
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
    let hasDataBinding = true;
    let dataBindingName = "text";
    let isList = -1;
    let dataBinding = new DataBinding(
      hasDataBinding,
      dataBindingName,
      isList
    )
    return dataBinding;
  }

  createTextVertex(graphStorage, component, parent) {
    const dataBinding = this.createDataBinding();

    let style;
    if (component["href"].length > 0) {
     // style["fontColor"] = "#3366BB";
      style = StyleLibrary[0]["text"]["text_blue"];
    } else {
      style = StyleLibrary[0]["text"]["text_black"];
    }
    const styleName = "style"+"Text"+ component.id;
    
    const styleStorage = new StyleStorage(styleName, style);

    let width = (component.text.length)*12;    
    const textGeometry = new mxGeometry(this.basex, this.basey, width, 30);
    graphStorage.getGraph().getStylesheet().putCellStyle(styleName, style);

    // Initialized
    let textVertexStorage = graphStorage.insertVertex(parent, component.id, component.text, textGeometry, styleStorage, component, dataBinding, true);

    return textVertexStorage;
  }

  createComponent(graphStorage: GraphStorage, component, parent) {
    let textVertexStorage = this.createTextVertex(graphStorage, component ,parent);
    // component.vertexStorage = vertexStorage;
    component.x = textVertexStorage.getVertexX();
    component.y = textVertexStorage.getVertexY();
    component.width = textVertexStorage.getVertexWidth();
    component.height = textVertexStorage.getVertexHeight();
    component["style"] = textVertexStorage.getStyle();
    return textVertexStorage;
    // return this;
  }
}
