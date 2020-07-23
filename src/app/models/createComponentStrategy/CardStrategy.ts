import {ICreateComponentStrategy} from "./ICreateComponentStrategy";
import {StyleLibrary} from "../../shared/styleLibrary";
import {Library} from "../../shared/library";
import {GraphStorage} from "../graph-storage.model";
import {CardComposite} from "../model";
import {StyleStorage} from "../style-storage.model";


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

  }

  createCardBoxVertex() {

  }

  createCardHeaderVertex() {

  }

  createComponent(graphStorage: GraphStorage, component, parent) {

    // insert dropdown box
    let styleName = "cardBoxStyle" + component.id;
    const cardBoxStyle = StyleLibrary[0]["card"]["cardBox"];
    let styleStorage = new StyleStorage(styleName, cardBoxStyle);
    graphStorage.getGraph().getStylesheet().putCellStyle(styleName, cardBoxStyle);
    const cardVertexGeometry = new mxGeometry(0, 0, 250, 300);
    const cardVertexStorage = graphStorage.insertVertex(parent, component.id, "", cardVertexGeometry, styleStorage, component);


    styleName = "cardHeaderStyle" + component.id;
    const cardHeaderStyle = StyleLibrary[0]["card"]["cardHeader"];
    styleStorage = new StyleStorage(styleName, cardHeaderStyle);
    graphStorage.getGraph().getStylesheet().putCellStyle(styleName, cardHeaderStyle);
    const cardHeaderGeometry = new mxGeometry(0, 0, 250, 50);
    const cardHeaderVertexStorage = graphStorage.insertVertex(cardVertexStorage.getVertex(), component.id, component["header"], cardHeaderGeometry, styleStorage, component);
    cardVertexStorage.addChild(cardHeaderVertexStorage.id, cardHeaderVertexStorage.getVertex(), "header");

    const componentListTemp = component.componentList;
    let index = 0;
    for (const element of componentListTemp) {
      styleName = "cardItemStyle" + component.id;
      const cardItemStyle = StyleLibrary[0][element.type];
      styleStorage = new StyleStorage(styleName, cardBoxStyle);
      graphStorage.getGraph().getStylesheet().putCellStyle(styleName, cardItemStyle);
      const cardItemVertexGeometry = new mxGeometry(0, 50 + 50 * index, 100, 50);
      const cardItemVertexStorage = graphStorage.insertVertex(cardVertexStorage.getVertex(), component.id, element["text"], cardItemVertexGeometry, styleStorage, element);  // can be more than attribute text
      cardVertexStorage.addChild(cardItemVertexStorage.id, cardItemVertexStorage.getVertex(), "componentList",element);
      index++;
    }
  }
}
