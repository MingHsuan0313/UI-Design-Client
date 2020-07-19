import { ICreateComponentStrategy } from "./ICreateComponentStrategy";
import { GraphStorage } from "../graph-storage.model";
import { StyleLibrary } from "../../shared/styleLibrary";
import StyleStorage from "../style-storage.model";
import DataBinding from "../util/DataBinding";

export class TextStrategy implements ICreateComponentStrategy {
    strategyName: string;
    basex: number;
    basey: number;
    constructor(basex?,basey?) {
        // basic component
        if(basex == undefined || basey == undefined) {
            this.basex = 0;
            this.basey = 0;
        }
        // inside composite component
        else {
            this.basex = basex;
            this.basey = basey;
        }

        this.strategyName = "Text Strategy";
    }

    createComponent(graphStorage:GraphStorage,component,parent) {
        console.log("ready create text")
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
        let textGeometry = new mxGeometry(this.basex + 5,this.basey,30,30);
        console.log("ready create text2")
        graphStorage.getGraph().getStylesheet().putCellStyle(styleName,style);
        let textVertexStorage = graphStorage.insertVertex(parent,component.id,component.text,textGeometry,styleStorage,component,dataBinding);
        return {
            "vertexStorage": textVertexStorage,
            "width": 30,
            "height": 30
        }

    }
}