import { GraphStorage } from "src/app/models/modelDependency";
import GraphEditorService from "src/app/services/graph-editor.service";
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
            this.graphStorage.insertEdge(second2lastActivity.getVertexStorage().getVertex(), lastActivity.getVertexStorage().getVertex());
            console.log("[Connect Edge] from <" + second2lastActivity.getComponentName() + ">" + "(id = " + second2lastActivity.getId() + ") "
                        + "to <" + lastActivity.getComponentName() + ">" + "(id = " + lastActivity.getId() + ") " + "'s activity");
        }
    }
}