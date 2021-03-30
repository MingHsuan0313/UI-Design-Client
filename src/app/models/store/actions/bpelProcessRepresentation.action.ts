import { Action } from '@ngrx/store';
import { Process } from 'src/app/bpel-designer/models/components/containers/process/process.model';
import EdgeStorage from 'src/app/bpel-designer/models/edge-storage.model';

export enum BPELRepresentationActionTypes {
    INSERT_BPEL_COMPONENT = "[BPELRepresentation] INSERT BPEL Component",
    INIT_FILENAME = "[BPELRepresentation] INIT BPEL Document Filename",
    UPDATE_PROCESS = "[BPELRepresentation] UPDATE Process",
    UPDATE_FILENAME = "[BPELRepresentation] UPDATE Document Filename",
    DELETE_BPEL_COMPONENT = "[BPELRepresentation] DELETE BPEL Component",
}

export class BPELRepresentationInsertBpelComponentAction implements Action {
    public type = BPELRepresentationActionTypes.INSERT_BPEL_COMPONENT;
    constructor(public vertexStorageList: {}, public edgeStorageList: EdgeStorage[]) {};
}

export class BPELRepresentationInitFilenameAction implements Action {
    public type = BPELRepresentationActionTypes.INIT_FILENAME;
    constructor(public filename: string) {};
}

export class BPELRepresentationUpdateProcessAction implements Action {
    public type = BPELRepresentationActionTypes.UPDATE_PROCESS;
    constructor(public id: string, public key: string, public value: string) {};
}

export class BPELRepresentationUpdateFilenameAction implements Action {
    public type = BPELRepresentationActionTypes.UPDATE_FILENAME;
    constructor(public filename: string) {};
}

export class  BPELRepresentationDeleteBpelComponentAction implements Action {
    public type = BPELRepresentationActionTypes.DELETE_BPEL_COMPONENT;
    constructor(public process: Process) {}
}
