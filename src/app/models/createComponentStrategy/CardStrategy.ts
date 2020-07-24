import { ICreateComponentStrategy } from "./ICreateComponentStrategy";
import { StyleLibrary } from "../../shared/styleLibrary";
import { Library } from "../../shared/library";
import { GraphStorage } from "../graph-storage.model";
import { CardComposite } from "../model";
import { StyleStorage } from "../style-storage.model";
import { DataBinding } from "../util/DataBinding";


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

  createDataBinding() {
    let dataBindingName = "header";
    let hasDataBining = true;
    let isList = -1;
    let dataBinding = new DataBinding(
      hasDataBining,
      dataBindingName,
      isList
    )
    return dataBinding;
  }

  createCardBoxVertex(graphStorage, component, parent) {
    let styleName = "cardBoxStyle" + component.id;
    const cardBoxStyle = StyleLibrary[0]["card"]["cardBox"];
    let styleStorage = new StyleStorage(styleName, cardBoxStyle);
    graphStorage.getGraph().getStylesheet().putCellStyle(styleName, cardBoxStyle);
    const cardVertexGeometry = new mxGeometry(0, 0, 250, 300);
    const cardVertexStorage = graphStorage.insertVertex(parent, component.id, "", cardVertexGeometry, styleStorage, component);
    return cardVertexStorage;
  }

  createCardHeaderVertex(graphStorage, component, parent) {
    let dataBinding = this.createDataBinding();
    let styleName = "cardHeaderStyle" + component.id;
    const cardHeaderStyle = StyleLibrary[0]["card"]["cardHeader"];
    let styleStorage = new StyleStorage(styleName, cardHeaderStyle);
    graphStorage.getGraph().getStylesheet().putCellStyle(styleName, cardHeaderStyle);
    const cardHeaderGeometry = new mxGeometry(0, 0, 250, 50);
    const cardHeaderVertexStorage = graphStorage.insertVertex(parent.getVertex(), component.id, component["header"], cardHeaderGeometry, styleStorage, component,dataBinding);
    parent.addChild(cardHeaderVertexStorage.id, cardHeaderVertexStorage.getVertex(), "header");
    return cardHeaderVertexStorage;
  }

  createComponent(graphStorage: GraphStorage, component, parent) {
    let cardBoxVertexStorage = this.createCardBoxVertex(graphStorage, component, parent);
    let cardHeaderVertexStorage = this.createCardHeaderVertex(graphStorage, component, cardBoxVertexStorage);
    // insert dropdown box


    this.basey = 50;
    this.basex = 0;
    let maxWidth = 0;
    for(let subUIComponent of component["componentList"]) {
      let vertexStorage = graphStorage.createComponent(subUIComponent, cardBoxVertexStorage.getVertex(), this.basex, this.basey)
      if(vertexStorage.getVertexWidth() > maxWidth)
        maxWidth = vertexStorage.getVertexWidth();
      this.basey = this.basey + vertexStorage.getVertexHeight();
      cardBoxVertexStorage.addChild(vertexStorage.id, vertexStorage.getVertex(), "componentList",subUIComponent);
    }

    let newmxGeometry = new mxGeometry(0,0,maxWidth,this.basey);
    cardBoxVertexStorage.setGeometry(newmxGeometry);
    graphStorage.getGraph().refresh();

    return cardBoxVertexStorage;

    // const componentListTemp = component.componentList;
    // let index = 0;
    // for (const element of componentListTemp) {
    //   styleName = "cardItemStyle" + component.id;
    //   const cardItemStyle = StyleLibrary[0][element.type];
    //   styleStorage = new StyleStorage(styleName, cardBoxStyle);
    //   graphStorage.getGraph().getStylesheet().putCellStyle(styleName, cardItemStyle);
    //   const cardItemVertexGeometry = new mxGeometry(0, 50 + 50 * index, 100, 50);
    //   const cardItemVertexStorage = graphStorage.insertVertex(cardVertexStorage.getVertex(), component.id, element["text"], cardItemVertexGeometry, styleStorage, element);  // can be more than attribute text
    //   cardVertexStorage.addChild(cardItemVertexStorage.id, cardItemVertexStorage.getVertex(), "componentList",element);
    //   index++;
    // }
  }
}
