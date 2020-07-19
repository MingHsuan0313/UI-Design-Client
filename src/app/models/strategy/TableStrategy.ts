import { ICreateComponentStrategy } from "./ICreateComponentStrategy";
import { GraphStorage } from "../graph-storage.model";
import { StyleLibrary } from "../../shared/styleLibrary";
import StyleStorage from "../style-storage.model";

export class TableStrategy implements ICreateComponentStrategy {
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

        this.strategyName = "Button Strategy";
    }

    createComponent(graphStorage: GraphStorage, component, parent) {
        console.log("compoennt here")
        console.log(component)
        let styleName = "tableBoxstyle" + component.id;
        let style = { "overflow": true };
        let styleStorage = new StyleStorage(styleName, style);
        graphStorage.getGraph().getStylesheet().putCellStyle(styleName, style);
        let tableBoxVertexStorage = graphStorage.insertVertex(parent, component.id, "", 200, 100, styleStorage, component);

        styleName = "tableHeaderstyle" + component.id;
        style = { "overflow": true };
        styleStorage = new StyleStorage(styleName, style);
        graphStorage.getGraph().getStylesheet().putCellStyle(styleName, style);
        let tableHeaderVertexStorage = graphStorage.insertVertex(tableBoxVertexStorage.getVertex(), component.id + "header", "", 100, 40, styleStorage, component);
        tableBoxVertexStorage.addChild(tableHeaderVertexStorage.id);

        let itemList = component.headers;
        itemList = itemList.split(" ");
        let index = 0;
        for (let element of itemList) {
            styleName = "tableCellstyle" + component.id;
            styleStorage = new StyleStorage(styleName, style);
            graphStorage.getGraph().getStylesheet().putCellStyle(styleName, style);
            let tableHeaderElementVertexStorage = graphStorage.insertVertex(tableHeaderVertexStorage.getVertex(), component.id + "item" + index, element, 150, 30, styleStorage, component);
            tableHeaderVertexStorage.addChild(tableHeaderElementVertexStorage.id);
            index += 1
        }
    }
}