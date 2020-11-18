import { TextComponent, 
    UIComponent,
    ButtonComponent,
    CardComponent,
    DropdownComponent,
    IconComponent,
    InputGroupComponent,
    InputTextComponent,
    FormComponent,
    BreadcrumbComponent } from "src/app/models/ui-component-dependency";
import { UIComponentBuilder } from "src/app/models/UIComponentBuilder";

export class UIComponentFactory {
    static nextID: number = 0;

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

    static create(type:string): UIComponent {
        console.log("start creating : " + type);
        let uiComponent : UIComponent;
        if(type == "text") {
            uiComponent = new UIComponentBuilder() 
                                .setID(`${this.nextID}`)
                                .setType(type)
                                .setCategory("informative")
                                .setSelector(`${type}-${this.nextID}`)
                                .buildTextComponent();
        }
        else if(type == "button") {
            uiComponent = new UIComponentBuilder()
                                .setCategory("navigation")
                                .setType("button")
                                .setID(`${this.nextID}`)
                                .setSelector(`${type}-${this.nextID}`)
                                .buildButtonComponent();

        }
        else if(type == "table") {
            uiComponent = new UIComponentBuilder()
                                .setCategory("informative")
                                .setID(`${this.nextID}`)
                                .setSelector(`${type}-${this.nextID}`)
                                .setType("table")
                                .buildTableComponent();
        }
        else if(type == "card") {
            uiComponent = new CardComponent();
        }
        else if(type == "dropdown") {
           uiComponent = new DropdownComponent();
        }
        else if(type == "icon") {
            uiComponent = new IconComponent();
        }
        else if(type == "input") {
            uiComponent = new UIComponentBuilder()
                                .setCategory("input")
                                .setType("input")
                                .setID(`${this.nextID}`)
                                .setSelector(`${type}-${this.nextID}`)
                                .buildInputComponent();
        }
        else if(type == "inputgroup") {
            uiComponent = new InputGroupComponent();
        }
        else if(type == "icon") {
            uiComponent = new IconComponent();
        }
        else if(type == "form") {
            uiComponent = new UIComponentBuilder()
                                .setCategory("input")
                                .setType("form")
                                .setSelector(`${type}-${this.nextID}`)
                                .setID(`${this.nextID}`)
                                .buildFormComponent();
        }
        else if(type == "breadcrumb") {
            uiComponent = new BreadcrumbComponent();
        }
        else {
            return;
        }
        this.nextID += 1;

        return uiComponent
    }
}