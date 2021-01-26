import {ICreateComponentStrategy} from "./ICreateComponentStrategy";
import { GraphStorage , VertexStorage , StyleStorage } from "../../graph-dependency";
import {StyleLibrary} from "../../../shared/styleLibrary";
import { DataBinding } from "../util/DataBinding";
import { SelabEditor } from "../selab-editor.model";
import { UIComponent } from "../../internalRepresentation/UIComponent.model";
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


    let selabVertex = new SelabVertex(component.getId(),component.getId(),parent.id);
    selabVertex = selabVertex
                    .setIsPrimary(true)
                    .setValue(component.description)
                    
    console.log("description heree " + component.description)
    console.log(component);

    let inputTextCell = selabEditor.insertVertex(selabVertex,component,textGeometry,style);
    inputTextCell["componentPart"] = "box";
    inputTextCell["dataBinding"] = this.createDataBinding("box");
    inputTextCell["isPrimary"] = true;
    inputTextCell["componentID"] = component.getId();
    return inputTextCell;
  }

  createDataBinding(part: String, index?){
    return new DataBinding(false, "", -1);
  }
}
