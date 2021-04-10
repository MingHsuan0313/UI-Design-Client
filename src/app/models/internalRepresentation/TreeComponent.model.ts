
import { BasicComponent } from "./BasicComponent.model";
import { UIComponentBuilder } from "../../components/selab-wizard/UIComponentBuilder";
import { UIComponentFactory } from "src/app/components/selab-wizard/uicomponent-factory";
import { IServiceEntry } from "../service-component-dependency";

export class TreeComponent extends BasicComponent {

    content: string;
    text: string;

    constructor(uiComponentBuilder?: UIComponentBuilder) {

        if (uiComponentBuilder) {
            super(uiComponentBuilder);
            let properties = uiComponentBuilder.getProperties();
            if (uiComponentBuilder.getProperties() != undefined) {
                this.content = properties["content"]["value"];
            }
        }
    }


    getValue(): string {
        return this.content;
    }

    setStyle(style: Object): TreeComponent {
        let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
        return uiComponentBuilder
            .setStyle(style)
            .buildTreeComponent()
    }

    setGeometry(geometry: Object): TreeComponent {
        let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
        return uiComponentBuilder
            .setGeometry(geometry)
            .buildTreeComponent()
    }

    copy(): TreeComponent {
        let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
        return uiComponentBuilder
            .buildTreeComponent()
    }

    setServiceComponent(serviceComponent: IServiceEntry): TreeComponent {
        let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
        return uiComponentBuilder
            .setServiceComponent(serviceComponent)
            .buildTreeComponent();
    }


    setProperties(properties: Object): TreeComponent {
        let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
        return uiComponentBuilder
            .setProperties(properties)
            .buildTreeComponent();
    }

    setName(name: string): TreeComponent {
        let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
        return uiComponentBuilder
            .setName(name)
            .buildTreeComponent();
    }

    getInfo() {
        console.log("get info")
        return {
            [this.selector]: {
                name: this.name,
                content: this.content,
                service: this.serviceComponent.getInfo()
            }
        };
    }
}