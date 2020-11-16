import { ICreateComponentStrategy } from "./ICreateComponentStrategy";
import { StyleLibrary } from "../../../shared/styleLibrary";
import { DataBinding } from "../util/DataBinding";
import { GraphStorage , VertexStorage , StyleStorage } from "../../graph-dependency";
import { SelabEditor } from "../selab-editor.model";
import { ButtonComponent } from "../../ui-component-dependency";
import { SelabVertex } from "../../store/selabVertex.model";

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

  createDataBinding(part: String, index?){
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

  createButtonVertex(selabEditor:SelabEditor, component:ButtonComponent, parent:mxCell) {
    let dataBinding = this.createDataBinding("text");
    const style = StyleLibrary[0]["button"];

    const width = 15 * component.text.length;
    const height = 40;
    const buttonGeometry = new mxGeometry(this.basex, this.basey, width, height);
    let selabVertex = new SelabVertex()
                            .setID(component.getId())
                            .setUIComponentID(component.getId())
                            .setParentID(parent.id)
                            .setIsPrimary(true)
                            .setValue(component.getValue())
                            .setDataBinding(dataBinding)
    let buttonCell = selabEditor.insertVertex(selabVertex,component,buttonGeometry,style);
    buttonCell["componentPart"] = "box";
    buttonCell["dataBinding"] = dataBinding;
    buttonCell["isPrimary"] = true;
    return buttonCell;
  }

  createComponent(selabEditor: SelabEditor, component:ButtonComponent, parent:mxCell): mxCell{
    let buttonVertex = this.createButtonVertex(selabEditor, component, parent);
    return buttonVertex;
    // component["x"] = buttonVertexStorage.getVertexX();
    // component["y"] = buttonVertexStorage.getVertexY();
    // component["width"] = buttonVertexStorage.getVertexWidth();
    // component["height"] = buttonVertexStorage.getVertexHeight();
    // component["style"] = buttonVertexStorage.getStyle();
  }
}
