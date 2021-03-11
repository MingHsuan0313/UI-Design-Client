import { UIComponentFactory } from "src/app/components/selab-wizard/uicomponent-factory";
import { SelabGlobalStorage } from "../store/globalStorage";
import { LayoutComponent } from "./LayoutComponent.model";
import { UIComponent } from "./UIComponent.model";

export class PageUICDL {
    public id: string;
    public selector: string;
    public name: string; // unique
    public projectName: string;
    public isMain: boolean;
    public parameters: []; // page parameters
    public serviceComponentList: [];
    public category: string;
    public layout: string;
    public themeId: string;
    public style: Object;

    public body: LayoutComponent;
    public header: LayoutComponent;
    public sidebar: LayoutComponent;
public footer: LayoutComponent;
    public asidebar: LayoutComponent;

    constructor(id: string) {
        this.id = id;
        this.selector = id;
        this.category = "page";
        this.layout = "";
        this.style = {};
        this.projectName = SelabGlobalStorage.projectName;
        this.parameters = [];
        this.serviceComponentList = [];
        this.themeId = "";

        this.header = (UIComponentFactory.createLayout(id) as LayoutComponent);
        this.sidebar = (UIComponentFactory.createLayout(id) as LayoutComponent);
        this.footer = (UIComponentFactory.createLayout(id) as LayoutComponent);
        this.body = (UIComponentFactory.createLayout(id) as LayoutComponent);
        this.asidebar = (UIComponentFactory.createLayout(id) as LayoutComponent);
    }
    
    getInfo() {
        return {
            id: this.id,
            selector: this.selector
        }
    }

    public getLayout(): string {
        return this.layout;
    }

    public setLayout(layout: string) {
        this.layout = layout;
    }



    public getId(): string {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }

    public getSelector(): string {
        return this.selector;
    }

    public setSelector(selector: string): void {
        this.selector = selector;
    }

    public getCategory(): string {
        return this.category;
    }

    public setCategory(category: string): void {
        this.category = category;
    }

    public getStyle(): Object {
        return this.style;
    }

    public setStyle(style: Object): void {
        this.style = style;
    }

    public getBody(): LayoutComponent {
        return this.body;
    }

    public setBody(body: LayoutComponent): void {
        this.body = body;
    }

    public getHeader(): LayoutComponent {
        return this.header;
    }

    public setHeader(header: LayoutComponent): void {
        this.header = header;
    }

    public getSidebar(): LayoutComponent {
        return this.sidebar;
    }

    public setSidebar(sidebar: LayoutComponent): void {
        this.sidebar = sidebar;
    }

    public getFooter(): LayoutComponent {
        return this.footer;
    }

    public setFooter(footer: LayoutComponent): void {
        this.footer = footer;
    }

    public getAsidebar(): LayoutComponent {
        return this.asidebar;
    }

    public setAsidebar(asidebar: LayoutComponent): void {
        this.asidebar = asidebar;
    }
}