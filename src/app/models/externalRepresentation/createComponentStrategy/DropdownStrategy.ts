import { ICreateComponentStrategy } from "./ICreateComponentStrategy";
import { StyleLibrary } from "../../../shared/styleLibrary";
import { DataBinding } from "../util/DataBinding";
import { GraphStorage , VertexStorage , StyleStorage } from "../../graph-dependency";

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

  // part: like Box,Header,ItemList,Item...etc
  createDataBinding(part: String, index?) {
    if (part == "box")
    return new DataBinding(false, part, -1);
    else if (part == "header")
      return new DataBinding(false, part, -1);
    else if (part == "itemList")
      return new DataBinding(false, part, -1);
    else if (part == "item") {
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
    else
    return new DataBinding(false, part, -1);
  }

  createDropdownBoxVertex(graphStorage, component, parent) {
    const itemCount = component.items.split(" ").length;
    const dropdownWidth = 200;
    const dropdownHeight = 30 * (itemCount + 1);

    // insert dropdown box
    let styleName = "dropdownBoxStyle" + component.id;
    const dropdownBoxStyle = StyleLibrary[0]["dropdown"]["dropdownBox"];
    let styleStorage = new StyleStorage(styleName, dropdownBoxStyle);
    graphStorage.getGraph().getStylesheet().putCellStyle(styleName, dropdownBoxStyle);
    const dropdownBoxVertexGeometry = new mxGeometry(this.basex, this.basey, dropdownWidth, dropdownHeight);
    const dropdownBoxVertexStorage = graphStorage.insertVertex(parent, component.id, "", dropdownBoxVertexGeometry, styleStorage, component);
    dropdownBoxVertexStorage.setIsPrimary(true);

    dropdownBoxVertexStorage.vertex["componentPart"] = "box";
    dropdownBoxVertexStorage.vertex["dataBinding"] = this.createDataBinding("box");
    dropdownBoxVertexStorage.vertex["isPrimary"] = true;
    return dropdownBoxVertexStorage;
  }

  createDropdownHeaderVertex(graphStorage, component, parent) {
    const styleName = "dropdownHeaderStyle" + component.id;
    const dropdownHeaderStyle = StyleLibrary[0]["dropdown"]["dropdownHeader"];
    const styleStorage = new StyleStorage(styleName, dropdownHeaderStyle);
    graphStorage.getGraph().getStylesheet().putCellStyle(styleName, dropdownHeaderStyle);
    const dropdownHeaderGeometry = new mxGeometry(0, 20, 200, 30);
    const dropdownHeaderVertexStorage = graphStorage.insertVertex(parent.getVertex(),component.id, "", dropdownHeaderGeometry, styleStorage, component);
    parent.addChild(dropdownHeaderVertexStorage.id, dropdownHeaderVertexStorage.getVertex(), "header");

    dropdownHeaderVertexStorage.vertex["componentPart"] = "header";
    dropdownHeaderVertexStorage.vertex["dataBinding"] = this.createDataBinding("header");
    dropdownHeaderVertexStorage.vertex["isPrimary"] = false;
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

    dropdownItemListVertexStorage.vertex["componentPart"] = "itemList";
    dropdownItemListVertexStorage.vertex["dataBinding"] = this.createDataBinding("itemList");
    dropdownItemListVertexStorage.vertex["isPrimary"] = false;
    return dropdownItemListVertexStorage;
  }

  createDropdownItemVertexs(graphStorage, component, parent, grandparent) {
    let index = 0;
    const itemList = component.items.split(" ");
    // insert dropdown item
    for (const element of itemList) {
      let dataBinding = this.createDataBinding("item",index);
      const dropdownItemGeometry = new mxGeometry(0, 23 + 30 + 30 * index, 200, 30);
      const styleName = "dropdownItemstyle" + component.id;
      const dropdownItemStyle = StyleLibrary[0]["dropdown"]["dropdownItem"];
      const styleStorage = new StyleStorage(styleName, dropdownItemStyle);
      graphStorage.getGraph().getStylesheet().putCellStyle(styleName, dropdownItemStyle);
      const dropdownItemVertexStorage = graphStorage.insertVertex(parent.getVertex(), component.id, element, dropdownItemGeometry, styleStorage, component, dataBinding);
      grandparent.addChild(dropdownItemVertexStorage.id, dropdownItemVertexStorage.getVertex(), "items");
      
      dropdownItemVertexStorage.vertex["componentPart"] = "item";
      dropdownItemVertexStorage.vertex["dataBinding"] = this.createDataBinding("item", index);
      dropdownItemVertexStorage.vertex["isPrimary"] = false;
      index += 1;
    }
  }

  createComponent(graphStorage: GraphStorage, component, parent) {
    console.log("dropdown strategy hereeee");
    let dropdownBoxVertexStorage = this.createDropdownBoxVertex(graphStorage, component, parent);
    let dropdownHeaderVertexStorage = this.createDropdownHeaderVertex(graphStorage, component, dropdownBoxVertexStorage);
    let dropdownItemListVertexStorage = this.createDropdownItemListVertex(graphStorage, component, dropdownBoxVertexStorage);
    this.createDropdownItemVertexs(graphStorage, component, dropdownItemListVertexStorage, dropdownBoxVertexStorage);

    component["x"] = dropdownBoxVertexStorage.getVertexX();
    component["y"] = dropdownBoxVertexStorage.getVertexY();
    component["width"] = dropdownBoxVertexStorage.getVertexWidth();
    component["height"] = dropdownBoxVertexStorage.getVertexHeight();
    // component["style"] = dropdownBoxVertexStorage.getStyle();

    return dropdownBoxVertexStorage;
  }
}

