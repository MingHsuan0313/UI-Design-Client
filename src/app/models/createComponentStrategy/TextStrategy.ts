import { ICreateComponentStrategy } from "./ICreateComponentStrategy";
import { GraphStorage } from "../graph-storage.model";
import { StyleLibrary } from "../../shared/styleLibrary";
import { StyleStorage } from "../style-storage.model";
import { DataBinding } from "../util/DataBinding";
import { Text } from '../modelDependency'

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

    createDataBinding() {
        let hasDataBinding = true;
        let dataBindingName = "text";
        let isList = -1;
        let dataBinding = new DataBinding(
            hasDataBinding,
            dataBindingName,
            isList
        )
        return dataBinding;
    }

    createComponent(graphStorage:GraphStorage,component: Text,parent) {
        console.log("ready create text")
        let dataBinding = this.createDataBinding();

        let style = StyleLibrary[0]["text"];
        if(component["href"].length > 0) {
            style["fontColor"] = "blue";
        }
        let styleName = "style" + component.id;
        let styleStorage = new StyleStorage(styleName,style);
        graphStorage.getGraph().getStylesheet().putCellStyle(styleName,style);

        let width = 30;
        let height = 30;
        let textGeometry = new mxGeometry(this.basex,this.basey,width,height);
        let vertexStorage = graphStorage.insertVertex(parent,component.id,component.text,textGeometry,styleStorage,component,dataBinding);

        // binding width height x y with internal representation
        component.width = width.toString();
        component.height = height.toString();
        component.x = this.basex.toString();
        component.y = this.basey.toString();

        return vertexStorage;
    }
}