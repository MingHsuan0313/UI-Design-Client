import { GraphStorage } from "src/app/models/modelDependency";
import GraphEditorService from "src/app/services/graph-editor.service";
import { BPELComponent } from "../models/components/BPELComponent.model";

export class BPELNodesOrderUpdater {
    graphStorage: GraphStorage;

    constructor(private graphEditorService: GraphEditorService) {
    }

    updateOrder(targetActivity: BPELComponent): void {
        //TODO:
    }
}