import { UIComponent }  from './UIComponent.model'
import VertexStorage from '../vertex-storage.model'

export class InputText implements UIComponent {
    id: String;
    height?: number;
    selector: String;
    width?: number;
    x: String;
    y: String;
    headers: tableHeader[];
    data: any[][];
    type: String;
    style: Object[];
    isBasic?: boolean;
    required: boolean;
    vertexStorage: VertexStorage;

    constructor(init?: Partial<InputText>) {
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



