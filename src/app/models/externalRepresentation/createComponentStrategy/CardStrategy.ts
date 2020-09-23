import { ICreateComponentStrategy } from "./ICreateComponentStrategy";
import { StyleLibrary } from "../../../shared/styleLibrary";
import { DataBinding } from "../util/DataBinding";
import { GraphStorage , VertexStorage , StyleStorage } from "../../graph-dependency";


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
  createDataBinding(part: String, index?){
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
    else if(part == "box") {
      return new DataBinding(false, part, -1);
    }
    else 
      return new DataBinding(false, part, -1);
  }

  createCardBoxVertex(graphStorage, component, parent) {
    const styleName = "cardBoxStyle" + component.id;
    const cardBoxStyle = StyleLibrary[0]["card"]["cardBox"];
    const styleStorage = new StyleStorage(styleName, cardBoxStyle);
    graphStorage.getGraph().getStylesheet().putCellStyle(styleName, cardBoxStyle);
    const cardVertexGeometry = new mxGeometry(this.basex, this.basey, 250, 300);
    const cardVertexStorage = graphStorage.insertVertex(parent, component.id, "", cardVertexGeometry, styleStorage, component);
    cardVertexStorage.setIsPrimary(true);

    cardVertexStorage.vertex["componentPart"] = "box";
    cardVertexStorage.vertex["dataBinding"] = this.createDataBinding("box");
    cardVertexStorage.vertex["isPrimary"] = true;
    return cardVertexStorage;
  }

  createCardHeaderVertex(graphStorage, component, parent) {
    const dataBinding = this.createDataBinding("header");
    const styleName = "cardHeaderStyle" + component.id;
    const cardHeaderStyle = StyleLibrary[0]["card"]["cardHeader"];
    const styleStorage = new StyleStorage(styleName, cardHeaderStyle);
    graphStorage.getGraph().getStylesheet().putCellStyle(styleName, cardHeaderStyle);
    const cardHeaderGeometry = new mxGeometry(0, 0, 250, 50);
    const cardHeaderVertexStorage = graphStorage.insertVertex(parent.getVertex(), component.id, component["header"], cardHeaderGeometry, styleStorage, component, dataBinding);
    parent.addChild(cardHeaderVertexStorage.id, cardHeaderVertexStorage.getVertex(), "header");
    cardHeaderVertexStorage.vertex["componentPart"] = "header";
    cardHeaderVertexStorage.vertex["dataBinding"] = this.createDataBinding("header");
    cardHeaderVertexStorage.vertex["isPrimary"] = false;
    return cardHeaderVertexStorage;
  }

  createComponent(graphStorage: GraphStorage, component, parent) {
    const cardBoxVertexStorage = this.createCardBoxVertex(graphStorage, component, parent);
    const cardHeaderVertexStorage = this.createCardHeaderVertex(graphStorage, component, cardBoxVertexStorage);
    // insert dropdown box


    let p1 = 50;
    let p2 = 50;
    let maxWidth = 250;
    for (const subUIComponent of component["componentList"]) {
      const vertexStorage = graphStorage.createComponent(subUIComponent, cardBoxVertexStorage.getVertex(), p1, p2);
      if (vertexStorage.getVertexWidth() > maxWidth) {
        maxWidth = vertexStorage.getVertexWidth();
      }
      p2 = p2 + vertexStorage.getVertexHeight() + 10;

      cardBoxVertexStorage.addChild(vertexStorage.id, vertexStorage.getVertex(), "componentList", subUIComponent);
    }

    const newmxGeometry = new mxGeometry(this.basex, this.basey, maxWidth, p2);
    cardBoxVertexStorage.getVertex().setGeometry(newmxGeometry);
    graphStorage.getGraph().refresh();

    component["x"] = cardBoxVertexStorage.getVertexX();
    component["y"] = cardBoxVertexStorage.getVertexX();
    component["width"] = cardBoxVertexStorage.getVertexWidth();
    component["height"] = cardBoxVertexStorage.getVertexHeight();
    // component["style"] = cardBoxVertexStorage.getStyle();

    return cardBoxVertexStorage;
  }
}
