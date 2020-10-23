import { GraphStorage } from "src/app/models/modelDependency";
import GraphEditorService from "src/app/services/graph-editor.service";
import { BPELNode } from "../../models/components/BPELNode.model";

export class IOBPELDocValidator {
    graphStorage: GraphStorage;
    curParentBPELNode: BPELNode;
    curBPELNode: BPELNode;

    constructor(private graphEditorService : GraphEditorService) {
    }

    isImportBPELDocValid(xmlBPELDoc: XMLDocument): boolean {
        //TODO:
        return true;
    }

    isExportBPELDocValid(): boolean {
        //TODO:
        return true;
    }
}