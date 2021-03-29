import { BreadcrumbComponent } from "../../models/internalRepresentation/BreadcrumbComponent.model";
import { ButtonComponent } from "../../models/internalRepresentation/ButtonComponent.model";
import { CardComponent } from "../../models/internalRepresentation/CardComponent.model";
import { DropdownComponent } from "../../models/internalRepresentation/DropdownComponent.model";
import { FormComponent } from "../../models/internalRepresentation/FormComponent.model";
import { IconComponent } from "../../models/internalRepresentation/IconComponent.model";
import { InputGroupComponent } from "../../models/internalRepresentation/InputGroupComponent.model";
import { LayoutComponent } from "../../models/internalRepresentation/LayoutComponent.model";
import { TableComponent } from "../../models/internalRepresentation/TableComponent.model";
import { ArgumentModel, IServiceEntry, ReturnModel } from "../../models/service-component-dependency";
import { TextComponent, InputTextComponent, UIComponent } from "../../models/ui-component-dependency";

export class UIComponentBuilder {
    public id: string;
    public name: string;
    public selector: string;
    public category: string;
    public type: string;
    public style: object;
    public pageId: string;
    public geometry: object;
    public serviceComponent: IServiceEntry;
    public argument: ArgumentModel;
    public properties: Object; // specific component properties: eg dropdown item, card header...
    public componentList: UIComponent[];
    public serviceID: string;
    public returnData: ReturnModel;
    public currentTaskStatus: any[];

    constructor() {
        this.name = "";
        this.id = "";
        this.pageId = "";
        this.selector = "";
        this.category = "";
        this.type = "";
        this.geometry = {};
        this.style = {};
        this.componentList = [];
        this.returnData = new ReturnModel({});
        this.currentTaskStatus = [];
    }

    getProperties(): Object {
        return this.properties;
    }

    setID(id: string) {
        this.id = id;
        return this;
    }

    setReturnData(datas: []) {
        this.returnData['datas'] = datas;
        return this;
    }

    setServiceId(serviceId: string) {
        this.serviceID = serviceId;
        return this;
    }

    setPageId(pageId: string) {
        this.pageId = pageId;
        return this;
    }

    setServiceComponent(serviceComponent: IServiceEntry) {
        this.serviceComponent = serviceComponent;
        return this;
    }

    setArgument(argument: ArgumentModel) {
        this.argument = argument;
        return this;
    }

    addSubComponent(uiComponent: UIComponent) {
        this.componentList.push(uiComponent);
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

    setGeometry(geometry: object) {
        this.geometry = geometry;
        return this;
    }

    setStyle(style: object) {
        this.style = style;
        return this;
    }

    setProperties(properties: Object) {
        this.properties = properties;
        return this;
    }

    build(): UIComponent {
        if (this.type == "text")
            return this.buildTextComponent();
        else if (this.type == "button")
            return this.buildButtonComponent();
        else if (this.type == "table")
            return this.buildTableComponent();
        else if (this.type == "card")
            return this.buildCardComponent();
        else if (this.type == "dropdown")
            return this.buildDropdownComponent();
        else if (this.type == "input")
            return this.buildInputComponent();
        else if (this.type == "inputgroup")
            return this.buildInputGroupComponent();
        else if (this.type == "icon")
            return this.buildIconComponent();
        else if (this.type == "breadcrumb")
            return this.buildBreadcrumbComponent();
        else if (this.type == "layout")
            return this.buildLayoutComponent();
        else if (this.type == "form")
            return this.buildFormComponent();
    }

    buildLayoutComponent(): LayoutComponent {
        let layoutComponent: LayoutComponent = new LayoutComponent(this);
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

    buildInputGroupComponent(): InputGroupComponent {
        let inputGroupComponent: InputGroupComponent = new InputGroupComponent(this);
        return inputGroupComponent;
    }

    buildIconComponent(): IconComponent {
        let iconComponent: IconComponent = new IconComponent(this);
        return iconComponent;
    }

    buildBreadcrumbComponent(): BreadcrumbComponent {
        let breadCrumbComponent: BreadcrumbComponent = new BreadcrumbComponent(this);
        return breadCrumbComponent;
    }

    buildTableComponent(): TableComponent {
        let tableComponent: TableComponent = new TableComponent(this);
        return tableComponent;
    }

    addComponent(uiComponent: UIComponent): UIComponentBuilder {
        this.componentList.push(uiComponent);
        return this;
    }

    getServiceComponent() {
        return this.serviceComponent;
    }

    getName() {
        return this.name;
    }

    getType() {
        return this.type;
    }
}