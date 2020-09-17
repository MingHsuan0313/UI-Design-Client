import { BPELComponent } from "../component/BPELComponent.model";

export interface BPELComponentElement {
    add(component: BPELComponent): void;
    remove(component: BPELComponent): void;
}