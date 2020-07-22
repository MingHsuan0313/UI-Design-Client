import { UIComponent }  from './UIComponent.model'
import VertexStorage from '../vertex-storage.model'

export class CardComposite implements UIComponent {
    id: String;
    height?: number;
    selector: String;
    width?: number;
    x?: String;
    y?: String;
    header?: String;
    type: String;
    componentList?: UIComponent[] = [];
    style?: Object[];
    isBasic: boolean;
    vertexStorage?: VertexStorage;
  
    constructor(init?: Partial<CardComposite>) {
      Object.assign(this, init);
    }
    add(component: any): void {
      this.componentList.push(component);
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