import { GraphStorage } from "src/app/models/graph-dependency";
import GraphEditorService from "src/app/services/externalRepresentation/graph-editor.service";
import { BPELComponent } from "../models/components/BPELComponent.model";
import { BPELComponentElementWithActivity } from "../models/components/BPELComponentElementWithActivity.model";
import { BPELComponentElementWithActivityAndActivityList } from "../models/components/BPELComponentElementWithActivityAndActivityList.model";
import { BPELComponentElementWithActivityList } from "../models/components/BPELComponentElementWithActivityList.model";
import { ElseBranchElement } from "../models/components/structured-activities/if/branch/else-branch-element.model";
import { ElseBranch } from "../models/components/structured-activities/if/branch/else-branch.model";
import { ElseIfBranchElement } from "../models/components/structured-activities/if/branch/elseif-branch-element.model";
import { If } from "../models/components/structured-activities/if/if.model";

export class ActivityUpdater {
    graphStorage: GraphStorage;

    constructor(private graphEditorService: GraphEditorService) {
    }

    setActivity(sourceActivity: BPELComponent, targetActivity: BPELComponent): void {
        let targetActivityElement = targetActivity.getElement();

        if (targetActivityElement instanceof BPELComponentElementWithActivity
            || targetActivityElement instanceof BPELComponentElementWithActivityAndActivityList
            || targetActivityElement instanceof ElseIfBranchElement || targetActivityElement instanceof ElseBranchElement) {
              targetActivityElement.setActivity(sourceActivity);

          //TODO: put the sourceActivity vertex to the default displacement/selected coordinates
        } else {
          //TODO: put the moved BPEL activity vertex back to its original coordinates
        }
    }

    // TODO: temporary solution for <if>
    setElseBranchActivityForIf(sourceActivity: ElseBranch, targetActivity: If): void {
      let targetActivityElement = targetActivity.getElement();

      if (targetActivityElement instanceof BPELComponentElementWithActivityAndActivityList) {
        targetActivityElement.setElseBranchActivityForIf(sourceActivity);

        //TODO: put the sourceActivity vertex to the default displacement/selected coordinates
      } else {
        //TODO: put the moved BPEL activity vertex back to its original coordinates
      }
    }

    pushActivity(sourceActivity: BPELComponent, targetActivity: BPELComponent): void {
        let targetActivityElement = targetActivity.getElement();

        if (targetActivityElement instanceof BPELComponentElementWithActivityList
            || targetActivityElement instanceof BPELComponentElementWithActivityAndActivityList) {
          targetActivityElement.pushActivity(sourceActivity);

          //TODO: put the sourceActivity vertex to the default displacement/selected coordinates
        } else {
          //TODO: put the moved BPEL activity vertex back to its original coordinates
        }
    }
}