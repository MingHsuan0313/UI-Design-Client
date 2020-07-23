import {ICreateComponentStrategy} from "./ICreateComponentStrategy";
import {GraphStorage} from "../graph-storage.model";
import {StyleLibrary} from "../../shared/styleLibrary";
import {StyleStorage} from "../style-storage.model";
import {DataBinding} from "../util/DataBinding";

export class DropdownStrategy implements ICreateComponentStrategy {
  basex: number;
  basey: number;

  constructor(basex?, basey?) {
    // basic component
    if (basex == undefined || basey == undefined) {
      this.basex = 50;
      this.basey = 50;
    } else {
      this.basex = basex;
      this.basey = basey;
    }
  }

  createComponent(graphStorage: GraphStorage, component, parent) {
    const itemCount = component.items.split(" ").length;
    const dropdownHeight = 30 * (itemCount + 1);

    // insert dropdown box
    let styleName = "dropdownBoxStyle" + component.id;
    const dropdownBoxStyle = StyleLibrary[0]["dropdown"]["dropdownBox"];
    let styleStorage = new StyleStorage(styleName, dropdownBoxStyle);
    graphStorage.getGraph().getStylesheet().putCellStyle(styleName, dropdownBoxStyle);
    const dropdownVertexGeometry = new mxGeometry(this.basex, this.basey, 220, dropdownHeight);
    const dropdownVertexStorage = graphStorage.insertVertex(parent, component.id, "", dropdownVertexGeometry, styleStorage, component);

    component.width = 220;
    component.height = dropdownHeight;

    // insert dropdown header
    styleName = "dropdownHeaderStyle" + component.id;
    const dropdownHeaderStyle = StyleLibrary[0]["dropdown"]["dropdownHeader"];
    styleStorage = new StyleStorage(styleName, dropdownHeaderStyle);
    graphStorage.getGraph().getStylesheet().putCellStyle(styleName, dropdownHeaderStyle);
    const dropdownHeaderGeometry = new mxGeometry(0, 20, 200, 30);
    const dropdownHeaderVertexStorage = graphStorage.insertVertex(dropdownVertexStorage.getVertex(), component.id, "", dropdownHeaderGeometry, styleStorage, component);
    dropdownVertexStorage.addChild(dropdownHeaderVertexStorage.id, dropdownHeaderVertexStorage.getVertex(), "header");


    styleName = "dropdownListStyle" + component.id;
    const dropdownListStyle = StyleLibrary[0]["dropdown"]["dropdownList"];
    styleStorage = new StyleStorage(styleName, dropdownListStyle);
    graphStorage.getGraph().getStylesheet().putCellStyle(styleName, dropdownListStyle);

    const dropdownListGeometry = new mxGeometry(0, 0, 200, dropdownHeight - 30);
    const dropdownItemListVertexStorage = graphStorage.insertVertex(dropdownVertexStorage.getVertex(), component.id, "", dropdownListGeometry, styleStorage, component);
    dropdownVertexStorage.addChild(dropdownItemListVertexStorage.id, dropdownItemListVertexStorage.getVertex(), "itemList");


    let index = 0;
    const itemList = component.items.split(" ");
    // insert dropdown item
    for (const element of itemList) {

      const dropdownItemGeometry = new mxGeometry(0, 23 + 30 + 30 * index, 200, 30);

      styleName = "dropdownItemstyle" + component.id;
      const dropdownItemStyle = StyleLibrary[0]["dropdown"]["dropdownItem"];
      styleStorage = new StyleStorage(styleName, dropdownItemStyle);
      graphStorage.getGraph().getStylesheet().putCellStyle(styleName, dropdownItemStyle);
      const dropdownItemVertexStorage = graphStorage.insertVertex(dropdownItemListVertexStorage.getVertex(), component.id, element, dropdownItemGeometry, styleStorage, component);
      dropdownVertexStorage.addChild(dropdownItemVertexStorage.id, dropdownItemVertexStorage.getVertex(), "items");
      index += 1;
    }
  }
}
