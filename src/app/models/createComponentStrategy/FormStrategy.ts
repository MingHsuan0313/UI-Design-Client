import { ICreateComponentStrategy } from "./ICreateComponentStrategy";
import { StyleLibrary } from "../../shared/styleLibrary";
import { DataBinding } from "../externalRepresentation/util/DataBinding";
import { GraphStorage , VertexStorage , StyleStorage } from "../graph-dependency";


// no need for data binidng
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

    createDataBinding(part, index?) {
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
        const formVertexGeometry = new mxGeometry(this.basex, this.basey, 300, 300);
        const formVertexStorage = graphStorage.insertVertex(parent, component.id, "", formVertexGeometry, styleStorage, component);
        formVertexStorage.setIsPrimary(true);
        formVertexStorage.vertex["componentPart"] = "box";
        formVertexStorage.vertex["dataBinding"] = this.createDataBinding("box");
        formVertexStorage.vertex["isPrimary"] = true;
        return formVertexStorage;
    }

    createComponent(graphStorage: GraphStorage, component, parent) {
        let formBoxVertexStorage = this.createFormBoxVertex(graphStorage, component, parent);


        let p1= 15;
        let p2 = 40;
        let maxWidth = 0;
        for (let subUIComponent of component["componentList"]) {
            let vertexStorage = graphStorage.createComponent(subUIComponent, formBoxVertexStorage.getVertex(), p1, p2)
            if (vertexStorage.getVertexWidth() > maxWidth)
                maxWidth = vertexStorage.getVertexWidth();
            p2 = p2 + vertexStorage.getVertexHeight() + 10;
            formBoxVertexStorage.addChild(vertexStorage.id, vertexStorage.getVertex(), "componentList", subUIComponent);
        }

        let newmxGeometry = new mxGeometry(this.basex, this.basey, maxWidth+50, p2);
        formBoxVertexStorage.getVertex().setGeometry(newmxGeometry);

        // this does not refresh dropdown vertex position; i guess
        graphStorage.getGraph().refresh();

        component.x = formBoxVertexStorage.getVertexX();
        component.y = formBoxVertexStorage.getVertexY();
        component.width = formBoxVertexStorage.getVertexWidth();
        component.height = formBoxVertexStorage.getVertexHeight();
        // component["style"] = formBoxVertexStorage.getStyle();
        return formBoxVertexStorage;
    }
}
