import { GraphStorage } from "../externalRepresentation/graph-storage.model";
import { PageUICDL } from "../internalRepresentation/pageUICDL.model";
import { PipelineStorage } from "../wizard-task-dependency";

export interface AppState {
    pipelineStorage: PipelineStorage;
    internalRepresentation: InternalRepresentation;
    externalRepresentation: ExternalRepresentation;
}

export class InternalRepresentation {
    pageUICDLs: PageUICDL[];
    constructor() {
        
    }
}

export class ExternalRepresentation{
    pageUICDLs: GraphStorage[];
    constructor() {
        
    }
}