// import { GraphStorage } from "../externalRepresentation/graph-storage.model";
import { PageUICDL } from "../internalRepresentation/pageUICDL.model";
import { PipelineStorage } from "../wizard-task-dependency";
import { SelabGraph } from "../externalRepresentation/selabGraph.model";
import { Process } from "src/app/bpel-designer/models/components/containers/process/process.model";
import EdgeStorage from "src/app/bpel-designer/models/edge-storage.model";

export interface AppState {
    pipelineStorage: PipelineStorage;
    internalRepresentation: InternalRepresentation;
    externalRepresentation: ExternalRepresentation;

    bpelRepresentation: BPELRepresentation;
}

// using graphID find PageUICDL
export class InternalRepresentation {
    pageUICDLs: Map<string,PageUICDL>;
    pageImages: Map<string, string>;
    projectName: string;
    themes: any[];
    navigationDL: {};
    sumDL: {};
    constructor() {
        this.pageUICDLs = new Map<string,PageUICDL>();
        this.themes = [];
        this.pageImages = new Map<string, string>();
        this.navigationDL = {};
        this.sumDL = {};
    }
}

// using graphID find graphStorage
export class ExternalRepresentation{
    graphStorages: Map<string,SelabGraph>;
    constructor() {
        this.graphStorages = new Map<string,SelabGraph>(); 
    }
}

export class BPELRepresentation{
    vertexStorageList: {};
    edgeStorageList: EdgeStorage[];
    filename: string;

    constructor() {
        this.vertexStorageList = {};
        this.edgeStorageList = [];
    }
}
