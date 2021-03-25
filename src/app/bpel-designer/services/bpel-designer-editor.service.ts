import { Injectable } from '@angular/core';
import { GraphStorage } from '../models/graph-storage.model';

@Injectable({
    providedIn: 'root'
})
export class BpelDesignerEditorService {
    graphStorage: GraphStorage;
    zoomFactor = 1;

    constructor() {
        setTimeout(() => {
            let element = document.getElementById('bpel-graph-container');
            if(element != null)
                this.graphStorage = new GraphStorage(element, 'bpel-graph-container');
        }, 100)
    }

    getMaxVertexID() {
        return this.getGraphStorage().getMaxID();
    }

    getGraphStorage() {
        return this.graphStorage;
    }

    zoomTo(zoomFactor: any) {
        let graph = this.getGraphStorage().getGraph();
        graph.zoomTo(zoomFactor, graph.centerZoom);
    }

    zoomIn() {
        this.zoomFactor = this.zoomFactor * 1.11;
        this.getGraphStorage().getGraph().zoomFactor = this.zoomFactor;
        this.zoomTo(this.zoomFactor);
    }

    zoomOut() {
        this.zoomFactor = this.zoomFactor * 0.9;
        this.getGraphStorage().getGraph().zoomFactor = this.zoomFactor;
        this.zoomTo(this.zoomFactor);
    }

    deleteVertex(vertex: mxCell): void {
        this.graphStorage.deleteVertex(vertex);
    }
}