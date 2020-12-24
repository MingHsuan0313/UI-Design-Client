import { UIComponent } from "./UIComponent.model";
import { CompositeComponent } from "./CompositeComponent.model";
import { UIComponentBuilder } from "../UIComponentBuilder";
import { UIComponentFactory } from "src/app/components/selab-wizard/uicomponent-factory";
import { IServiceEntry } from "../store/serviceEntry.model";

export class FormComponent extends CompositeComponent {

    constructor(uiComponentBuilder: UIComponentBuilder) {
        super(uiComponentBuilder);
        this.componentList = uiComponentBuilder.componentList;
    }

    setServiceComponent(serviceComponent: IServiceEntry): FormComponent {
        let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
        return uiComponentBuilder
            .setServiceComponent(serviceComponent)
            .buildFormComponent();
    }

    setName(name: string): FormComponent {
        let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
        return uiComponentBuilder
            .setName(name)
            .buildFormComponent();
    }
    
    setStyle(style:Object): FormComponent {
        let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
        return uiComponentBuilder
            .setStyle(style) 
            .buildFormComponent();
    }
    
    setGeometry(geometry: Object): FormComponent {
        let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
        return uiComponentBuilder
            .setGeometry(geometry) 
            .buildFormComponent();
    }
    
    copy(): FormComponent {
        let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
        return uiComponentBuilder
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
        let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
        return uiComponentBuilder
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
    remove(component: UIComponent): void {
    }
}