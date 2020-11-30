import { LayoutComponent } from "src/app/models/internalRepresentation/LayoutComponent.model";
import {
    TextComponent,
    UIComponent,
    ButtonComponent,
    CardComponent,
    DropdownComponent,
    IconComponent,
    InputGroupComponent,
    InputTextComponent,
    FormComponent,
    BreadcrumbComponent
} from "src/app/models/ui-component-dependency";
import { UIComponentBuilder } from "src/app/models/UIComponentBuilder";

export class UIComponentFactory {
    static nextID: number = 0;
    static uiComponentBuilders: Map<string, UIComponentBuilder> = new Map();

    constructor() {
    }

    static getAllComponentTypes() {
        return [
            "text",
            "button",
            "card",
            "dropdown",
            "icon",
            "input"
        ]
    }

    static create(type: string): UIComponent {
        let uiComponent: UIComponent;
        let uiComponentBuilder: UIComponentBuilder;
        if (type == "text") {
            uiComponentBuilder = new UIComponentBuilder()
                .setID(`${this.nextID}`)
                .setType(type)
                .setCategory("informative")
                .setSelector(`${type}-${this.nextID}`)
            uiComponent = uiComponentBuilder.buildTextComponent();
            this.uiComponentBuilders.set(uiComponent.getId(), uiComponentBuilder);
        }
        else if (type == "button") {
            uiComponentBuilder = new UIComponentBuilder()
                .setCategory("navigation")
                .setType("button")
                .setID(`${this.nextID}`)
                .setSelector(`${type}-${this.nextID}`);
            uiComponent = uiComponentBuilder.buildButtonComponent();
            this.uiComponentBuilders.set(uiComponent.getId(), uiComponentBuilder);
        }
        else if (type == "table") {
            uiComponentBuilder = new UIComponentBuilder()
                .setCategory("informative")
                .setID(`${this.nextID}`)
                .setSelector(`${type}-${this.nextID}`)
                .setType("table")
            uiComponent = uiComponentBuilder.buildTableComponent();
            this.uiComponentBuilders.set(uiComponent.getId(), uiComponentBuilder);
        }
        else if (type == "card") {
            uiComponentBuilder = new UIComponentBuilder()
                .setCategory("informative")
                .setID(`${this.nextID}`)
                .setSelector(`${type}-${this.nextID}`)
                .setType("card")
            uiComponent = uiComponentBuilder.buildCardComponent();
            this.uiComponentBuilders.set(uiComponent.getId(),uiComponentBuilder);
        }
        else if (type == "dropdown") {
            uiComponentBuilder = new UIComponentBuilder()
                .setCategory("informative")
                .setID(`${this.nextID}`)
                .setSelector(`${type}-${this.nextID}`)
                .setType("dropdown")
            uiComponent = uiComponentBuilder.buildDropdownComponent()
            this.uiComponentBuilders.set(uiComponent.getId(), uiComponentBuilder);
        }
        else if (type == "icon") {
            uiComponent = new IconComponent();
        }
        else if (type == "input") {
            uiComponentBuilder = new UIComponentBuilder()
                .setCategory("input")
                .setType("input")
                .setID(`${this.nextID}`)
                .setSelector(`${type}-${this.nextID}`)
            uiComponent = uiComponentBuilder.buildInputComponent();
            this.uiComponentBuilders.set(uiComponent.getId(), uiComponentBuilder);
        }
        else if (type == "inputgroup") {
            uiComponent = new InputGroupComponent();
        }
        else if (type == "icon") {
            uiComponent = new IconComponent();
        }
        else if (type == "form") {
            uiComponentBuilder = new UIComponentBuilder()
                .setCategory("input")
                .setType("form")
                .setSelector(`${type}-${this.nextID}`)
                .setID(`${this.nextID}`);
            uiComponent = uiComponentBuilder.buildFormComponent();
            this.uiComponentBuilders.set(uiComponent.getId(), uiComponentBuilder);
        }
        else if (type == "breadcrumb") {
            uiComponentBuilder = new UIComponentBuilder()
                .setCategory("informative")
                .setType("breadcrumb")
                .setSelector(`${type}-${this.nextID}`)
                .setID(`${this.nextID}`);
            uiComponent = uiComponentBuilder.buildBreadcrumbComponent();
            this.uiComponentBuilders.set(uiComponent.getId(),uiComponentBuilder);
        }
        else if (type == "layout") {
            uiComponentBuilder = new UIComponentBuilder()
                .setCategory("layout")
                .setType("layout")
                .setSelector(`${type}-${this.nextID}`)
                .setID(`${this.nextID}`);
            uiComponent = uiComponentBuilder.buildLayoutComponent();
            this.uiComponentBuilders.set(uiComponent.getId(), uiComponentBuilder);
        }
        else {
            return;
        }
        this.nextID += 1;

        return uiComponent
    }
}