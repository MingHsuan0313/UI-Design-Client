import {GraphStorage} from '../graph-storage.model';

export interface ICreateComponentStrategy {
  createComponent(graphStorage: GraphStorage, component, parent);
  createDataBinding(part: String, uiComponent?, index?);
}
