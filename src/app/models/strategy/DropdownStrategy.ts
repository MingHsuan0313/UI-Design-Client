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
        let styleName = "dropdownBoxstyle" + component.id;
        let style = {"overflow":true};
        let styleStorage = new StyleStorage(styleName,style)
        graphStorage.getGraph().getStylesheet().putCellStyle(styleName,style);
        let dropdownVertexStorage = graphStorage.insertVertex(parent,component.id,"",300,200,styleStorage,component);
        console.log(dropdownVertexStorage.isBasicComponent())

        styleName = "dropdownHeaderstyle" + component.id;
        styleStorage = new StyleStorage(styleName,style);
        graphStorage.getGraph().getStylesheet().putCellStyle(styleName,style);

        let dropdownHeaderVertexStorage = graphStorage.insertVertex(dropdownVertexStorage.getVertex(),component.id+"header","",200,30,styleStorage,component);
        dropdownVertexStorage.addChild(dropdownHeaderVertexStorage.id);
        console.log(dropdownHeaderVertexStorage.isBasicComponent())

        let dropdownItemListVertexStorage = graphStorage.insertVertex(dropdownVertexStorage.getVertex(),component.id+"itemList","",200,30,styleStorage,component);
        dropdownVertexStorage.addChild(dropdownItemListVertexStorage.id);
        console.log(dropdownItemListVertexStorage.isBasicComponent())

        let index = 0;
        let itemList = component.items;
        itemList = itemList.split(" ");
        for(let element of itemList) {
            styleName = "dropdownHeaderstyle" + component.id;
            styleStorage = new StyleStorage(styleName,style);
            graphStorage.getGraph().getStylesheet().putCellStyle(styleName,style);
            let dropdownItemVertexStorage = graphStorage.insertVertex(dropdownItemListVertexStorage.getVertex(),component.id + "item" + index,element,150,30,styleStorage,component);
            dropdownItemListVertexStorage.addChild(dropdownItemVertexStorage.id);
            console.log(dropdownItemVertexStorage.isBasicComponent())
            index += 1;
        }
    }
}