import { ICreateComponentStrategy } from "./ICreateComponentStrategy";
import { StyleLibrary } from "../../../shared/styleLibrary";
import { DataBinding } from "../util/DataBinding";
import { GraphStorage , VertexStorage , StyleStorage } from "../../graph-dependency";
import { TextComponent } from "../../ui-component-dependency";
import { SelabEditor } from "../selab-editor.model";
import { SelabVertex } from "../../store/selabVertex.model";


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

  createTextVertex(selabEditor: SelabEditor, component:TextComponent, parent:mxCell): mxCell {
    const dataBinding = this.createDataBinding("text");
    let style = {} ; 

    if (component["href"].length>0) {
      style = Object.assign(style, StyleLibrary[0]["text"]["text_blue"]);
    } else {
      style = Object.assign(style, StyleLibrary[0]["text"]["text_black"]);
    }

    let width = (component.text.length) * 12;
    let textGeometry = new mxGeometry(this.basex, this.basey, width, 50);
    let selabVertex = new SelabVertex(component.getId(),component.getId(),parent.id)
    let id = (parseInt(component.getId())).toString();
    selabVertex = selabVertex 
                    .setID(id)
                    .setIsPrimary(true)
                    .setValue(component.getValue())
                    .setDataBinding(dataBinding);

    let textCell = selabEditor.insertVertex(selabVertex,component,textGeometry,style);
    console.log(textCell)
    textCell["componentPart"] = "box";
    textCell["dataBinding"] = this.createDataBinding("box");
    textCell["isPrimary"] = true;
    selabEditor.getGraph().refresh();

    return textCell;
  }

  createComponent(graphStorage, component, parent): mxCell {
    let textVertex = this.createTextVertex(graphStorage, component ,parent);
    return textVertex;
  }
}

