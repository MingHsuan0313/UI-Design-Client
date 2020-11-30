import { Geometry } from "ngx-perfect-scrollbar";
import { BreadcrumbComponent } from "./internalRepresentation/BreadcrumbComponent.model";
import { ButtonComponent } from "./internalRepresentation/ButtonComponent.model";
import { CardComponent } from "./internalRepresentation/CardComponent.model";
import { CompositeComponent } from "./internalRepresentation/CompositeComponent.model";
import { DropdownComponent } from "./internalRepresentation/DropdownComponent.model";
import { FormComponent } from "./internalRepresentation/FormComponent.model";
import { IconComponent } from "./internalRepresentation/IconComponent.model";
import { LayoutComponent } from "./internalRepresentation/LayoutComponent.model";
import { TableComponent } from "./internalRepresentation/TableComponent.model";
import { ServiceComponentModel } from "./serviceComponent/service-component.model";
import { TextComponent, InputTextComponent, UIComponent } from "./ui-component-dependency";

export class UIComponentBuilder {
    public id: string;
    public name: string;
    public selector: string;
    public category: string;
    public type: string;
    public style: Map<string, string>;
    public geometry: mxGeometry;
    public serviceComponent: ServiceComponentModel;
    public properties: Object; // specific component properties: eg dropdown item, card header...
    public componentList: UIComponent[];

    constructor() {
        this.name = "";
        this.id = "";
        this.selector = "";
        this.category = "";
        this.type = "";
        this.componentList = [];
    }

    getProperties(): Object {
        return this.properties;
    }

    setID(id: string) {
        this.id = id;
        return this;
    }

    setName(name: string) {
        this.name = name;
        return this;
    }

    setSelector(selector: string) {
        this.selector = selector;
        return this;
    }

    setType(type: string) {
        this.type = type;
        return this;
    }

    setCategory(category: string) {
        this.category = category;
        return this;
    }

    setGeometry(geometry: mxGeometry) {
        this.geometry = geometry;
        return this;
    }

    setProperties(properties: Object) {
        this.properties = properties;
        return this;
    }

    setServiceComponent(serviceComponent: ServiceComponentModel) {
        this.serviceComponent = serviceComponent;
        return this;
    }
    
    buildLayoutComponent(): LayoutComponent {
       let layoutComponent: LayoutComponent = new  LayoutComponent(this);
       return layoutComponent;
    }

    buildTextComponent(): TextComponent {
        let textComponent: TextComponent = new TextComponent(this);
        return textComponent;
    }

    buildInputComponent(): InputTextComponent {
        let inputTextComponent: InputTextComponent = new InputTextComponent(this);
        return inputTextComponent;
    }
    
    buildButtonComponent(): ButtonComponent {
       let buttonComponent: ButtonComponent = new ButtonComponent(this);
       return buttonComponent;
    }
    
    buildDropdownComponent(): DropdownComponent {
        let dropdownComponent: DropdownComponent = new DropdownComponent(this);
        return dropdownComponent;
    }
    
    buildFormComponent(): FormComponent {
        let formComponent: FormComponent = new FormComponent(this);
        return formComponent;
    }
    
    buildCardComponent(): CardComponent {
        let cardComponent: CardComponent = new CardComponent(this);
        return cardComponent;
    }
    
    buildBreadcrumbComponent(): BreadcrumbComponent {
        let breadCrumbComponent: BreadcrumbComponent = new BreadcrumbComponent(this);
        return breadCrumbComponent;
    }
    
    buildTableComponent(): TableComponent {
       let tableComponent: TableComponent = new TableComponent(this);
       return tableComponent;
    }
    
    addComponent(uiComponent: UIComponent,type: string):  UIComponentBuilder{
       this.componentList.push(uiComponent);
       if(type == "form") {
           return this;
       }
    }

    // buildDropdownComponent(properties: Object): DropdownComponent {

    // }

    // buildFormComponent(properties: Object): FormComponent {

    // }

    // buildButtonComponent(properties: Object): ButtonComponent {

    // }

    // buildTableComponent(properties: Object): TableComponent {

    // }

    // buildIconComponent(properties: Object): IconComponent{

    // }

    // buildBreadcrumbComponent(properties: Object): BreadcrumbComponent {

    // }
}