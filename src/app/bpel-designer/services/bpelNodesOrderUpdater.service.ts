import { GraphStorage } from "src/app/models/graph-dependency";
import GraphEditorService from "src/app/services/externalRepresentation/graph-editor.service";
import { BPELComponent } from "../models/components/BPELComponent.model";

export class BPELNodesOrderUpdater {
    graphStorage: GraphStorage;

    constructor(private graphEditorService: GraphEditorService) {
    }

    updateOrder(targetActivity: BPELComponent): void {
        if (this.graphStorage == undefined) {
            this.graphStorage = this.graphEditorService.getGraphStorage();
        }
        let activityList = targetActivity.getElement().getActivityList();
        if (activityList.length > 1) {
            let second2lastActivity = activityList[activityList.length - 2];
            let lastActivity = activityList[activityList.length - 1];
            let second2lastVertexStorage = this.graphStorage.findVertexStorageByID(second2lastActivity.getId());
            let lastActivityVertexStorage = this.graphStorage.findVertexStorageByID(lastActivity.getId());
            this.graphStorage.insertEdge(second2lastVertexStorage.getVertex(), lastActivityVertexStorage.getVertex());
            console.log("[Connect Edge] from <" + second2lastActivity.getComponentName() + ">" + "(id = " + second2lastActivity.getId() + ") "
                        + "to <" + lastActivity.getComponentName() + ">" + "(id = " + lastActivity.getId() + ") " + "'s activity");
        }
    }
}