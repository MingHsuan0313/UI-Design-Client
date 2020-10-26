import { GraphStorage } from "src/app/models/graph-dependency";
import { BPELComponent } from "../components/BPELComponent.model";

export interface ICreateBPELComponentStrategy {
    createComponent(graphStorage: GraphStorage, component: BPELComponent, parent);
}