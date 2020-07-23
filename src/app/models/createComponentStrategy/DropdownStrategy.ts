import { ICreateComponentStrategy } from "./ICreateComponentStrategy";
import { GraphStorage } from "../graph-storage.model";
import { StyleLibrary } from "../../shared/styleLibrary";
import { StyleStorage } from "../style-storage.model";
import { DataBinding } from "../util/DataBinding";

export class DropdownStrategy implements ICreateComponentStrategy {
    strategyName: string;
    basex: number;
    basey: number;
    constructor(basex?, basey?) {
        // basic component
        if (basex == undefined || basey == undefined) {
            this.basex = 0;
            this.basey = 0;
        }
        // inside composite component
        else {
            this.basex = basex;
            this.basey = basey;
        }
        this.strategyName = "Dropdown Strategy";
    }

    createBoxVertex(graphStorage, component, parent) {
        let itemCount = component.items.split(" ").length;
        let dropdownHeight = 30 * (itemCount);
        console.log("dropdown Height")
        console.log(dropdownHeight)

        // insert dropdown box
        let styleName = "dropdownBoxStyle" + component.id;
        let dropdownBoxStyle = StyleLibrary[0]["dropdownBox"];
        let styleStorage = new StyleStorage(styleName, dropdownBoxStyle)
        graphStorage.getGraph().getStylesheet().putCellStyle(styleName, dropdownBoxStyle);
        let dropdownVertexGeometry = new mxGeometry(this.basex, this.basey, 200, dropdownHeight);
        let dropdownVertexStorage = graphStorage.insertVertex(parent, component.id, "", dropdownVertexGeometry, styleStorage, component);

        return dropdownVertexStorage;
    }

    createHeaderVertex(graphStorage, component, parent) {
        let styleName = "dropdownHeaderStyle" + component.id;
        let dropdownHeaderStyle = StyleLibrary[0]["dropdownHeader"];
        let styleStorage = new StyleStorage(styleName, dropdownHeaderStyle);
        graphStorage.getGraph().getStylesheet().putCellStyle(styleName, dropdownHeaderStyle);
        let dropdownHeaderGeometry = new mxGeometry(this.basex, this.basey, 200, 30);
        let dropdownHeaderVertexStorage = graphStorage.insertVertex(parent.getVertex(), component.id + "header", "", dropdownHeaderGeometry, styleStorage, component);
        parent.addChild(dropdownHeaderVertexStorage.id)

        return dropdownHeaderVertexStorage;
    }

    createItemListVertex(graphStorage, component, parent) {
        let dropdownHeight = parent.getVertexHeight();

        let styleName = "dropdownListStyle" + component.id;
        let dropdownListStyle = StyleLibrary[0]["dropdownList"];
        let styleStorage = new StyleStorage(styleName, dropdownListStyle);
        graphStorage.getGraph().getStylesheet().putCellStyle(styleName, dropdownListStyle);

        let dropdownListGeometry = new mxGeometry(0, 30, 200, dropdownHeight - 30);
        let dropdownItemListVertexStorage = graphStorage.insertVertex(parent.getVertex(), component.id + "itemList", "", dropdownListGeometry, styleStorage, component);
        parent.addChild(dropdownItemListVertexStorage.id);

        return dropdownItemListVertexStorage;

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

    createComponent(graphStorage: GraphStorage, component, parent) {
        console.log("dsakdsasdsasadsacccomponent here")
        console.log(component)
        let dropdownBoxVertexStorage = this.createBoxVertex(graphStorage, component, parent);
        // let itemCount = component.items.length;
        // let dropdownHeight = 30 * (itemCount + 1);

        // // insert dropdown box
        // let styleName = "dropdownBoxStyle" + component.id;
        // let dropdownBoxStyle = StyleLibrary[0]["dropdownBox"];
        // let styleStorage = new StyleStorage(styleName, dropdownBoxStyle)
        // graphStorage.getGraph().getStylesheet().putCellStyle(styleName, dropdownBoxStyle);
        // let dropdownVertexGeometry = new mxGeometry(this.basex, this.basey, 220, dropdownHeight);
        // let dropdownVertexStorage = graphStorage.insertVertex(parent, component.id, "", dropdownVertexGeometry, styleStorage, component);

        // component.width = 220;
        // component.height = dropdownHeight;

        // insert dropdown header 
        let dropdownHeaderVertexStorage = this.createHeaderVertex(graphStorage, component, dropdownBoxVertexStorage);

        // insert dropdown list
        let dropdownItemListVertexStorage = this.createItemListVertex(graphStorage, component, dropdownBoxVertexStorage);




        let index = 0;
        let itemList = component.items.split(" ");
        console.log("Hello item list hereee")
        console.log(itemList)
        // insert dropdown item
        for (let element of itemList) {
            console.log(element)
            let dataBinding = this.createDataBinding(index);


            let dropdownItemGeometry = new mxGeometry(3, 30 * index, 200, 30)

            let styleName = "dropdownHeaderstyle" + component.id;
            let dropdownItemStyle = StyleLibrary[0]["dropdownItem"];
            let styleStorage = new StyleStorage(styleName, dropdownItemStyle);
            graphStorage.getGraph().getStylesheet().putCellStyle(styleName, dropdownItemStyle);
            let dropdownItemVertexStorage = graphStorage.insertVertex(dropdownItemListVertexStorage.getVertex(), component.id + "item" + index, element, dropdownItemGeometry, styleStorage, component, dataBinding);
            dropdownItemListVertexStorage.addChild(dropdownItemVertexStorage.id);
            index += 1;
        }

        component.x = this.basex;
        component.y = this.basey;
        component.width = dropdownBoxVertexStorage.getVertexWidth();
        component.height = dropdownBoxVertexStorage.getVertexHeight();

        return dropdownBoxVertexStorage;
    }
}