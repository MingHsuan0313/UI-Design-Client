import { GraphStorage , VertexStorage , StyleStorage } from "../graph-dependency";

export interface ICreateComponentStrategy {
  createComponent(graphStorage: GraphStorage, component, parent);
  createDataBinding(part: String, index?);
}
