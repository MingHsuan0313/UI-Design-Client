import { UIComponent } from "./UIComponent.model";
import { ServiceComponentModel } from "../serviceComponent/service-component.model";
import { CompositeComponent } from "./compositeComponent.model";

export class FormComposite extends CompositeComponent{

    constructor(init?: Partial<FormComposite>) {
        super();
        Object.assign(this, init);
        this.componentList = [];
        this.category = "input";
        this.serviceComponent = new ServiceComponentModel();
    }

    add(component: UIComponent): void {
        this.componentList.push(component);
    }

    getInfo(): any {
        return this;
    }

    remove(component: UIComponent): void {
    }
}