import { ICreateComponentStrategy } from "./ICreateComponentStrategy";
import { StyleLibrary } from "../../../shared/styleLibrary";
import { DataBinding } from "../util/DataBinding";
import { SelabEditor } from "../selab-editor.model";
import { DropdownComponent } from "../../internalRepresentation/DropdownComponent.model";
import { SelabVertex } from "../selabVertex.model";

export class DropdownStrategy extends ICreateComponentStrategy {

  constructor(geometry?, restoreMode?) {
    super(geometry, restoreMode);
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

  createDropdownBoxVertex(selabEditor: SelabEditor, component: DropdownComponent, parent: mxCell): mxCell {
    const itemCount = component.items.split(" ").length;
    const dropdownWidth = 200;
    const dropdownHeight = 30 * (itemCount + 1);
    const dropdownBoxStyle = StyleLibrary[0]["dropdown"]["dropdownBox"];
    const dropdownBoxVertexGeometry = new mxGeometry(this.basex, this.basey, dropdownWidth, dropdownHeight);

    let id = (parseInt(component.id)).toString();
    let selabVertex = new SelabVertex()
      .setID(component.selector + "-" + id)
      .setUIComponentID(component.id)
      .setParentID(parent.id)
      .setIsPrimary(true)
    let dropdownBoxCell = selabEditor.insertVertex(selabVertex, component, dropdownBoxVertexGeometry, dropdownBoxStyle);
    dropdownBoxCell["componentPart"] = "box";
    dropdownBoxCell["dataBinding"] = this.createDataBinding("box");
    dropdownBoxCell["isPrimary"] = true;
    dropdownBoxCell["componentID"] = component.id;
    return dropdownBoxCell;
  }

  createDropdownHeaderVertex(selabEditor: SelabEditor, component: DropdownComponent, parent: mxCell): mxCell {
    const dropdownHeaderStyle = StyleLibrary[0]["dropdown"]["dropdownHeader"];
    const dropdownHeaderGeometry = new mxGeometry(0, 20, 200, 30);
    let id = (parseInt(component.id) + 1).toString();
    let selabVertex = new SelabVertex()
      .setID(component.selector + "-" + id)
      .setUIComponentID(component.id)
      .setIsPrimary(false)
      .setParentID(parent.id)
    let dropdownHeaderCell = selabEditor.insertVertex(selabVertex, component, dropdownHeaderGeometry, dropdownHeaderStyle);
    dropdownHeaderCell["componentPart"] = "header";
    dropdownHeaderCell["dataBinding"] = this.createDataBinding("header");
    dropdownHeaderCell["isPrimary"] = false;
    dropdownHeaderCell["componentID"] = component.id;
    return dropdownHeaderCell;
  }

  createDropdownItemListVertex(selabEditor: SelabEditor, component: DropdownComponent, parent: mxCell): mxCell {
    const dropdownListStyle = StyleLibrary[0]["dropdown"]["dropdownList"];
    const dropdownListGeometry = new mxGeometry(0, 0, 200, parseInt(parent.geometry.height) - 30);
    let id = (parseInt(component.id) + 2).toString();
    let selabVertex = new SelabVertex()
      .setID(component.selector + "-" + id)
      .setUIComponentID(component.id)
      .setParentID(parent.id)
      .setIsPrimary(false);
    let dropdownListCell = selabEditor.insertVertex(selabVertex, component, dropdownListGeometry, dropdownListStyle);
    dropdownListCell["componentPart"] = "itemList";
    dropdownListCell["dataBinding"] = this.createDataBinding("itemList");
    dropdownListCell["isPrimary"] = false;
    dropdownListCell["componentID"] = component.id;
    return dropdownListCell;
  }

  createDropdownItemVertexs(selabEditor: SelabEditor, component:DropdownComponent, parent:mxCell) {
    let index = 0;
    const itemList = component.items.split(" ");
    // insert dropdown item
    for (const element of itemList) {
      let dataBinding = this.createDataBinding("item", index);
      const dropdownItemGeometry = new mxGeometry(0, 23 + 30 + 30 * index, 200, 30);
      let id = (parseInt(component.id) + 3 + index).toString();
      const dropdownItemStyle = StyleLibrary[0]["dropdown"]["dropdownItem"];
      let selabVertex = new SelabVertex()
        .setID(component.selector + "-" + id)
        .setUIComponentID(component.id)
        .setParentID(parent.id)
        .setIsPrimary(false)
        .setDataBinding(dataBinding)
        .setValue(component['items'].split(" ")[index]);
      
      let dropdownItemCell = selabEditor.insertVertex(selabVertex, component, dropdownItemGeometry,dropdownItemStyle);
      dropdownItemCell["componentPart"] = "item";
      dropdownItemCell["dataBinding"] = this.createDataBinding("item", index);
      dropdownItemCell["isPrimary"] = false;
      dropdownItemCell["componentID"] = component.id;
      index += 1;
    }
  }

  createComponent(selabEditor: SelabEditor, component:DropdownComponent, parent:mxCell): mxCell {
    let dropdownBoxVertexStorage = this.createDropdownBoxVertex(selabEditor, component, parent);
    let dropdownHeaderVertexStorage = this.createDropdownHeaderVertex(selabEditor, component, dropdownBoxVertexStorage);
    let dropdownItemListVertexStorage = this.createDropdownItemListVertex(selabEditor, component, dropdownBoxVertexStorage);
    this.createDropdownItemVertexs(selabEditor, component, dropdownItemListVertexStorage);
    return dropdownBoxVertexStorage;
  }
}