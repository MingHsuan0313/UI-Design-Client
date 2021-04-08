import { UIComponent } from "./UIComponent.model";
import { BasicComponent } from "./BasicComponent.model";
import { UIComponentBuilder } from "../../components/selab-wizard/UIComponentBuilder";
import { UIComponentFactory } from "src/app/components/selab-wizard/uicomponent-factory";
import { IServiceEntry } from "../service-component-dependency";
import { CompositeComponent } from "./CompositeComponent.model";




export class PaginationComponent extends CompositeComponent {
    
    pages: number;
    text: string;

    constructor(uiComponentBuilder?: UIComponentBuilder) {

        if (uiComponentBuilder) {
            super(uiComponentBuilder);
            let properties = uiComponentBuilder.getProperties();
            if (uiComponentBuilder.getProperties() != undefined) {
                this.pages = properties["pages"].values;
            }
        }
    }

    getValue(): number {
        return this.pages;
    }

    setStyle(style: Object): PaginationComponent {
        let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
        return uiComponentBuilder
            .setStyle(style)
            .buildPaginationComponent()
    }

    setGeometry(geometry: Object): PaginationComponent {
        let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
        return uiComponentBuilder
            .setGeometry(geometry)
            .buildPaginationComponent()
    }

    copy(): PaginationComponent {
        let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
        return uiComponentBuilder
            .buildPaginationComponent()
    }

    setServiceComponent(serviceComponent: IServiceEntry): PaginationComponent {
        let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
        return uiComponentBuilder
            .setServiceComponent(serviceComponent)
            .buildPaginationComponent();
    }


    setProperties(properties: Object): PaginationComponent {
        let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
        return uiComponentBuilder
            .setProperties(properties)
            .buildPaginationComponent();
    }

    setName(name: string): PaginationComponent {
        let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
        return uiComponentBuilder
            .setName(name)
            .buildPaginationComponent();
    }

    getInfo() {
        console.log("get info")
        return {
            [this.selector]: {
                name: this.name,
                pages: this.pages,
                service: this.serviceComponent.getInfo()
            }
        };
    }
}