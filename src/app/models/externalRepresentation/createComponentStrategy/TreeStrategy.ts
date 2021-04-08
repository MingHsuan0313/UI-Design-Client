import { ICreateComponentStrategy } from "./ICreateComponentStrategy";
import { StyleLibrary } from "../../../shared/styleLibrary";
import { SelabEditor } from "../selab-editor.model";
import { DataBinding } from "../util/DataBinding";
import { SelabVertex } from "../selabVertex.model";
import { TreeComponent } from "../../internalRepresentation/TreeComponent.model";

export class TreeStrategy extends ICreateComponentStrategy {

    elementCount: number;
    biggestWidth: number;
    biggestIndentCount: number;

    constructor(geometry?, restoreMode?) {
        super(geometry, restoreMode);
        this.elementCount = 0;
        this.biggestWidth = 0;
        this.biggestIndentCount = 0;
    }

    createDataBinding(part) {
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

    createTreeBox(selabEditor: SelabEditor, treeComponent: TreeComponent, parent: mxCell) {
        // create the outter box of tree
        const dataBinding = this.createDataBinding("text");

        const style = StyleLibrary[0]["tree"];
        const width = 200;
        const height = 110;
        const treeGeometry = new mxGeometry(this.basex, this.basey, width, height);

        let selabVertex = new SelabVertex(treeComponent.id, treeComponent.id, parent.id);
        let id = (parseInt(treeComponent.id)).toString();
        selabVertex = selabVertex
            .setID(id)
            .setIsPrimary(true)
            .setValue(treeComponent.text)
            .setDataBinding(dataBinding);
        let treeCell = selabEditor.insertVertex(selabVertex, treeComponent,treeGeometry , style);
        treeCell["componentPart"] = "box";
        treeCell["isPrimary"] = true;
        treeCell["componentID"] = treeComponent.id;
        treeCell["type"] = treeComponent.type;
        treeCell["name"] = treeComponent.name;
        return treeCell;
    }
    createTreeChildVertex(selabEditor: SelabEditor,
        treeComponent, parent: mxCell, content_split: string[]) {
        
        const dataBinding = this.createDataBinding("text");

        // create root
        const style = StyleLibrary[0]["tree"];
        const rootGeometry = new mxGeometry(this.basex+20, this.basey, 20, 20);
        let selabVertex_root = new SelabVertex(treeComponent.id, treeComponent.id, parent.id);
        let id = (parseInt(treeComponent.id)).toString();
        selabVertex_root = selabVertex_root.setID(id)
                                           .setIsPrimary(true)
                                           .setValue(content_split[0])
                                           .setDataBinding(dataBinding);
        let rootCell = selabEditor.insertVertex(selabVertex_root, treeComponent,rootGeometry , style);
        
        const iconStyle = StyleLibrary[0]["treeIconDown"];
        const iconGeometry = new mxGeometry(this.basex , this.basey + this.elementCount*20, 20, 20);
        let selabVertex_icon = new SelabVertex(treeComponent.id, treeComponent.id, parent.id);
        selabVertex_icon = selabVertex_icon.setID(id)
                                           .setIsPrimary(true)
                                           .setValue("")
                                           .setDataBinding(dataBinding);
        let iconCell = selabEditor.insertVertex(selabVertex_icon, treeComponent,iconGeometry , iconStyle);
        iconCell["icon"] = true;
        iconCell["state"] = true;
        iconCell["visibleChild"] = [];
        // create child
        for(let i=1; i<content_split.length; i++){
        
    
            
            const style = StyleLibrary[0]["tree"];
            const width = 15
            const height = 28;
            const childGeometry = new mxGeometry(this.basex+40, this.basey+i*28, width, height);
            let vertax_child = new SelabVertex(treeComponent.id, treeComponent.id, parent.id);
            let id = (parseInt(treeComponent.id)).toString();
            vertax_child = vertax_child.setID(id)
                                       .setIsPrimary(true)
                                       .setValue(content_split[i])
                                       .setDataBinding(dataBinding);
            let childCell = selabEditor.insertVertex(vertax_child, treeComponent,childGeometry , style);
            iconCell["visibleChild"].push(childCell);
        }

    }



    createComponent(selabEditor: SelabEditor, treeComponent: TreeComponent, parent: mxCell): mxCell {
        // treeComponent is the test data of tree
        console.log('alhdsakjhahl');
        console.log(treeComponent);
        let treeBox = this.createTreeBox(selabEditor, treeComponent, parent);

        let content_split = treeComponent.content.split(" ");

        console.log(content_split);

        this.createTreeChildVertex(selabEditor, treeComponent, parent, content_split);


        selabEditor.editor.graph.refresh(treeBox);


        return treeBox;
    }
}