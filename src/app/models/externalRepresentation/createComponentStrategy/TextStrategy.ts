import { ICreateComponentStrategy } from "./ICreateComponentStrategy";
import { StyleLibrary } from "../../../shared/styleLibrary";
import { DataBinding } from "../util/DataBinding";
import { GraphStorage , VertexStorage , StyleStorage } from "../../graph-dependency";
import { TextComponent } from "../../ui-component-dependency";


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

  createDataBinding(part) {
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

  createTextVertex(graphStorage:GraphStorage, component:TextComponent, parent:mxCell) {
    const dataBinding = this.createDataBinding("text");


    let style = {} ; 
    if (component["href"].length>0) {
      style = Object.assign(style, StyleLibrary[0]["text"]["text_blue"]);
    } else {
      style = Object.assign(style, StyleLibrary[0]["text"]["text_black"]);
    }


    const styleName = "style"+"Text"+ component.id;

    const styleStorage = new StyleStorage(styleName, style);

    let width = (component.text.length)*12;
    const textGeometry = new mxGeometry(this.basex, this.basey, width, 50);

    // Initialized
    let textVertexStorage = graphStorage.insertVertex(parent, component.id, component.text, textGeometry, styleStorage, component, dataBinding, true);
    textVertexStorage.vertex["componentPart"] = "box";
    textVertexStorage.vertex["dataBinding"] = this.createDataBinding("box");
    textVertexStorage.vertex["isPrimary"] = true;
    // graphStorage.getGraph().updateCellSize(textVertexStorage.getVertex(), true);
    graphStorage.getGraph().refresh(textVertexStorage.getVertex());
    return textVertexStorage;
  }

  createComponent(graphStorage: GraphStorage, component, parent) {
    let textVertexStorage = this.createTextVertex(graphStorage, component ,parent);

    // component["x"] = textVertexStorage.getVertexX();
    // component["y"] = textVertexStorage.getVertexY();
    // component["width"] = textVertexStorage.getVertexWidth();
    // component["height"] = textVertexStorage.getVertexHeight();
    //component["style"] = textVertexStorage.getStyle();
    return textVertexStorage;
  }
}

