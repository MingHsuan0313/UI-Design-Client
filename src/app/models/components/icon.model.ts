import { UIComponent }  from './UIComponent.model'
import VertexStorage from '../vertex-storage.model'

export class Icon implements UIComponent {
    id: String;
    selector: String;
    x: String;
    y: String;
    width?: String;
    height?: String;
    text: String;
    type: String;
    style: Object[];
    isBasic: boolean;
  //  vertexStorage: VertexStorage;
  
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