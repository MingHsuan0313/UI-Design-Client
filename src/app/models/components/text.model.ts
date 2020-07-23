import { UIComponent }  from './UIComponent.model'
import VertexStorage from '../vertex-storage.model'

export class Text implements UIComponent {
    id: String;
    height?: String;
    selector: String;
    width?: String;
    x?: String;
    y?: String;
    text: String;
    href?: String;
    type: String;
    style?: Object[];
    isBasic: boolean;
  //  vertexStorage?: VertexStorage;
  
    constructor(init?: Partial<Text>) {
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