import { GraphStorage } from "src/app/models/modelDependency";
import GraphEditorService from "src/app/services/graph-editor.service";
import { BPELNode } from "../../models/components/BPELNode.model";

export class IOBPELDocParser {
    graphStorage: GraphStorage;
    curParentBPELNode: BPELNode;
    curBPELNode: BPELNode;

    constructor(private graphEditorService : GraphEditorService) {
    }

    parseImportBPELDoc(xmlBPELDoc: XMLDocument): void {
        //TODO:
        console.log("parser import done");
    }

    parseExportBPELDoc(): XMLDocument {
        //TODO:
        console.log("pasert export done");
        return null;
    }
}