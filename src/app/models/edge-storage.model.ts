export default class EdgeStorage {
    edge: any;
    sourceID: string;
    targetID: string;

    constructor(edge) {
        this.edge = edge;
        console.log(edge);
    }
}