import { ICreateComponentStrategy } from "./ICreateComponentStrategy";
import { GraphStorage } from "../graph-storage.model";
import { StyleLibrary } from "../../shared/styleLibrary";
import { StyleStorage } from "../style-storage.model";
import { DataBinding } from "../util/DataBinding";

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

  createDataBinding(index) {
    let hasDataBinding = true;
    let dataBindingName = "items";
    let isList = index;
    let dataBinding = new DataBinding(
      hasDataBinding,
      dataBindingName,
      isList
    );
    return dataBinding;

  }

  createDropdownBoxVertex(graphStorage, component, parent) {
    const itemCount = component.items.split(" ").length;
    const dropdownWidth = 220;
    const dropdownHeight = 30 * (itemCount + 1);

    // insert dropdown box
    let styleName = "dropdownBoxStyle" + component.id;
    const dropdownBoxStyle = StyleLibrary[0]["dropdown"]["dropdownBox"];
    let styleStorage = new StyleStorage(styleName, dropdownBoxStyle);
    graphStorage.getGraph().getStylesheet().putCellStyle(styleName, dropdownBoxStyle);
    const dropdownBoxVertexGeometry = new mxGeometry(this.basex, this.basey, dropdownWidth, dropdownHeight);
    const dropdownBoxVertexStorage = graphStorage.insertVertex(parent, component.id, "", dropdownBoxVertexGeometry, styleStorage, component);

    return dropdownBoxVertexStorage;
  }

  createDropdownHeaderVertex(graphStorage, component, parent) {
    const styleName = "dropdownHeaderStyle" + component.id;
    const dropdownHeaderStyle = StyleLibrary[0]["dropdown"]["dropdownHeader"];
    const styleStorage = new StyleStorage(styleName, dropdownHeaderStyle);
    graphStorage.getGraph().getStylesheet().putCellStyle(styleName, dropdownHeaderStyle);
    const dropdownHeaderGeometry = new mxGeometry(0, 20, 200, 30);
    const dropdownHeaderVertexStorage = graphStorage.insertVertex(parent.getVertex(), component.id, "", dropdownHeaderGeometry, styleStorage, component);
    parent.addChild(dropdownHeaderVertexStorage.id, dropdownHeaderVertexStorage.getVertex(), "header");

    return dropdownHeaderVertexStorage;
  }

  createDropdownItemListVertex(graphStorage, component, parent) {
    const styleName = "dropdownListStyle" + component.id;
    const dropdownListStyle = StyleLibrary[0]["dropdown"]["dropdownList"];
    const styleStorage = new StyleStorage(styleName, dropdownListStyle);
    graphStorage.getGraph().getStylesheet().putCellStyle(styleName, dropdownListStyle);

    const dropdownListGeometry = new mxGeometry(0, 0, 200, parent.getVertexHeight() - 30);
    const dropdownItemListVertexStorage = graphStorage.insertVertex(parent.getVertex(), component.id, "", dropdownListGeometry, styleStorage, component);
    parent.addChild(dropdownItemListVertexStorage.id, dropdownItemListVertexStorage.getVertex(), "itemList");

    return dropdownItemListVertexStorage;
  }

  createComponent(graphStorage: GraphStorage, component, parent) {
    let dropdownBoxVertexStorage = this.createDropdownBoxVertex(graphStorage, component, parent);
    let dropdownHeaderVertexStorage = this.createDropdownHeaderVertex(graphStorage, component, dropdownBoxVertexStorage);
    let dropdownItemListVertexStorage = this.createDropdownItemListVertex(graphStorage, component, dropdownBoxVertexStorage);

    let index = 0;
    const itemList = component.items.split(" ");
    // insert dropdown item
    for (const element of itemList) {
      let dataBinding = this.createDataBinding(index);
      const dropdownItemGeometry = new mxGeometry(0, 23 + 30 + 30 * index, 200, 30);
      const styleName = "dropdownItemstyle" + component.id;
      const dropdownItemStyle = StyleLibrary[0]["dropdown"]["dropdownItem"];
      const styleStorage = new StyleStorage(styleName, dropdownItemStyle);
      graphStorage.getGraph().getStylesheet().putCellStyle(styleName, dropdownItemStyle);
      const dropdownItemVertexStorage = graphStorage.insertVertex(dropdownItemListVertexStorage.getVertex(), component.id, element, dropdownItemGeometry, styleStorage, component,dataBinding);
      dropdownBoxVertexStorage.addChild(dropdownItemVertexStorage.id, dropdownItemVertexStorage.getVertex(), "items");
      index += 1;
    }

    component.width = dropdownBoxVertexStorage.getVertexWidth();
    component.height = dropdownBoxVertexStorage.getVertexHeight();

    return dropdownBoxVertexStorage;
  }
}
