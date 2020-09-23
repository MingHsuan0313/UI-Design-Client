import { UIComponent } from "./UIComponent.model";
import { ServiceComponentModel } from "../serviceComponent/service-component.model";

export class FormComposite implements UIComponent {
    x: String;
    y: String;
    width: String;
    height: String;
    id: String;
    selector: String;
    type: String;
    style: String;
    layout: String;
    componentList: any[] = [];
    category: String;

    serviceComponent: ServiceComponentModel;
    argumentName: String;

    constructor(init?: Partial<FormComposite>) {
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