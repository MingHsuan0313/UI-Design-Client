import { UIComponent }  from './UIComponent.model'
import VertexStorage from '../vertex-storage.model'

export class InputGroupComposite implements UIComponent {
    id: String;
    selector: String;
    x: String;
    y: String;
    width?: String;
    height?: String;
    type: String;
    componentList: UIComponent[] = [];
    style: Object[];
    isBasic: boolean;
  //  vertexStorage: VertexStorage;
  
    constructor(init?: Partial<InputGroupComposite>) {
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
  