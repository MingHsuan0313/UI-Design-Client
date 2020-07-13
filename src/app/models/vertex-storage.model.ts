export default class VertexStorage {
    vertex: any;
    x: String;
    y: String;
    width: number;
    height: number;
    id: string;
    parentId: string;
    value: string;

    changeValue(value) {
        this.vertex.valueChanged(value);
    }

    constructor(vertex) {
        this.vertex = vertex;
        this.x = this.vertex["geometry"]["x"]
        this.y = this.vertex["geometry"]["y"]
        this.width = this.vertex["geometry"]["width"]
        this.height = this.vertex["geometry"]["height"]
        this.value = this.vertex["value"]
        this.id = this.vertex["id"]
        console.log(this)
    }
}