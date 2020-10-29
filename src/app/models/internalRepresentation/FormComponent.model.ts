import { UIComponent } from "./UIComponent.model";
import { ServiceComponentModel } from "../serviceComponent/service-component.model";
import { CompositeComponent } from "./CompositeComponent.model";

export class FormComponent extends CompositeComponent {

    constructor(properties?) {
        super();
        if (properties != undefined) {
            this.name = properties["name"];
        }
        this.componentList = [];
        this.category = "input";
        this.type = "form";
        this.serviceComponent = new ServiceComponentModel();
    }

    setUIComponent(properties) {
        this.name = properties["name"];
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