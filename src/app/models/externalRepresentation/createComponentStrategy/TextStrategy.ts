import { ICreateComponentStrategy } from "./ICreateComponentStrategy";
import { StyleLibrary } from "../../../shared/styleLibrary";
import { DataBinding } from "../util/DataBinding";
import { GraphStorage , VertexStorage , StyleStorage } from "../../graph-dependency";
import { TextComponent } from "../../ui-component-dependency";
import { SelabEditor } from "../selab-editor.model";
import { SelabVertex } from "../selabVertex.model";


export class TextStrategy extends ICreateComponentStrategy {

  constructor(geometry?, restoreMode?) {
    super(geometry, restoreMode);
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

  createTextVertex(selabEditor: SelabEditor, component:TextComponent, parent:mxCell): mxCell {
    const dataBinding = this.createDataBinding("text");
    let style = {} ; 

    if (component["href"].length>0) {
      style = Object.assign(style, StyleLibrary[0]["text"]["text_blue"]);
    } else {
      style = Object.assign(style, StyleLibrary[0]["text"]["text_black"]);
    }
    if(!this.restoreMode){
      this.width = (component.text.length) * 12;
      this.height = 50;
    }
    let textGeometry = new mxGeometry(this.basex, this.basey, this.width, this.height);
    let selabVertex = new SelabVertex(component.id,component.id,parent.id)
    let id = (parseInt(component.id)).toString();
    selabVertex = selabVertex 
                    .setID(id)
                    .setIsPrimary(true)
                    .setValue(component.text)
                    .setDataBinding(dataBinding);

    let textCell = selabEditor.insertVertex(selabVertex,component,textGeometry,style);
    // console.log(textCell)
    textCell["componentPart"] = "box";
    textCell["dataBinding"] = this.createDataBinding("box");
    textCell["isPrimary"] = true;
    textCell["componentID"] = component.id;
    selabEditor.getGraph().refresh();

    return textCell;
  }

  createComponent(graphStorage, component, parent): mxCell {
    let textVertex = this.createTextVertex(graphStorage, component ,parent);
    return textVertex;
  }
}

