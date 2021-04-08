import { ICreateComponentStrategy } from "./ICreateComponentStrategy";
import { StyleLibrary } from "../../../shared/styleLibrary";
import { DataBinding } from "../util/DataBinding";
import { SelabEditor } from "../selab-editor.model";
import { SelabVertex } from "../selabVertex.model";
import { PaginationComponent } from "../../internalRepresentation/PaginationComponent.model";

export class PaginationStrategy extends ICreateComponentStrategy {



    constructor(geometry?, restoreMode?) {
        super(geometry, restoreMode);
    }

    createDataBinding(part) {
        let hasDataBinding = true;
        let dataBindingName = "pagination";
        let isList = -1;
        let dataBinding = new DataBinding(
            hasDataBinding,
            dataBindingName,
            isList
        )
        return dataBinding;
    }


    createPageBox(selabEditor: SelabEditor, pageComponent: PaginationComponent, parent: mxCell) {
        const dataBinding = this.createDataBinding("pagination");
        const style = StyleLibrary[0]["pagebox"];
        const width = 308;
        const height = 28;
        const boxGeometry = new mxGeometry(this.basex, this.basey, width, height);
        let selabVertex = new SelabVertex(pageComponent.id, pageComponent.id, parent.id)
        
        let id = (parseInt(pageComponent.id)).toString();
        selabVertex = selabVertex
            .setID(id)
            .setIsPrimary(true)
            .setValue(pageComponent.text)
            .setDataBinding(dataBinding);
        let boxCell = selabEditor.insertVertex(selabVertex, pageComponent, boxGeometry, style);
        
        boxCell["componentID"] = pageComponent.id;
        boxCell["type"] = pageComponent.type;
        boxCell["name"] = pageComponent.name;

        return boxCell;
    }

    createPageTag(selabEditor: SelabEditor, pageComponent, parent: mxCell) {
        const dataBinding = this.createDataBinding("pagination");
        const style = StyleLibrary[0]["page"];
        const width = 28;
        const height = 28;

        for (let i = 0; i < 5; i++) {
            let tagGeometry = new mxGeometry(i * 28, 0, width, height);
            let selabVertex = new SelabVertex(pageComponent.id, pageComponent.id, parent.id)
            
            let id = (parseInt(pageComponent.id)).toString();
            selabVertex = selabVertex
                .setID(id)
                .setIsPrimary(true)
                .setValue(String(i+1))
                .setDataBinding(dataBinding);
            let tagCell = selabEditor.insertVertex(selabVertex, pageComponent, tagGeometry, style);
        }
        let tagGeometry = new mxGeometry(5 * 28, 0, width, height);
        let selabVertex = new SelabVertex(pageComponent.id, pageComponent.id, parent.id)
        let id = (parseInt(pageComponent.id)).toString();
        selabVertex = selabVertex
            .setID(id)
            .setIsPrimary(true)
            .setValue("...")
            .setDataBinding(dataBinding);
        let tagCell = selabEditor.insertVertex(selabVertex, pageComponent, tagGeometry, style);
        for (let i = 0; i < 5; i++) {
            let tagGeometry = new mxGeometry((i + 6) * 28, 0, width, height);
            let selabVertex = new SelabVertex(pageComponent.id, pageComponent.id, parent.id)
            let id = (parseInt(pageComponent.id)).toString();
            selabVertex = selabVertex
                .setID(id)
                .setIsPrimary(true)
                .setValue(String(pageComponent.pages - 4 + i))
                .setDataBinding(dataBinding);
            let tagCell = selabEditor.insertVertex(selabVertex, pageComponent, tagGeometry, style);
        }
    }


    createComponent(selabEditor: SelabEditor, pageComponent, parent: mxCell): mxCell {
        // treeComponent is the test data of tree

        let pageBox = this.createPageBox(selabEditor, pageComponent, parent);

        this.createPageTag(selabEditor, pageComponent, pageBox);

        //selabEditor.editor.graph.refresh(pageBox);


        return pageBox;
    }
}