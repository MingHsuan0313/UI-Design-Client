import {ICreateComponentStrategy} from "./ICreateComponentStrategy";
import {StyleLibrary} from "../../../shared/styleLibrary";
import { DataBinding } from "../util/DataBinding";
import { SelabEditor } from "../selab-editor.model";
import { SelabVertex } from "../selabVertex.model";
import { InputTextComponent } from "../../ui-component-dependency";
// no need to databinding
export class InputStrategy extends ICreateComponentStrategy {

  constructor(geometry?, restoreMode?) {
    super(geometry, restoreMode);
    if(!this.restoreMode){
      this.width = 200;
      this.height = 30;
    }
  }

  createComponent(selabEditor: SelabEditor, component: InputTextComponent, parent: mxCell): mxCell {
    const style = StyleLibrary[0]["input"];
    const textGeometry = new mxGeometry(this.basex, this.basey, this.width, this.height);


    let selabVertex = new SelabVertex(component.id,component.id,parent.id);
    selabVertex = selabVertex
                    .setIsPrimary(true)
                    .setValue(component.description)

    let inputTextCell = selabEditor.insertVertex(selabVertex,component,textGeometry,style);
    inputTextCell["componentPart"] = "box";
    inputTextCell["dataBinding"] = this.createDataBinding("box");
    inputTextCell["isPrimary"] = true;
    inputTextCell["componentID"] = component.id;
    return inputTextCell;
  }

  createDataBinding(part: String, index?){
    let dataBindingName = "description";
    let hasDataBinding = true;
    let isList = -1;
    let dataBinding = new DataBinding(
      hasDataBinding,
      dataBindingName,
      isList
    )
    return dataBinding;
    // return new DataBinding(false, "", -1);
  }
}
