import { GraphStorage } from "../externalRepresentation/graph-storage.model";
import { PageUICDL } from "../internalRepresentation/pageUICDL.model";
import { PipelineStorage } from "../wizard-task-dependency";
import { SelabGraph } from "./selabGraph.model";

export interface AppState {
    pipelineStorage: PipelineStorage;
    internalRepresentation: InternalRepresentation;
    externalRepresentation: ExternalRepresentation;
}

export class InternalRepresentation {
    pageUICDLs: PageUICDL[];
    constructor() {
        this.pageUICDLs = []
    }
}

export class ExternalRepresentation{
    graphStorages: SelabGraph[];
    constructor() {
        this.graphStorages = [];
    }
}