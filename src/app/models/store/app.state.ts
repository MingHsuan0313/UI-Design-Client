// import { GraphStorage } from "../externalRepresentation/graph-storage.model";
import { PageUICDL } from "../internalRepresentation/pageUICDL.model";
import { PipelineStorage } from "../wizard-task-dependency";
import { SelabGraph } from "../externalRepresentation/selabGraph.model";

export interface AppState {
    pipelineStorage: PipelineStorage;
    internalRepresentation: InternalRepresentation;
    externalRepresentation: ExternalRepresentation;
}

// using graphID find PageUICDL
export class InternalRepresentation {
    pageUICDLs: Map<string,PageUICDL>;
    projectName: string;
    themes: any[];
    constructor() {
        this.pageUICDLs = new Map<string,PageUICDL>();
        this.themes = [];
    }
}

// using graphID find graphStorage
export class ExternalRepresentation{
    graphStorages: Map<string,SelabGraph>;
    constructor() {
        this.graphStorages = new Map<string,SelabGraph>(); 
    }
}