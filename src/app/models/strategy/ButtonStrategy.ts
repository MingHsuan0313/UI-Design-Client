import { ICreateComponentStrategy } from "./ICreateComponentStrategy";
import { GraphStorage } from "../graph-storage.model";
import { StyleLibrary } from "../../shared/styleLibrary";
import StyleStorage from "../style-storage.model";

export class ButtonStrategy implements ICreateComponentStrategy {
    strategyName: string;
    constructor() {
        this.strategyName = "Button Strategy";
    }

    createComponent(graphStorage:GraphStorage,component,parent) {
        let style = StyleLibrary[0]["button"];
        console.log("Button Strategy") 
        console.log(component)
        let styleName = "style" + component.id;
        let styleStorage = new StyleStorage(styleName,style);
        graphStorage.getGraph().getStylesheet().putCellStyle(styleName,style);
        let width = 10 * component.text.length;
        graphStorage.insertVertex(parent,component.id,component.text,width,30,styleStorage);
    }
}