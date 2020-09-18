import VertexStorage from 'src/app/models/vertex-storage.model'
import AbstractComponent from 'src/app/shared/AbstractComponent.model';
import { BPELComponentAttribute } from '../attribute/BPELComponent-attribute.model';
import { BPELComponentElement } from '../element/BPELComponent-element.model';

export interface BPELComponent extends AbstractComponent{
    id: String;
    x?: String;
    y?: String;
    width?: number;
    height?: number;
    type: String;
    vertexStorage?: VertexStorage;
    attribute?: BPELComponentAttribute;
    element?: BPELComponentElement;
    componentName: String;

    getInfo(): any;
}