import VertexStorage from 'src/app/models/vertex-storage.model';
import { BPELComponent } from '../../BPELComponent.model'
import { ScopeAttribute } from './scope-attribute.model';
import { ScopeElement } from './scope-element.model';

export class Scope extends BPELComponent {
    id: String;
    x?: String;
    y?: String;
    width?: number;
    height?: number;
    type: String;
    vertexStorage?: VertexStorage;
    attribute?: ScopeAttribute;
    element?: ScopeElement;
    componentName: String = "scope";

    constructor(id: String) {
        super(id);
        this.attribute = new ScopeAttribute();
        this.element = new ScopeElement();
        console.log(this.componentName)
    }
}