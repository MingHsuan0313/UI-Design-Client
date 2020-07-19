import { ICreateComponentStrategy } from "./ICreateComponentStrategy";
import { GraphStorage } from "../graph-storage.model";
import { StyleLibrary } from "../../shared/styleLibrary";
import StyleStorage from "../style-storage.model";

export class DropdownStrategy implements ICreateComponentStrategy {
    strategyName: string;
    constructor() {
        this.strategyName = "Dropdown Strategy";
    }

    createComponent(graphStorage:GraphStorage,component,parent) {
        let itemCount = component.items.split(" ").length;
        let dropdownHeight = 30 * (itemCount + 1);

        // insert dropdown box
        let styleName = "dropdownBoxStyle" + component.id;
        let dropdownBoxStyle = StyleLibrary[0]["dropdownBox"];
        let styleStorage = new StyleStorage(styleName,dropdownBoxStyle)
        graphStorage.getGraph().getStylesheet().putCellStyle(styleName,dropdownBoxStyle);
        let dropdownVertexGeometry = new mxGeometry(0,0,220,dropdownHeight);
        let dropdownVertexStorage = graphStorage.insertVertex(parent,component.id,"",dropdownVertexGeometry,styleStorage,component);
        console.log(dropdownVertexStorage.isBasicComponent())

        // insert dropdown header 
        styleName = "dropdownHeaderStyle" + component.id;
        let dropdownHeaderStyle = StyleLibrary[0]["dropdownHeader"];
        styleStorage = new StyleStorage(styleName,dropdownHeaderStyle);
        graphStorage.getGraph().getStylesheet().putCellStyle(styleName,dropdownHeaderStyle);
        let dropdownHeaderGeometry = new mxGeometry(0,0,200,30);
        let dropdownHeaderVertexStorage = graphStorage.insertVertex(dropdownVertexStorage.getVertex(),component.id+"header","",dropdownHeaderGeometry,styleStorage,component);
        dropdownVertexStorage.addChild(dropdownHeaderVertexStorage.id);
        console.log(dropdownHeaderVertexStorage.isBasicComponent())

        // insert dropdown list
        styleName = "dropdownListStyle" + component.id;
        let dropdownListStyle = StyleLibrary[0]["dropdownList"];
        styleStorage = new StyleStorage(styleName,dropdownListStyle);
        graphStorage.getGraph().getStylesheet().putCellStyle(styleName,dropdownListStyle);
        console.log("asdjsaa")
        console.log(styleStorage)
        let dropdownListGeometry = new mxGeometry(0 + 3,30,200 - 5,dropdownHeight - 30);
        let dropdownItemListVertexStorage = graphStorage.insertVertex(dropdownVertexStorage.getVertex(),component.id+"itemList","",dropdownListGeometry,styleStorage,component);
        dropdownVertexStorage.addChild(dropdownItemListVertexStorage.id);
        console.log(dropdownItemListVertexStorage.isBasicComponent())
        console.log(graphStorage.getGraph().getStylesheet())

        let index = 0;
        let itemList = component.items;
        itemList = itemList.split(" ");
        for(let element of itemList) {
            let dropdownItemGeometry = new mxGeometry(0 + 3,30 * index,200 - 5,30)
            console.log(dropdownItemGeometry)
            styleName = "dropdownHeaderstyle" + component.id;
            let dropdownItemStyle = StyleLibrary[0]["dropdownItem"];
            styleStorage = new StyleStorage(styleName,dropdownItemStyle);
            graphStorage.getGraph().getStylesheet().putCellStyle(styleName,dropdownItemStyle);
            let dropdownItemVertexStorage = graphStorage.insertVertex(dropdownItemListVertexStorage.getVertex(),component.id + "item" + index,element,dropdownItemGeometry,styleStorage,component);
            dropdownItemListVertexStorage.addChild(dropdownItemVertexStorage.id);
            console.log(dropdownItemVertexStorage.isBasicComponent())
            index += 1;
        }
    }
}