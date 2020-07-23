import { UIComponent }  from './UIComponent.model'
import VertexStorage from '../vertex-storage.model'

export class Table implements UIComponent {
    id: String;
    height?: number;
    selector: String;
    width?: number;
    x?: String;
    y?: String;
    collumn?: number;
    row?: number;
    headers: tableHeader[];
    data: any[][];
    type: String;
    style: Object[];
    isBasic?: boolean;
  //  vertexStorage: VertexStorage;
  
    constructor(init?: Partial<Table>) {
      Object.assign(this, init);
      this.isBasic = false;
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



