import {StyleStorage, DataBinding} from "./modelDependency";
import {Storage} from "../shared/storage";
import {UIComponent} from "./model";

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
  component: UIComponent;
  styleStorage: StyleStorage;
  children: any;
  dataBinding: DataBinding;

  constructor(vertex, styleStorage, component) {
    this.vertex = vertex;
    this.id = this.vertex["id"];
    this.parentId = this.vertex["parent"]["id"];
    this.styleStorage = styleStorage;
    this.component = component;
    this.children = [];
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

  isBasicComponent() {
    if ("componentList" in this.component) {
      return false;
    } else {
      return true;
    }
  }

  addChild(childID, childVertex, property, element?) {
    let child;
    if (property == "componentList") {
      child = {childID, childVertex, property, element};
    } else {
      child = {childID, childVertex, property};
    }
    this.children.push(child);
  }

  getVertex() {
    return this.vertex;
  }

  sync() {
    const componentValues = Storage.getComponentValue(this.component.type.toString());
    console.log("sync value");

    // parent vertex
    if (this.getVertex()["parent"]["id"] == "1") {
      this.component["x"] = this.getVertexX();
      this.component["y"] = this.getVertexY();
      this.component["width"] = this.getVertexWidth();
      this.component["height"] = this.getVertexHeight();

      if (this.children.length == 0) {
        this.component[componentValues[0]] = this.getVertex()["value"];
      } else {

        /// sync component basic attribute
        for (let i = 0; i < componentValues.length; i++) {
          let result = "";
          for (let j = 0; j < this.children.length; j++) {
            if (this.children[j]["property"] == componentValues[i]) {
              result += this.children[j]["childVertex"]["value"] + " ";
            }
          }
          this.component[componentValues[i]] = result;
        }

        // sync composite component list
        for (let i = 0; i < this.children.length; i++) {
          if (this.children[i]["property"] == "componentList") {
            this.children[i]["element"]["x"] = this.children[i]["childVertex"]["geometry"]["x"];
            this.children[i]["element"]["y"] = this.children[i]["childVertex"]["geometry"]["y"];
            this.children[i]["element"]["width"] = this.children[i]["childVertex"]["geometry"]["width"];
            this.children[i]["element"]["height"] = this.children[i]["childVertex"]["geometry"]["height"];
            this.children[i]["element"]["text"] = this.children[i]["childVertex"]["value"]; // assume basic component

            // composite componet is not available
          }
        }
      }
    }
  }
}


