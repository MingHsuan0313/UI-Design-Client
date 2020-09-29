import { UIComponent } from "./UIComponent.model";
import { ServiceComponentModel } from "../serviceComponent/service-component.model";

export class FormComposite extends UIComponent {
    componentList: any[] = [];

    constructor(init?: Partial<FormComposite>) {
        super();
        Object.assign(this, init);
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