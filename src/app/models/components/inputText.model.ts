import { UIComponent }  from './UIComponent.model'
import VertexStorage from '../vertex-storage.model'

export class InputText implements UIComponent {
    id: String;
    selector: String;
    x: String;
    y: String;
    width?: String;
    height?: String;
    headers: tableHeader[];
    data: any[][];
    type: String;
    style: Object[];
    isBasic?: boolean;
    required: boolean;
    input_type: string;
  //  vertexStorage: VertexStorage;
  
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

  export class tableHeader {
    headerName: string;
    componentType: string;
    constructor(headerName: string, componentType: string){
        this.componentType = componentType;
        this.headerName = headerName;
    }
  }

