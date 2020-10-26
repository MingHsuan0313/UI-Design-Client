import { GraphStorage } from "src/app/models/graph-dependency";
import GraphEditorService from "src/app/services/externalRepresentation/graph-editor.service";
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