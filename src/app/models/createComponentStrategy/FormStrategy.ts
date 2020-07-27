import { ICreateComponentStrategy } from "./ICreateComponentStrategy";
import { StyleLibrary } from "../../shared/styleLibrary";
import { GraphStorage } from "../graph-storage.model";
import { StyleStorage } from "../style-storage.model";
import { DataBinding } from "../util/DataBinding";


export class FormStrategy implements ICreateComponentStrategy {
    strategyName: string;
    basex: number;
    basey: number;

    constructor(basex?, basey?) {
        // basic component
        if (basex == undefined || basey == undefined) {
            this.basex = 0;
            this.basey = 0;
        } else {
            this.basex = basex;
            this.basey = basey;
        }
        this.strategyName = "Form Strategy";
    }

    createDataBinding() {
        let dataBindingName = "header";
        let hasDataBining = true;
        let isList = -1;
        let dataBinding = new DataBinding(
            hasDataBining,
            dataBindingName,
            isList
        )
        return dataBinding;
    }

    createFormBoxVertex(graphStorage, component, parent) {
        let styleName = "formBoxStyle" + component.id;
        const formBoxStyle = StyleLibrary[0]["form"]["formBox"];
        let styleStorage = new StyleStorage(styleName, formBoxStyle);
        graphStorage.getGraph().getStylesheet().putCellStyle(styleName, formBoxStyle);
        const formVertexGeometry = new mxGeometry(0, 0, 300, 300);
        const formVertexStorage = graphStorage.insertVertex(parent, component.id, "", formVertexGeometry, styleStorage, component);
        formVertexStorage.setIsPrimary(true);
        return formVertexStorage;
    }

    createComponent(graphStorage: GraphStorage, component, parent) {
        let formBoxVertexStorage = this.createFormBoxVertex(graphStorage, component, parent);

        this.basey = 40;
        this.basex = 15;
        let maxWidth = 0;
        for (let subUIComponent of component["componentList"]) {
            let vertexStorage = graphStorage.createComponent(subUIComponent, formBoxVertexStorage.getVertex(), this.basex, this.basey)
            if (vertexStorage.getVertexWidth() > maxWidth)
                maxWidth = vertexStorage.getVertexWidth();
            this.basey = this.basey + vertexStorage.getVertexHeight();
            formBoxVertexStorage.addChild(vertexStorage.id, vertexStorage.getVertex(), "componentList", subUIComponent);
        }

        let newmxGeometry = new mxGeometry(0, 0, maxWidth+50, this.basey);
        formBoxVertexStorage.getVertex().setGeometry(newmxGeometry);
        graphStorage.getGraph().refresh();

        component.x = formBoxVertexStorage.getVertexX();
        component.y = formBoxVertexStorage.getVertexY();
        component.width = formBoxVertexStorage.getVertexWidth();
        component.height = formBoxVertexStorage.getVertexHeight();
        // component["style"] = formBoxVertexStorage.getStyle();
        return formBoxVertexStorage;
    }
}
