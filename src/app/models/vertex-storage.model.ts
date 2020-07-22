import {UIComponent, StyleStorage, DataBinding} from './modelDependency';

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
  childrenIDs: string[];
  dataBinding: DataBinding;

  constructor(vertex, styleStorage, component, dataBinding?) {
    this.vertex = vertex;
    this.id = this.vertex['id'];
    this.parentId = this.vertex['parent']['id'];
    this.styleStorage = styleStorage;
    this.component = component;
    this.childrenIDs = [];

    if (dataBinding == undefined) {
      let dataBinding = {
        hasDataBinding: false,
        dataBindingName: '',
        isList: -1
      };
      this.dataBinding = dataBinding;
    } else {
      this.dataBinding = dataBinding;
    }

    // check key
    if ('componentList' in component) {
      for (let element of component.componentList) {
        this.childrenIDs.push(element.id);
      }
    }
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
    // if(this.component["componentList"].length == 0)
    if ('componentList' in this.component) {
      return false;
    } else {
      return true;
    }
  }

  addChild(childID) {
    this.childrenIDs.push(childID);
  }

  getVertex() {
    return this.vertex;
  }

  sync() {
    if (this.dataBinding.hasDataBinding) {
      let componentValueKey = this.dataBinding.dataBindingName;
      console.log('sync value');

      if (this.dataBinding.isList == -1) {
        this.component['x'] = this.getVertexX();
        this.component['y'] = this.getVertexY();
        this.component[componentValueKey] = this.getVertexValue();
        this.component['width'] = this.getVertexWidth();
        this.component['height'] = this.getVertexHeight();
      }
      // databinidng dropdownItem , a list
      else {
        let listValues = this.component[componentValueKey].split(' ');
        let index = this.dataBinding.isList;
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
      console.log("no need data binding")
    }
  }
}
