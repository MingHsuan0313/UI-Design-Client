import { ICreateComponentStrategy } from "./ICreateComponentStrategy";
import { GraphStorage } from "../graph-storage.model";
import { StyleLibrary } from "../../shared/styleLibrary";
import { StyleStorage } from "../style-storage.model";
import { DataBinding } from "../util/DataBinding";

export class ButtonStrategy implements ICreateComponentStrategy {
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

    createDataBinding() {
        let dataBindingName = "text";
        let hasDataBining = true;
        let isList = -1;
        let dataBinding = new DataBinding(
            hasDataBining,
            dataBindingName,
            isList
        )
        return dataBinding;
    }

    createComponent(graphStorage: GraphStorage, component, parent) {
        let dataBinding = this.createDataBinding();

        // style
        let style = StyleLibrary[0]["button"];
        let styleName = "style" + component.id;
        let styleStorage = new StyleStorage(styleName, style);
        graphStorage.getGraph().getStylesheet().putCellStyle(styleName, style);

        // insert vertex
        let width = 15 * component.text.length;
        let height = 40;
        let buttonGeometry = new mxGeometry(this.basex, this.basey, width, height);
        let vertexStorage = graphStorage.insertVertex(parent, component.id, component.text, buttonGeometry, styleStorage, component, dataBinding);

        // binding with internal representation
        component.x = this.basex.toString();
        component.y = this.basey.toString();
        component.width = width;
        component.height = height;

        // component.vertexStorage = vertexStorage
        return vertexStorage;
    }
}