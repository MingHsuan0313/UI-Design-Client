import { ICreateComponentStrategy } from "./ICreateComponentStrategy";
import { GraphStorage } from "../graph-storage.model";
import { StyleLibrary } from "../../shared/styleLibrary";
import StyleStorage from "../style-storage.model";

export class TableStrategy implements ICreateComponentStrategy {
    strategyName: string;
    constructor() {
        this.strategyName = "Button Strategy";
    }

    createComponent(graphStorage: GraphStorage, component, parent) {
        console.log("compoennt here")
        console.log(component)
        let styleName = "tableBoxstyle" + component.id;
        let style = { "overflow": true };
        let styleStorage = new StyleStorage(styleName, style);
        graphStorage.getGraph().getStylesheet().putCellStyle(styleName, style);
        let tableBoxVertex = graphStorage.insertVertex(parent, component.id, "", 200, 100, styleStorage, component);

        styleName = "tableHeaderstyle" + component.id;
        style = { "overflow": true };
        styleStorage = new StyleStorage(styleName, style);
        graphStorage.getGraph().getStylesheet().putCellStyle(styleName, style);
        let tableHeaderVertex = graphStorage.insertVertex(tableBoxVertex, component.id, "", 100, 40, styleStorage, component);

        let itemList = component.headers;
        itemList = itemList.split(" ");
        for (let element of itemList) {
            styleName = "tableCellstyle" + component.id;
            styleStorage = new StyleStorage(styleName, style);
            graphStorage.getGraph().getStylesheet().putCellStyle(styleName, style);
            let dropdownItemVertex = graphStorage.insertVertex(tableHeaderVertex, component.id + "item", element, 150, 30, styleStorage, component);
        }
    }
}