import GraphEditorService from "src/app/services/externalRepresentation/graph-editor.service";
import { BPELNode } from "../../models/components/BPELNode.model";
import { GraphStorage } from "../../models/graph-storage.model";
import { BpelDesignerEditorService } from "../bpel-designer-editor.service";

export class IOBPELDocValidator {
    graphStorage: GraphStorage;
    curParentBPELNode: BPELNode;
    curBPELNode: BPELNode;

    constructor(private graphEditorService : BpelDesignerEditorService) {
    }

    isImportBPELDocValid(xmlBPELDoc: XMLDocument): boolean {
        //TODO: More comprehensive validation rules
        return true;
    }

    isExportBPELDocValid(): boolean {
        let graphStorage = this.graphEditorService.getGraphStorage();
        //TODO: More comprehensive validation rules
        const enum Process {
            VERTEX_ID = 2,  // consistent with Graph Editor
            COMPONENT_NAME = "process"
        }
        let firstVertex = graphStorage.findVertexStorageByID(Process.VERTEX_ID);
        if (firstVertex) {
            if (firstVertex.getComponent().getComponentName() == Process.COMPONENT_NAME)
                return true
        }
        return false;
    }
}