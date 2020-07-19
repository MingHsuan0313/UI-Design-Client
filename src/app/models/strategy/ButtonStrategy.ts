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
        let styleName = "style" + component.id;
        let styleStorage = new StyleStorage(styleName,style);
        graphStorage.getGraph().getStylesheet().putCellStyle(styleName,style);
        let width = 15 * component.text.length;
        let buttonGeometry = new mxGeometry(0,0,width,40);
        graphStorage.insertVertex(parent,component.id,component.text,buttonGeometry,styleStorage,component);
    }
}