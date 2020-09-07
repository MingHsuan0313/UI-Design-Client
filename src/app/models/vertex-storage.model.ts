import {StyleStorage, DataBinding} from './modelDependency';
import {Storage} from '../shared/storage';
import {UIComponent} from './model';
import GraphEditorService from '../services/graph-editor.service';

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

  addChild(childID, childVertex, property, element?) {
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

  syncProperties() {
    this.component['x'] = this.getVertexX();
    this.component['y'] = this.getVertexY();
    this.component['width'] = this.getVertexWidth();
    this.component['height'] = this.getVertexHeight();
  }

  sync() {
    // sync parent vertex's geometry
    if (this.isPrimary) {
      this.syncProperties();
    }
    this.component['style'] = this.getStyle();
    // if(this.getVertex()["parent"])

    if (this.dataBinding.hasDataBinding) {
      const componentValueKey = this.dataBinding.dataBindingName;

      // databinding text , button only one value
      if (this.dataBinding.isList == -1) {
        this.component[componentValueKey] = this.vertex.value;
      } else {
        const listValues = this.component[componentValueKey].split(' ');
        const index = this.dataBinding.isList;

        // sync component value with vertex value
        listValues[index] = this.vertex.value;

        // convert list to string
        let result = '';
        for (let index = 0; index < listValues.length; index++) {
          result = result + listValues[index];

          // last element no need add space
          if (index != listValues.length - 1) {
            result += ' ';
          }
        }
        this.component[componentValueKey] = result;
      }
    } else {
      console.log('no need data binding, it may be sync by child vertex already');
    }
  }
}


