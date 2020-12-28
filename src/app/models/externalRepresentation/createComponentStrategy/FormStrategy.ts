import { ICreateComponentStrategy } from "./ICreateComponentStrategy";
import { StyleLibrary } from "../../../shared/styleLibrary";
import { DataBinding } from "../util/DataBinding";
import { GraphStorage, VertexStorage, StyleStorage } from "../../graph-dependency";
import { SelabEditor } from "../selab-editor.model";
import { FormComponent } from "../../ui-component-dependency";
import { SelabVertex } from "../selabVertex.model";

// no need for data binidng
export class FormStrategy implements ICreateComponentStrategy {
    strategyName: string;
    basex: number;
    basey: number;

    constructor(basex?: number, basey?: number) {
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

    createDataBinding(part: string, index?: number) {
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

    createFormBoxVertex(selabEditor: SelabEditor, component: FormComponent, parent: mxCell): mxCell {
        const formBoxStyle = StyleLibrary[0]["form"]["formBox"];
        const formVertexGeometry = new mxGeometry(this.basex, this.basey, 300, 300);
        let id = (parseInt(component.getId())).toString();
        let selabVertex = new SelabVertex()
            .setID(component.getSelector() + "-" + id)
            .setParentID(parent.id)
            .setIsPrimary(true)
            .setUIComponentID(component.getId())
        let formBoxCell = selabEditor.insertVertex(selabVertex, component, formVertexGeometry, formBoxStyle);

        // const formVertexStorage = selabEditor.insertVertex(parent, component.id, "", formVertexGeometry, styleStorage, component);
        // formVertexStorage.setIsPrimary(true);
        formBoxCell["componentPart"] = "box";
        formBoxCell["dataBinding"] = this.createDataBinding("box");
        formBoxCell["isPrimary"] = true;
        formBoxCell["componentID"] = component.getId();
        return formBoxCell;
    }

    createComponent(selabEditor: SelabEditor, component: FormComponent, parent: mxCell) {
        let formBoxCell = this.createFormBoxVertex(selabEditor, component, parent);
        let p1 = 15;
        let p2 = 40;
        let maxWidth = 250;
        for (let subUIComponent of component["componentList"]) {
            let vertex = selabEditor.createComponent(subUIComponent, formBoxCell, p1, p2)
            if (vertex["geometry"].width > maxWidth)
                maxWidth = vertex["geometry"].width;
            p2 = p2 + vertex["geometry"].height + 10;
        }
        let newmxGeometry = new mxGeometry(this.basex, this.basey, maxWidth + 50, p2);
        formBoxCell.setGeometry(newmxGeometry);
        selabEditor.getGraph().refresh();
        return formBoxCell;
    }
}
