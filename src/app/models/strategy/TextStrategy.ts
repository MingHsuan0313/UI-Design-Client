import { ICreateComponentStrategy } from "./ICreateComponentStrategy";
import { GraphStorage } from "../graph-storage.model";
import { StyleLibrary } from "../../shared/styleLibrary";
import StyleStorage from "../style-storage.model";
import DataBinding from "../util/DataBinding";

export class TextStrategy implements ICreateComponentStrategy {
    strategyName: string;
    constructor() {
        this.strategyName = "Text Strategy";
    }

    createComponent(graphStorage:GraphStorage,component,parent) {
        let style = StyleLibrary[0]["text"];
        if(component["href"].length > 0) {
            style["fontColor"] = "blue";
        }

        let hasDataBinding = true;
        let dataBindingName = "text";
        let isList = -1;
        let dataBinding = new DataBinding(
            hasDataBinding,
            dataBindingName,
            isList
        )
        let styleName = "style" + component.id;
        let styleStorage = new StyleStorage(styleName,style);
        graphStorage.getGraph().getStylesheet().putCellStyle(styleName,style);
        graphStorage.insertVertex(parent,component.id,component.text,30,30,styleStorage,component,dataBinding);
    }
}