import VertexStorage from '../vertex-storage.model'

export interface UIComponent {
    x?: String;
    y?: String;
    width?: number;
    height?: number;
    id: String;
    selector: String;
    type: String;
  //  vertexStorage?: VertexStorage;
    style?: Object[];
    isBasic?: boolean;
  
    add(component: UIComponent): void;
    remove(component: UIComponent): void;
    getInfo(): String;
    isBasicComponent(): boolean;
  }