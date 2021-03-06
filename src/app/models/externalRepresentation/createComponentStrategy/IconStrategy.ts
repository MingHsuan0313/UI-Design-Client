import { ICreateComponentStrategy } from "./ICreateComponentStrategy";
import { StyleLibrary } from "../../../shared/styleLibrary";
import { DataBinding } from "../util/DataBinding";

export class IconStrategy extends ICreateComponentStrategy {

  constructor(geometry?, restoreMode?) {
    super(geometry, restoreMode);
    if(!this.restoreMode){
      this.width = 30;
      this.height = 30;
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
    const textGeometry = new mxGeometry(this.basex, this.basey, this.width, this.height);

    // Initialized
    let iconVertexStorage = graphStorage.insertVertex(parent, component.id, component.text, textGeometry, styleStorage, component);
    iconVertexStorage.vertex["componentPart"] = "box";
    iconVertexStorage.vertex["dataBinding"] = this.createDataBinding("box");
    iconVertexStorage.vertex["isPrimary"] = true;
    // component.vertexStorage = vertexStorage;
    iconVertexStorage.setIsPrimary(true);
    // component["style"] = style;
    // component["x"] = iconVertexStorage.getVertexX();
    // component["y"] = iconVertexStorage.getVertexY();
    // component["width"] = iconVertexStorage.getVertexWidth();
    // component["height"] = iconVertexStorage.getVertexHeight();
    return iconVertexStorage;
  }
}
