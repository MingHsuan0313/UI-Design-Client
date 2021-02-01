import { ICreateComponentStrategy } from "./ICreateComponentStrategy";
import { StyleLibrary } from "../../../shared/styleLibrary";
import { DataBinding } from "../util/DataBinding";
import { GraphStorage, VertexStorage, StyleStorage } from "../../graph-dependency";
import { SelabEditor } from "../selab-editor.model";
import { FormComponent } from "../../ui-component-dependency";
import { SelabVertex } from "../selabVertex.model";

// no need for data binidng
export class FormStrategy extends ICreateComponentStrategy {

    constructor(geometry?, restoreMode?) {
        super(geometry, restoreMode);
        if(!this.restoreMode){
            this.width = 300;
            this.height = 300;
          }
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
        const formVertexGeometry = new mxGeometry(this.basex, this.basey, this.width, this.height);
        let id = (parseInt(component.id)).toString();
        let selabVertex = new SelabVertex()
            .setID(component.selector + "-" + id)
            .setParentID(parent.id)
            .setIsPrimary(true)
            .setUIComponentID(component.id)
        let formBoxCell = selabEditor.insertVertex(selabVertex, component, formVertexGeometry, formBoxStyle);

        // const formVertexStorage = selabEditor.insertVertex(parent, component.id, "", formVertexGeometry, styleStorage, component);
        // formVertexStorage.setIsPrimary(true);
        formBoxCell["componentPart"] = "box";
        formBoxCell["dataBinding"] = this.createDataBinding("box");
        formBoxCell["isPrimary"] = true;
        formBoxCell["componentID"] = component.id;
        return formBoxCell;
    }

    createComponent(selabEditor: SelabEditor, component: FormComponent, parent: mxCell) {
        let formBoxCell = this.createFormBoxVertex(selabEditor, component, parent);
        let subComponentXOffset = 15;
        let subComponentYOffset = 40;
        let maxWidth = 200;
        for (let subUIComponent of component["componentList"]) {
            let vertex;
            // console.log(subUIComponent)
            // console.log(this.restoreMode)
            if(!this.restoreMode){
                vertex = selabEditor.createComponent(subUIComponent, formBoxCell, new mxGeometry(subComponentXOffset, subComponentYOffset,0,0))
                if (vertex["geometry"].width > maxWidth)
                maxWidth = vertex["geometry"].width;
                subComponentYOffset = subComponentYOffset + vertex["geometry"].height + 10;
            }else{
                vertex = selabEditor.createComponent(subUIComponent, formBoxCell, subUIComponent.geometry, true)
            }
        }
        if(!this.restoreMode){
            let newmxGeometry = new mxGeometry(this.basex, this.basey, maxWidth + 50, subComponentYOffset);
            formBoxCell.setGeometry(newmxGeometry);
            selabEditor.getGraph().refresh();
        }
        return formBoxCell;
    }
}
