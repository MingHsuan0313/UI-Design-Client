export default class EdgeStorage {
    edge: any;
    id: string;
    parentID: string;

    constructor(edge) {
        this.edge = edge;
        this.id = edge["id"];
        this.parentID = this.edge["parent"]["id"];
        console.log(this.edge)
        // console.log(edge);
    }
}