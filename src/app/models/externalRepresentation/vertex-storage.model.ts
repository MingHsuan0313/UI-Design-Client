import { StyleStorage } from './style-storage.model';
import { DataBinding } from './util/DataBinding';
import {UIComponent} from '../ui-component-dependency';
import StyleEditorService from 'src/app/services/externalRepresentation/style-editor.service';
import { StyleConverter } from '../../shared/styleTable';
import AbstractComponent from '../shared/AbstractComponent.model';
import { BPELComponent } from '../bpel-designer/models/components/component/BPELComponent.model';

/**
 * @description
 * This is the storage of mxGraph Vertex
 * It's stored in GraphStorage
 */
export class VertexStorage {
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


  syncUIComponentStyle(styleEditorService:StyleEditorService) {
    console.log("sync style");
    let vertexStorageStyle = styleEditorService.convertStyleDescriptionToJsobObject(this.vertex.style);
    console.log("style after convertin")
    let styleConverter = new StyleConverter();
    if(this.vertex.isPrimary) {
      console.log("This VertexStorage is primary part of vertex")
      console.log(this.component);
      // console.log(vertexStorageStyle);
      console.log(styleConverter.convertObject(vertexStorageStyle));
      this.component.setStyle(styleConverter.convertObject(vertexStorageStyle));
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

  syncProperties() {
    console.log("sync")
    console.log(this.component);
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
    // this.component['style'] = this.getStyle();
    // if(this.getVertex()["parent"])

    if (this.dataBinding.hasDataBinding) {
      const componentValueKey = this.dataBinding.dataBindingName;
      console.log('test')
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
  
  public setPrimary(value: Boolean) {
    this.vertex.isPrimary = value;
  }
  
  public getPrimary() {
    return this.vertex.isPrimary;
  }
}


