import { Injectable } from "@angular/core";
import GraphEditorService from "src/app/services/externalRepresentation/graph-editor.service";
import { BPELComponent } from "../models/components/BPELComponent.model";
import { ElseBranch } from "../models/components/structured-activities/if/branch/else-branch.model";
import { If } from "../models/components/structured-activities/if/if.model";
import { ActivityUpdater } from "./activityUpdater.service";
import { BPELNodesOrderUpdater } from "./bpelNodesOrderUpdater.service";

@Injectable({
    providedIn: "root"
  })
export default class UpdateBPELDocService {
    activityUpdater: ActivityUpdater;
    bpelNodesOrderUpdater: BPELNodesOrderUpdater;

    constructor(private graphEditorService: GraphEditorService) {
        this.activityUpdater = new ActivityUpdater(graphEditorService);
        this.bpelNodesOrderUpdater = new BPELNodesOrderUpdater(graphEditorService);
    }

    setActivity(sourceActivity: BPELComponent, targetActivity: BPELComponent): void {
        if (sourceActivity instanceof ElseBranch && targetActivity instanceof If) {
            this.activityUpdater.setElseBranchActivityForIf(sourceActivity, targetActivity);
        } else {
            this.activityUpdater.setActivity(sourceActivity, targetActivity);
        }
    }

    pushActivity(sourceActivity: BPELComponent, targetActivity: BPELComponent): void {
        this.activityUpdater.pushActivity(sourceActivity, targetActivity);
    }

    updateOrder(targetActivity: BPELComponent): void {
        this.bpelNodesOrderUpdater.updateOrder(targetActivity);
    }
}