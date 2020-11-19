import { UIComponent } from "./UIComponent.model";
import { ServiceComponentModel } from "../serviceComponent/service-component.model";
import { CompositeComponent } from "./CompositeComponent.model";
import { UIComponentBuilder } from "../UIComponentBuilder";
import { UIComponentFactory } from "src/app/components/selab-wizard/uicomponent-factory";

export class FormComponent extends CompositeComponent {

    constructor(uiComponentBuilder: UIComponentBuilder) {
        super(uiComponentBuilder);
        this.componentList = uiComponentBuilder.componentList;
    }

    setServiceComponent(serviceComponent: ServiceComponentModel): FormComponent {
        let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
        return uiComponentBuilder
            .setServiceComponet(serviceComponent)
            .buildFormComponent();
    }

    setName(name: string): FormComponent {
        let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
        return uiComponentBuilder
            .setName(name)
            .buildFormComponent();
    }

    setProperties(properties: Object): FormComponent {
        let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
        return uiComponentBuilder
            .setProperties(properties)
            .buildFormComponent();
    }

    getProperties() {
        return [
            {
                "type": "String",
                "value": "name"
            }
        ]
    }

    getChildrenOptions() {
        return ["text", "button", "input", "dropdown"];
    }

    addSubComponent(component: UIComponent): FormComponent {
        return this.uiComponentBuilder
            .addComponent(component, "form")
            .buildFormComponent()
    }

    getInfo() {
        return {
            name: this.name,
            service: this.serviceComponent.getInfo(),
            children: this.expandChildren()
        };
    }

    // expandChildren() {
    //     let children = {};
    //     for(let index = 0;index < this.componentList.length;index++) {
    //         children[(this.componentList[index].getSelector()).toString()]
    //          = this.componentList[index]
    //             .getInfo()[this.componentList[index]
    //             .getSelector().toString()];
    //     }
    //     return children;
    // }

    remove(component: UIComponent): void {
    }
}