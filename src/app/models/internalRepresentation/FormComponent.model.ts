import { UIComponent } from "./UIComponent.model";
import { ServiceComponentModel } from "../serviceComponent/service-component.model";
import { CompositeComponent } from "./CompositeComponent.model";

export class FormComponent extends CompositeComponent{

    constructor(init?: Partial<FormComponent>) {
        super();
        // Object.assign(this, init);
        this.componentList = [];
        this.category = "input";
        this.type = "form";
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