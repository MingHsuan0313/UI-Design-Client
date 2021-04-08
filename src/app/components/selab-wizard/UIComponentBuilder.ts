import { TreeComponent } from "src/app/models/internalRepresentation/TreeComponent.model";
import { BreadcrumbComponent } from "../../models/internalRepresentation/BreadcrumbComponent.model";
import { ButtonComponent } from "../../models/internalRepresentation/ButtonComponent.model";
import { CardComponent } from "../../models/internalRepresentation/CardComponent.model";
import { DropdownComponent } from "../../models/internalRepresentation/DropdownComponent.model";
import { FormComponent } from "../../models/internalRepresentation/FormComponent.model";
import { IconComponent } from "../../models/internalRepresentation/IconComponent.model";
import { InputGroupComponent } from "../../models/internalRepresentation/InputGroupComponent.model";
import { LayoutComponent } from "../../models/internalRepresentation/LayoutComponent.model";
import { TableComponent } from "../../models/internalRepresentation/TableComponent.model";
import { ArgumentModel, IServiceEntry, ReturnModel, ServiceComponentModel } from "../../models/service-component-dependency";
import { TextComponent, InputTextComponent, UIComponent } from "../../models/ui-component-dependency";
import { UIComponentConfig } from "./uicomponent-config";

export class UIComponentBuilder {
    public id: string;
    public name: string;
    public selector: string;
    public category: string;
    public description: string;
    public type: string;
    public style: object;
    public pageId: string;
    public geometry: object;
    public serviceComponent: IServiceEntry;
    public argument: ArgumentModel;
    public properties: Object; // specific component properties: eg dropdown item, card header...
    public subComponentBuilders: UIComponentBuilder[];
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
        this.subComponentBuilders = [];
        this.returnData = new ReturnModel({});
        this.currentTaskStatus = [];
        this.serviceComponent = new ServiceComponentModel();
    }

    getProperties(): Object {
        return this.properties;
    }

    isComposite(): boolean {
        let compositeTypes = UIComponentConfig.getAllCompositeComponentTypes();
        if(compositeTypes.includes(this.type)) {
            return true;
        }
        else
            return false;
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

    addSubComponentBuilder(uiComponentBuilder: UIComponentBuilder) {
        this.subComponentBuilders.push(uiComponentBuilder);
        return this;
    }

    setName(name: string) {
        this.name = name;
        return this;
    }

    setDescription(description: string) {
        this.description = description;    
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
        else if (this.type == "tree")
            return this.buildTreeComponent();
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
        console.log(`build form Component ${formComponent.name}`)
        console.log(formComponent)
        for(let index = 0; index < this.subComponentBuilders.length; index++) {
            formComponent.componentList.push(this.subComponentBuilders[index].build());
        }
        return formComponent;
    }

    buildCardComponent(): CardComponent {
        let cardComponent: CardComponent = new CardComponent(this);
        for(let index = 0; index < this.subComponentBuilders.length; index++) {
            cardComponent.componentList.push(this.subComponentBuilders[index].build());
        }
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

    buildTreeComponent(): TreeComponent {
        let treeComponent: TreeComponent = new TreeComponent(this);
        return treeComponent;
    }

    buildTableComponent(): TableComponent {
        let tableComponent: TableComponent = new TableComponent(this);
        return tableComponent;
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