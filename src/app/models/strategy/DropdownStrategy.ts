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
        let styleName = "style" + component.id + "dropdownBox";
        let style = {"overflow":true};
        let styleStorage = new StyleStorage(styleName,style)
        graphStorage.getGraph().getStylesheet().putCellStyle(styleName,style);
        let dropdownVertex = graphStorage.insertVertex(parent,component.id,"",300,200,styleStorage,component);

        styleName = "style" + component.id + "dropdownHeader";
        styleStorage = new StyleStorage(styleName,style);
        graphStorage.getGraph().getStylesheet().putCellStyle(styleName,style);

        let dropdownHeaderVertex = graphStorage.insertVertex(dropdownVertex,component.id+"header","",200,30,styleStorage,component);
        let itemList = component.items[0]
        itemList = itemList.split(" ")
        for(let element of itemList) {
            styleName = "style" + component.id + "dropdownHeader";
            styleStorage = new StyleStorage(styleName,style);
            graphStorage.getGraph().getStylesheet().putCellStyle(styleName,style);
            let dropdownItemVertex = graphStorage.insertVertex(dropdownVertex,component.id+"item",element,150,30,styleStorage,component);
        }
    }
}