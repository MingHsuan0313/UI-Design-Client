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
            "input",
            "form"
        ]
    }

    static getChildrenOptions(type: string) {
        if (type == "form") {
            return ["text", "button", "input", "dropdown"];
        }
        else if (type == "card") {
            return ["text", "dropdown", "button", "table"]
        }
        else if (type == "inputgroup") {
            return ["text", "button", "icon", "dropdown"];
        }
        else
            return [];
    }

    static getProperties(type: string) {
        if (type == "text") {
            return [
                {
                    "type": "String",
                    "value": "name"
                },
                {
                    'type': "String",
                    "value": "text"
                },
                {
                    "type": "String",
                    "value": "href"
                }
            ]
        }
        else if (type == "button") {
            return [
                {
                    "type": "String",
                    "value": "name"
                },
                {
                    "type": "String",
                    "value": "text"
                },
                {
                    "type": "String",
                    "value": "href"
                },
                {
                    "type": "Boolean",
                    "value": "trigger"
                },
            ]
        }
        else if (type == "table") {
            return [
                {
                    "type": "String",
                    "value": "name"
                },
                {
                    "type": "String",
                    "value": "headers"
                },
                {
                    "type": "String",
                    "value": "rows"
                }
            ]
        }
        else if (type == "card") {
            return [
                {
                    "type": "String",
                    "value": "name"
                },
                {
                    "type": "String",
                    "value": "header"
                }
            ]

        }
        else if (type == "dropdown") {
            return [
                {
                    "type": "String",
                    "value": "name"
                },
                {
                    "type": "String",
                    "value": "items"
                }
            ]
        }
        else if (type == "icon") {
            return [
                {
                    "type": "String",
                    "value": "name"
                },
                {
                    "type": "String",
                    "value": "text"
                }
            ]

        }
        else if (type == "input") {
            return [
                {
                    "type": "String",
                    "value": "name"
                },
            ]
        }
        else if (type == "inputgroup") {
            return [
                {
                    "type": "String",
                    "value": "name"
                }
            ]
        }
        else if (type == "form") {
            return [
                {
                    "type": "String",
                    "value": "name"
                }
            ]

        }
        else if (type == "breadcrumb") {
            return [
                {
                    "type": "String",
                    "value": "name"
                }
            ]
        }
        else if (type == "layout") {

        }
    }

    static create(type: string): UIComponentBuilder {
        let uiComponent: UIComponent;
        let uiComponentBuilder: UIComponentBuilder;
        if (type == "text") {
            uiComponentBuilder = new UIComponentBuilder()
                .setID(`${this.nextID}`)
                .setType(type)
                .setCategory("informative")
                .setSelector(`${type}-${this.nextID}`)
            // uiComponent = uiComponentBuilder.buildTextComponent();
            this.uiComponentBuilders.set(uiComponentBuilder.id, uiComponentBuilder);
        }
        else if (type == "button") {
            uiComponentBuilder = new UIComponentBuilder()
                .setCategory("navigation")
                .setType("button")
                .setID(`${this.nextID}`)
                .setSelector(`${type}-${this.nextID}`);
            // uiComponent = uiComponentBuilder.buildButtonComponent();
            this.uiComponentBuilders.set(uiComponentBuilder.id, uiComponentBuilder);
        }
        else if (type == "table") {
            uiComponentBuilder = new UIComponentBuilder()
                .setCategory("informative")
                .setID(`${this.nextID}`)
                .setSelector(`${type}-${this.nextID}`)
                .setType("table")
            // uiComponent = uiComponentBuilder.buildTableComponent();
            this.uiComponentBuilders.set(uiComponentBuilder.id, uiComponentBuilder);
        }
        else if (type == "card") {
            uiComponentBuilder = new UIComponentBuilder()
                .setCategory("informative")
                .setID(`${this.nextID}`)
                .setSelector(`${type}-${this.nextID}`)
                .setType("card")
            // uiComponent = uiComponentBuilder.buildCardComponent();
            this.uiComponentBuilders.set(uiComponentBuilder.id, uiComponentBuilder);
        }
        else if (type == "dropdown") {
            uiComponentBuilder = new UIComponentBuilder()
                .setCategory("informative")
                .setID(`${this.nextID}`)
                .setSelector(`${type}-${this.nextID}`)
                .setType("dropdown")
            // uiComponent = uiComponentBuilder.buildDropdownComponent()
            // this.uiComponentBuilders.set(uiComponent.getId(), uiComponentBuilder);
            this.uiComponentBuilders.set(uiComponentBuilder.id, uiComponentBuilder);
        }
        else if (type == "icon") {
            uiComponentBuilder = new UIComponentBuilder()
                .setCategory("informative")
                .setType("icon")
                .setID(`${this.nextID}`)
                .setSelector(`${type}-${this.nextID}`)
            this.uiComponentBuilders.set(uiComponentBuilder.id, uiComponentBuilder);
        }
        else if (type == "input") {
            uiComponentBuilder = new UIComponentBuilder()
                .setCategory("input")
                .setType("input")
                .setID(`${this.nextID}`)
                .setSelector(`${type}-${this.nextID}`);
            // uiComponent = uiComponentBuilder.buildInputComponent();
            this.uiComponentBuilders.set(uiComponentBuilder.id, uiComponentBuilder);
        }
        else if (type == "inputgroup") {
            uiComponentBuilder = new UIComponentBuilder()
                .setCategory("input")
                .setType("inputgroup")
                .setID(`${this.nextID}`)
                .setSelector(`${type}-${this.nextID}`);
            // uiComponent = uiComponentBuilder.buildInputGroupComponent();
            this.uiComponentBuilders.set(uiComponentBuilder.id, uiComponentBuilder);
        }
        else if (type == "icon") {
            uiComponentBuilder = new UIComponentBuilder()
                .setCategory("informative")
                .setType("icon")
                .setID(`${this.nextID}`)
                .setSelector(`${type}-${this.nextID}`);
            // uiComponent = uiComponentBuilder.buildIconComponent();
            this.uiComponentBuilders.set(uiComponentBuilder.id, uiComponentBuilder);
        }
        else if (type == "form") {
            uiComponentBuilder = new UIComponentBuilder()
                .setCategory("input")
                .setType("form")
                .setSelector(`${type}-${this.nextID}`)
                .setID(`${this.nextID}`);
            // uiComponent = uiComponentBuilder.buildFormComponent();
            this.uiComponentBuilders.set(uiComponentBuilder.id, uiComponentBuilder);
        }
        else if (type == "breadcrumb") {
            uiComponentBuilder = new UIComponentBuilder()
                .setCategory("informative")
                .setType("breadcrumb")
                .setSelector(`${type}-${this.nextID}`)
                .setID(`${this.nextID}`);
            // uiComponent = uiComponentBuilder.buildBreadcrumbComponent();
            this.uiComponentBuilders.set(uiComponentBuilder.id, uiComponentBuilder);
        }
        else if (type == "layout") {
            uiComponentBuilder = new UIComponentBuilder()
                .setCategory("layout")
                .setType("layout")
                .setSelector(`${type}-${this.nextID}`)
                .setID(`${this.nextID}`);
            // uiComponent = uiComponentBuilder.buildLayoutComponent();
            this.uiComponentBuilders.set(uiComponentBuilder.id, uiComponentBuilder);
        }
        else {
            return;
        }
        this.nextID += 1;

        return uiComponentBuilder;
    }

    static expandChildren(componentList) {
        let children = {};
        for (let index = 0; index < componentList.length; index++) {
            children[(componentList[index].getSelector()).toString()]
                = componentList[index]
                    .getInfo()[componentList[index]
                        .getSelector().toString()];
        }
        return children;
    }

    static getInfo(uiComponentBuilder: UIComponentBuilder) {
        let type = uiComponentBuilder.getType();
        let info = {};
        if(uiComponentBuilder.getServiceComponent() != undefined)
            info = (uiComponentBuilder.getServiceComponent() as any).getInfo();
        if (type == "text") {
            return {
                [uiComponentBuilder.selector]: {
                    name: uiComponentBuilder.name,
                    href: uiComponentBuilder.properties["href"],
                    text: uiComponentBuilder.properties["text"],
                    service: info
                }
            }
        }
        else if (type == "button") {
            return {
                [uiComponentBuilder.selector]: {
                    name: uiComponentBuilder.name,
                    href: uiComponentBuilder.properties["href"],
                    text: uiComponentBuilder.properties["text"],
                    trigger: uiComponentBuilder.properties["trigger"],
                    service: info
                }
            }
        }
        else if (type == "form") {
            return {
                [uiComponentBuilder.selector]: {
                    name: uiComponentBuilder.name,
                    children: this.expandChildren(uiComponentBuilder.componentList),
                    service: info
                }
            }
        }
        else if(type == "dropdown") {
            return {
                [uiComponentBuilder.selector]: {
                    name: uiComponentBuilder.name,
                    items: uiComponentBuilder["items"],
                    service: info
                }
            }
        }
        else if(type == "table") {
            return {
                [uiComponentBuilder.selector]: {
                    name: uiComponentBuilder.name,
                    headers: uiComponentBuilder.properties["headers"],
                    service: info
                }
            }
        }
        else if(type == "input") {
            return {
                 [uiComponentBuilder.selector]: {
                    name: uiComponentBuilder.name,
                    label: uiComponentBuilder.properties["label"],
                    service: info
                }
            }
        }
        else if(type == "card") {
            return {
                 [uiComponentBuilder.selector]: {
                    name: uiComponentBuilder.name,
                    header: uiComponentBuilder.properties["header"],
                    service: info
                }
            }
        }

    }

}