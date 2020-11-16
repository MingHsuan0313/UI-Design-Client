import { SelabEdge } from "./selabEdge.model";
import { SelabVertex } from "./selabVertex.model";

export class SelabGraph {
    id: string;
    vertexStorages: Map<number, SelabVertex>;
    edgeStorages: Map<number, SelabEdge>;
    constructor(id: string) {
        this.id = id;
        this.vertexStorages = new Map();
        this.edgeStorages = new Map();
    }
}