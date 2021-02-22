import { Injectable } from '@angular/core';
import { GraphStorage } from '../models/graph-storage.model';

@Injectable({
    providedIn: 'root'
})
export class BpelDesignerEditorService {
    graphStorage: GraphStorage;

    constructor() {
        setTimeout(() => {
            let element = document.getElementById('bpel-graph-container');
            this.graphStorage = new GraphStorage(element, 'bpel-graph-container');
        }, 100)
    }

    getMaxVertexID() {
        return this.getGraphStorage().getMaxID();
    }

    getGraphStorage() {
        return this.graphStorage;
    }
}