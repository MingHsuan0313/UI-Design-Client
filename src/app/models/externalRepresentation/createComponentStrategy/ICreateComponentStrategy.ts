import { GraphStorage , VertexStorage , StyleStorage } from "../../graph-dependency";
import { UIComponent } from "../../ui-component-dependency";

export interface ICreateComponentStrategy {
  createComponent(graphStorage, component?:UIComponent, parent?:mxCell);
  createDataBinding(part: String, index?);
}
