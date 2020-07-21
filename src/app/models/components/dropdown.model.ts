import { UIComponent }  from './UIComponent.model'
import VertexStorage from '../vertex-storage.model'

export class Dropdown implements UIComponent {
    id: String;
    height: String;
    selector: String;
    width: String;
    x: String;
    y: String;
    type: String;
    items: any[];
    style: Object[];
    isBasic: boolean;
    vertexStorage: VertexStorage;
  
    constructor(init?: Partial<Dropdown>) {
      Object.assign(this, init);
    }
  
    add(component: UIComponent): void {
    }
  
    getInfo(): any {
      return this;
    }
  
    remove(component: UIComponent): void {
    }
    isBasicComponent(): boolean{
        return this.isBasic;
    }
  }