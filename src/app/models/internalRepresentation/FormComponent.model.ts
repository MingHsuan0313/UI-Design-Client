import { UIComponent } from "./UIComponent.model";
import { CompositeComponent } from "./CompositeComponent.model";
import { UIComponentBuilder } from "../../components/selab-wizard/UIComponentBuilder";
import { UIComponentFactory } from "src/app/components/selab-wizard/uicomponent-factory";
import { ServiceComponentModel } from "../service-component-dependency";

export class FormComponent extends CompositeComponent {

    constructor(uiComponentBuilder?: UIComponentBuilder) {
        if (uiComponentBuilder) {
            super(uiComponentBuilder);
            this.componentList = uiComponentBuilder.componentList;
        }
    }

    setProperties(properties: Object): FormComponent {
        let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
        return uiComponentBuilder
            .setProperties(properties)
            .buildFormComponent();
    }

    addSubComponent(component: UIComponent): FormComponent {
        let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
        return uiComponentBuilder
            .addComponent(component)
            .buildFormComponent()
    }

    getInfo() {
        return {
            name: this.name,
            service: (this.serviceComponent as ServiceComponentModel).getInfo(),
            children: this.expandChildren()
        };
    }
}