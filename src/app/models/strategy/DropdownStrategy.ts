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
        console.log("hello start dropdown strategy")
        console.log(component)
        let styleName = "style" + component.id + "dropdownBox";
        let style = {"overflow":true};
        let styleStorage = new StyleStorage(styleName,style)
        graphStorage.getGraph().getStylesheet().putCellStyle(styleName,style);
        let dropdownVertex = graphStorage.insertVertex(parent,component.id,"",550,200,styleStorage,component);

        styleName = "style" + component.id + "dropdownHeader";
        styleStorage = new StyleStorage(styleName,style);
        graphStorage.getGraph().getStylesheet().putCellStyle(styleName,style);

        let dropdownHeaderVertex = graphStorage.insertVertex(dropdownVertex,component.id,"",80,50,styleStorage,component);
        console.log("graph here")
        console.log(graphStorage.getLastVertexGeometry())
        console.log(graphStorage.getGraph())
    }
}