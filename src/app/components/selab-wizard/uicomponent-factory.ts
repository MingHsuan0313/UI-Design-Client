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

export class UIComponentFactory {
    create(type:string): UIComponent {
        console.log("start creating : " + type);
        let uiComponent : UIComponent;
        if(type == "text") {
            uiComponent = new TextComponent();
        }
        else if(type == "button") {
            uiComponent = new ButtonComponent();
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
            uiComponent = new InputTextComponent();
        }
        else if(type == "inputgroup") {
            uiComponent = new InputGroupComponent();
        }
        else if(type == "icon") {
            uiComponent = new IconComponent();
        }
        else if(type == "form") {
            uiComponent = new FormComponent();
        }
        else if(type == "breadcrumb") {
            uiComponent = new BreadcrumbComponent();
        }
        return uiComponent
    }
}