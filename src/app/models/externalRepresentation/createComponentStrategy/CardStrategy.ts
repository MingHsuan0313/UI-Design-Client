import { ICreateComponentStrategy } from "./ICreateComponentStrategy";
import { StyleLibrary } from "../../../shared/styleLibrary";
import { DataBinding } from "../util/DataBinding";
import { SelabVertex } from "../selabVertex.model";
import { SelabEditor } from "../selab-editor.model";
import { CardComponent } from "../../ui-component-dependency";


export class CardStrategy extends ICreateComponentStrategy {

  constructor(geometry?, restoreMode?) {
    super(geometry, restoreMode);
  }

  // part: Box , Header
  createDataBinding(part: String, index?) {
    if (part == "header") {

      const dataBindingName = "header";
      const hasDataBining = true;
      const isList = -1;
      const dataBinding = new DataBinding(
        hasDataBining,
        dataBindingName,
        isList
      );
      return dataBinding;
    }
    else if (part == "box") {
      return new DataBinding(false, part, -1);
    }
    else
      return new DataBinding(false, part, -1);
  }

  createCardBoxVertex(selabEditor: SelabEditor, component: CardComponent, parent: mxCell) {
    const cardBoxStyle = StyleLibrary[0]["card"]["cardBox"];
    const cardVertexGeometry = new mxGeometry(this.basex, this.basey, 250, 300);
    let id = (parseInt(component.id)).toString();
    let selabVertex = new SelabVertex()
      .setID(component.selector + "-" + id)
      .setParentID(parent.id)
      .setIsPrimary(true)
      .setUIComponentID(component.id)
    let cardBoxCell = selabEditor.insertVertex(selabVertex, component, cardVertexGeometry, cardBoxStyle);


    cardBoxCell["componentPart"] = "box";
    cardBoxCell["dataBinding"] = this.createDataBinding("box");
    cardBoxCell["isPrimary"] = true;
    cardBoxCell["componentID"] = component.id;
    return cardBoxCell;
  }

  createCardHeaderVertex(selabEditor: SelabEditor, component: CardComponent, parent: mxCell) {
    const dataBinding = this.createDataBinding("header");
    const cardHeaderStyle = StyleLibrary[0]["card"]["cardHeader"];
    let cardHeaderGeometry = new mxGeometry(0, 0, 300, 50);
    let id = (parseInt(component.id)).toString();
    let selabVertex = new SelabVertex()
      .setID(component.selector + "-" + id)
      .setParentID(parent.id)
      .setIsPrimary(true)
      .setUIComponentID(component.id)
      .setDataBinding(dataBinding)
      .setValue(component.header.toString());
    let cardHeaderCell = selabEditor.insertVertex(selabVertex, component, cardHeaderGeometry, cardHeaderStyle);

    cardHeaderCell["componentPart"] = "header";
    cardHeaderCell["componentID"] = component.id;
    cardHeaderCell["dataBinding"] = this.createDataBinding("header");
    cardHeaderCell["isPrimary"] = false;
    return cardHeaderCell;
  }

  createComponent(selabEditor: SelabEditor, component: CardComponent, parent: mxCell) {
    let cardBoxVertex = this.createCardBoxVertex(selabEditor, component, parent);
    let cardHeaderVertex = this.createCardHeaderVertex(selabEditor, component, cardBoxVertex);
    let subComponentXOffset = 30;
    let subComponentYOffset = 60;
    let maxWidth = 250;

    for (let subUIComponent of component["componentList"]) {
      let vertex;
      if (!this.restoreMode) {
        vertex = selabEditor.createComponent(subUIComponent, cardBoxVertex, new mxGeometry(subComponentXOffset, subComponentYOffset, 0, 0))
        if (vertex["geometry"].width > maxWidth)
          maxWidth = vertex["geometry"].width;
        subComponentYOffset = subComponentYOffset + vertex["geometry"].height + 10;
      } else {
        vertex = selabEditor.createComponent(subUIComponent, cardBoxVertex, subUIComponent.geometry, true)
      }
    }
    if (!this.restoreMode) {
      let newmxGeometry = new mxGeometry(this.basex, this.basey, maxWidth + 50, subComponentYOffset);
      cardBoxVertex.setGeometry(newmxGeometry);
      selabEditor.getGraph().refresh();
    }
    return cardBoxVertex;
  }
}