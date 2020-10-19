import { LayoutComponent } from "./LayoutComponent.model";

export class PageUICDL {
    public id: String;
    public selector: String;
    public category: String;
    public layout: String;

    public style: Object;

    public body: LayoutComponent;
    public header: LayoutComponent;
    public sidebar: LayoutComponent;
    public footer: LayoutComponent;
    public asidebar: LayoutComponent;
    
    constructor(id:number) {
        console.log(id)
        this.id = id.toString();
        this.selector = `page${id}`;
        this.category = "page";
        this.layout = "";
        this.style = {};
        this.header = new LayoutComponent((id + 1).toString(),"layout-header");
        this.sidebar = new LayoutComponent((id + 2).toString(),"layout-sidebar");
        this.footer = new LayoutComponent((id + 3).toString(),"layout-footer");
        this.body = new LayoutComponent((id + 4).toString(),"layout-body");
        this.asidebar = new LayoutComponent((id + 5).toString(),"layout-asidebar");
    }

    public getLayout(): String {
        return this.layout;
    }

    public setLayout(layout: String): void {
        this.layout = layout;
    }



    public getId(): String {
        return this.id;
    }

    public setId(id: String): void {
        this.id = id;
    }

    public getSelector(): String {
        return this.selector;
    }

    public setSelector(selector: String): void {
        this.selector = selector;
    }

    public getCategory(): String {
        return this.category;
    }

    public setCategory(category: String): void {
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