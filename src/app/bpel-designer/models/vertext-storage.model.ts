import { DataBinding } from 'src/app/models/externalRepresentation/util/DataBinding';
import { StyleStorage } from 'src/app/models/graph-dependency';
import AbstractComponent from 'src/app/shared/AbstractComponent.model';

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
  component: AbstractComponent;
  styleStorage: StyleStorage;
  children: any;
  dataBinding: DataBinding;
  isPrimary: boolean;

  constructor(vertex, styleStorage, component, dataBinding?, isPrimary?) {
    this.vertex = vertex;
    this.id = this.vertex['id'];
    this.parentId = this.vertex['parent']['id'];
    this.styleStorage = styleStorage;
    this.component = component;
    this.children = [];


    if (isPrimary == undefined) {
      this.isPrimary = false;
    } else {
      this.isPrimary = true;
    }

    // initialize dataBinding
    if (dataBinding == undefined) {
      dataBinding = {
        hasDataBinding: false,
        dataBindingName: '',
        isList: -1
      };
      this.dataBinding = dataBinding;
    } else {
      this.dataBinding = dataBinding;
    }

  }

  setIsPrimary(isPrimary) {
    this.isPrimary = isPrimary;
  }

  /**
   *
   * @param value , vertex value wanted to be changed
   */
  changeValue(value) {
    this.vertex.valueChanged(value);
  }

  getVertexX() {
    return this.vertex['geometry']['x'];
  }

  getVertexY() {
    return this.vertex['geometry']['y'];
  }

  getVertexWidth() {
    return this.vertex['geometry']['width'];
  }

  getVertexHeight() {
    return this.vertex['geometry']['height'];
  }

  getVertexValue() {
    return this.vertex['value'];
  }

  isBasicComponent() {
    if ('componentList' in this.component) {
      return false;
    } else {
      return true;
    }
  }

  getStyleStorage() {
    return this.styleStorage;
  }

  getStyle() {
    return this.styleStorage.getStyle();
  }

  addChild(childID, childVertex: mxCell, property, element?) {
    let child;
    if (property == 'componentList') {
      child = {childID, childVertex, property, element};
    } else {
      child = {childID, childVertex, property};
    }
    this.children.push(child);
  }

  getVertex() {
    return this.vertex;
  }

  getComponent(): AbstractComponent {
    return this.component;
  }
}