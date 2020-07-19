import { ICreateComponentStrategy } from "./ICreateComponentStrategy";
import { GraphStorage } from "../graph-storage.model";
import { StyleLibrary } from "../../shared/styleLibrary";
import StyleStorage from "../style-storage.model";
import DataBinding from "../util/DataBinding";

export class ButtonStrategy implements ICreateComponentStrategy {
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
        this.strategyName = "Button Strategy";
    }

    createComponent(graphStorage:GraphStorage,component,parent) {
        let style = StyleLibrary[0]["button"];
        let styleName = "style" + component.id;
        let styleStorage = new StyleStorage(styleName,style);
        graphStorage.getGraph().getStylesheet().putCellStyle(styleName,style);
        let width = 15 * component.text.length;
        let buttonGeometry = new mxGeometry(this.basex,this.basey,width,40);
        let hasDataBining = true;
        let dataBindingName = "text";
        let isList = -1;
        let dataBinding = new DataBinding(
            hasDataBining,
            dataBindingName,
            isList
        )
        let vertexStorage = graphStorage.insertVertex(parent,component.id,component.text,buttonGeometry,styleStorage,component,dataBinding);
        component.width = width;
        component.height = 40;
        component.vertexStorage = vertexStorage
        
    }
}