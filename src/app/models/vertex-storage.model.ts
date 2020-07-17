import { UIComponent } from "../models/model";
import StyleStorage from "./style-storage.model";
/**
 * @description
 * This is the storage of mxGraph Vertex
 * It's stored in GraphStorage
 */
export default class VertexStorage {
    vertex: any;
    id: string; 
    parentId: string;
    value: string;
    componentName: string;
    component: UIComponent;
    styleStorage: StyleStorage;

    constructor(vertex) {
        this.vertex = vertex;
        this.id = this.vertex["id"];
        this.parentId = this.vertex["parent"]["id"];
    }

    /**
     * 
     * @param value , vertex value wanted to be changed
     */
    changeValue(value) {
        this.vertex.valueChanged(value);
    }

    getVertexX() {
        return this.vertex["geometry"]["x"];
    }

    getVertexY() {
        return this.vertex["geometry"]["y"];
    }

    getVertexWidth() {
        return this.vertex["geometry"]["width"];
    }

    getVertexHeight() {
        return this.vertex["geometry"]["height"];
    }

    getVertexValue() {
        return this.vertex["value"];
    }
}