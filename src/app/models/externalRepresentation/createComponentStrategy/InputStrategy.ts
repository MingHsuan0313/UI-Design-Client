import {ICreateComponentStrategy} from "./ICreateComponentStrategy";
import { GraphStorage , VertexStorage , StyleStorage } from "../../graph-dependency";
import {StyleLibrary} from "../../../shared/styleLibrary";
import { DataBinding } from "../util/DataBinding";
import { SelabEditor } from "../selab-editor.model";
import { UIComponent } from "../../internalRepresentation/UIComponent.model";
import { SelabVertex } from "../../store/selabVertex.model";
import { InputTextComponent } from "../../ui-component-dependency";
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

  createComponent(selabEditor: SelabEditor, component: InputTextComponent, parent: mxCell): mxCell {
    const style = StyleLibrary[0]["input"];
    const textGeometry = new mxGeometry(this.basex, this.basey, 200, 30);


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
