import { ICreateComponentStrategy } from "./ICreateComponentStrategy";
import { StyleLibrary } from "../../../shared/styleLibrary";
import { DataBinding } from "../util/DataBinding";
import { GraphStorage, VertexStorage, StyleStorage } from "../../graph-dependency";
import { SelabVertex } from "../selabVertex.model";
import { SelabEditor } from "../selab-editor.model";
import { CardComponent } from "../../ui-component-dependency";


export class CardStrategy implements ICreateComponentStrategy {
  strategyName: string;
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
    this.strategyName = "Card Strategy";
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
    let id = (parseInt(component.getId())).toString();
    let selabVertex = new SelabVertex()
      .setID(component.getSelector() + "-" + id)
      .setParentID(parent.id)
      .setIsPrimary(true)
      .setUIComponentID(component.getId())
    let cardBoxCell = selabEditor.insertVertex(selabVertex, component, cardVertexGeometry, cardBoxStyle);


    cardBoxCell["componentPart"] = "box";
    cardBoxCell["dataBinding"] = this.createDataBinding("box");
    cardBoxCell["isPrimary"] = true;
    cardBoxCell["componentID"] = component.getId();
    return cardBoxCell;
  }

  createCardHeaderVertex(selabEditor: SelabEditor, component: CardComponent, parent: mxCell) {
    const dataBinding = this.createDataBinding("header");
    const cardHeaderStyle = StyleLibrary[0]["card"]["cardHeader"];
    let cardHeaderGeometry = new mxGeometry(0, 0, 300, 50);
    let id = (parseInt(component.getId())).toString();
    let selabVertex = new SelabVertex()
      .setID(component.getSelector() + "-" + id)
      .setParentID(parent.id)
      .setIsPrimary(true)
      .setUIComponentID(component.getId())
      .setDataBinding(dataBinding)
      .setValue(component.header.toString());
    let cardHeaderCell = selabEditor.insertVertex(selabVertex, component, cardHeaderGeometry, cardHeaderStyle);

    cardHeaderCell["componentPart"] = "header";
    cardHeaderCell["componentID"] = component.getId();
    cardHeaderCell["dataBinding"] = this.createDataBinding("header");
    cardHeaderCell["isPrimary"] = false;
    return cardHeaderCell;
  }

  createComponent(selabEditor: SelabEditor, component: CardComponent, parent:mxCell) {
    let cardBoxVertex = this.createCardBoxVertex(selabEditor, component, parent);
    let cardHeaderVertex = this.createCardHeaderVertex(selabEditor, component, cardBoxVertex);

    let p1 = 50;
    let p2 = 70;
    let maxWidth = 250;
    for (const subUIComponent of component["componentList"]) {
      let vertex = selabEditor.createComponent(subUIComponent, cardBoxVertex, p1, p2);
      if (vertex["geometry"].width > maxWidth) {
        maxWidth = vertex["geometry"].width;
      }
      p2 = p2 + vertex["geometry"].height + 10;
      // cardBoxVertexStorage.addChild(vertexStorage.id, vertexStorage.getVertex(), "componentList", subUIComponent);
    }

    let newmxGeometry = new mxGeometry(this.basex, this.basey, maxWidth + 50, p2);
    cardBoxVertex.setGeometry(newmxGeometry);
    selabEditor.getGraph().refresh();
    // component["x"] = cardBoxVertexStorage.getVertexX();
    // component["y"] = cardBoxVertexStorage.getVertexX();
    // component["width"] = cardBoxVertexStorage.getVertexWidth();
    // component["height"] = cardBoxVertexStorage.getVertexHeight();
    // component["style"] = cardBoxVertexStorage.getStyle();
    return cardBoxVertex;
  }
}
