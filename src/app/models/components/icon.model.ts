import { UIComponent }  from './UIComponent.model'
import VertexStorage from '../vertex-storage.model'

export class Icon implements UIComponent {
    x: String;
    y: String;
    height?: number;
    width?: number;
    id: String;
    selector: String;
    text: String;
    type: String;
    style: Object[];
    isBasic: boolean;
    vertexStorage: VertexStorage;
  
    constructor(init?: Partial<Icon>) {
      Object.assign(this, init);
    }
  
    add(component: UIComponent): void {
    }
  
    getInfo(): any {
      return this;
    }
  
    remove(component: UIComponent): void {
    }
  
    getValue() {
  
    }
    isBasicComponent(): boolean{
      return this.isBasic;
  }
  }