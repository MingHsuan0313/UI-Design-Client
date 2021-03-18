import { UIComponentBuilder } from "src/app/components/selab-wizard/UIComponentBuilder";
import { PageUICDL } from "src/app/models/internalRepresentation/pageUICDL.model";
import { UIComponent } from "src/app/models/ui-component-dependency";

// UIComponent Factory is Singleton
export abstract class UIComponentFactory {
    static nextID: number = 0;
    static uiComponentBuilders: Map<string, UIComponentBuilder> = new Map();

    static createFromPageUICDLFromJSONObject(pageUICDLObject: Object): PageUICDL {
        return this.deepInstanceCreation(pageUICDLObject);
    }

    static deepInstanceCreation(pageUICDLObject: Object): PageUICDL {
        let pageId = pageUICDLObject["id"];
        let pageUICDL = new PageUICDL(pageId);
        Object.assign(pageUICDL, pageUICDLObject);
        let bodyComponent = UIComponentFactory.createLayout(pageId);
        let footerComponent = UIComponentFactory.createLayout(pageId);
        let headerComponent = UIComponentFactory.createLayout(pageId);
        let sidebarComponent = UIComponentFactory.createLayout(pageId);
        let asidebarComponent = UIComponentFactory.createLayout(pageId);
        pageUICDL['footer'] = footerComponent;
        pageUICDL['header'] = headerComponent;
        pageUICDL['sidebar'] = sidebarComponent;
        pageUICDL['asidebar'] = asidebarComponent;
        for (let index = 0; index < pageUICDL.body.componentList.length; index++) {
            let uiComponent = pageUICDL.body.componentList[index];
            let uiComponentBuilder = UIComponentFactory.create(uiComponent.type, pageId);
            uiComponentBuilder
                .setName(uiComponent.name)
                .setServiceComponent(uiComponent.serviceComponent)
                .setProperties(uiComponent.properties)
                .setGeometry(uiComponent.geometry);
            if (this.isCompositeComponent(uiComponent))
                this.createSubComponentInstances(uiComponent['componentList'], uiComponentBuilder);
            bodyComponent.addSubComponent(uiComponentBuilder.build());
        }
        pageUICDL['body'] = bodyComponent;
        return pageUICDL;
    }

    static isCompositeComponent(uiComponent: UIComponent) {
        if (uiComponent['componentList'] != undefined)
            return true;
        else
            return false;
    }

    static createSubComponentInstances(componentList: UIComponent[], uiComponentBuilder: UIComponentBuilder) {
        for (let index = 0; index < componentList.length; index++) {
            let subUIComponent = componentList[index];
            let subUIComponentBuilder = UIComponentFactory.create(subUIComponent.type, uiComponentBuilder.pageId);
            subUIComponentBuilder
                .setName(subUIComponent.name)
                .setServiceComponent(subUIComponent.serviceComponent)
                .setProperties(subUIComponent.properties)
                .setGeometry(subUIComponent.geometry);
            uiComponentBuilder.addComponent(subUIComponentBuilder.build());
        }
    }

    static create(type: string, pageId: string): UIComponentBuilder {
        let uiComponentBuilder: UIComponentBuilder;
        if (type == "text") {
            uiComponentBuilder = new UIComponentBuilder()
                .setID(`${this.nextID}`)
                .setType(type)
                .setCategory("informative")
                .setSelector(`${type}${this.nextID}`)
            this.uiComponentBuilders.set(uiComponentBuilder.id, uiComponentBuilder);
        }
        else if (type == "button") {
            uiComponentBuilder = new UIComponentBuilder()
                .setCategory("navigation")
                .setType("button")
                .setID(`${this.nextID}`)
                .setSelector(`${type}${this.nextID}`);
            this.uiComponentBuilders.set(uiComponentBuilder.id, uiComponentBuilder);
        }
        else if (type == "table") {
            uiComponentBuilder = new UIComponentBuilder()
                .setCategory("informative")
                .setID(`${this.nextID}`)
                .setSelector(`${type}${this.nextID}`)
                .setType("table")
            this.uiComponentBuilders.set(uiComponentBuilder.id, uiComponentBuilder);
        }
        else if (type == "card") {
            uiComponentBuilder = new UIComponentBuilder()
                .setCategory("informative")
                .setID(`${this.nextID}`)
                .setSelector(`${type}${this.nextID}`)
                .setType("card")
            this.uiComponentBuilders.set(uiComponentBuilder.id, uiComponentBuilder);
        }
        else if (type == "dropdown") {
            uiComponentBuilder = new UIComponentBuilder()
                .setCategory("informative")
                .setID(`${this.nextID}`)
                .setSelector(`${type}${this.nextID}`)
                .setType("dropdown")
            this.uiComponentBuilders.set(uiComponentBuilder.id, uiComponentBuilder);
        }
        else if (type == "icon") {
            uiComponentBuilder = new UIComponentBuilder()
                .setCategory("informative")
                .setType("icon")
                .setID(`${this.nextID}`)
                .setSelector(`${type}${this.nextID}`)
            this.uiComponentBuilders.set(uiComponentBuilder.id, uiComponentBuilder);
        }
        else if (type == "input") {
            uiComponentBuilder = new UIComponentBuilder()
                .setCategory("input")
                .setType("input")
                .setID(`${this.nextID}`)
                .setSelector(`${type}${this.nextID}`)
            this.uiComponentBuilders.set(uiComponentBuilder.id, uiComponentBuilder);
        }
        else if (type == "inputgroup") {
            uiComponentBuilder = new UIComponentBuilder()
                .setCategory("input")
                .setType("inputgroup")
                .setID(`${this.nextID}`)
                .setSelector(`${type}${this.nextID}`);
            this.uiComponentBuilders.set(uiComponentBuilder.id, uiComponentBuilder);
        }
        else if (type == "icon") {
            uiComponentBuilder = new UIComponentBuilder()
                .setCategory("informative")
                .setType("icon")
                .setID(`${this.nextID}`)
                .setSelector(`${type}${this.nextID}`);
            this.uiComponentBuilders.set(uiComponentBuilder.id, uiComponentBuilder);
        }
        else if (type == "form") {
            uiComponentBuilder = new UIComponentBuilder()
                .setCategory("input")
                .setType("form")
                .setSelector(`${type}${this.nextID}`)
                .setID(`${this.nextID}`);
            this.uiComponentBuilders.set(uiComponentBuilder.id, uiComponentBuilder);
        }
        else if (type == "breadcrumb") {
            uiComponentBuilder = new UIComponentBuilder()
                .setCategory("informative")
                .setType("breadcrumb")
                .setSelector(`${type}${this.nextID}`)
                .setID(`${this.nextID}`);
            this.uiComponentBuilders.set(uiComponentBuilder.id, uiComponentBuilder);
        }
        else {
            return;
        }
        this.nextID += 1;
        uiComponentBuilder.setPageId(pageId);
        return uiComponentBuilder;
    }

    static createLayout(pageId) {
        let uiComponentBuilder = new UIComponentBuilder()
            .setCategory("layout")
            .setType("layout")
            .setSelector(`layout${this.nextID}`)
            .setID(`${this.nextID}`)
            .setPageId(pageId)
        this.nextID += 1;
        this.uiComponentBuilders.set(uiComponentBuilder.id, uiComponentBuilder);
        let uiComponent = uiComponentBuilder.buildLayoutComponent();
        return uiComponent;
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
        if (uiComponentBuilder.getServiceComponent() != undefined)
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
        else if (type == "dropdown") {
            return {
                [uiComponentBuilder.selector]: {
                    name: uiComponentBuilder.name,
                    items: uiComponentBuilder["items"],
                    service: info
                }
            }
        }
        else if (type == "table") {
            return {
                [uiComponentBuilder.selector]: {
                    name: uiComponentBuilder.name,
                    headers: uiComponentBuilder.properties["headers"],
                    service: info
                }
            }
        }
        else if (type == "input") {
            return {
                [uiComponentBuilder.selector]: {
                    name: uiComponentBuilder.name,
                    label: uiComponentBuilder.properties["label"],
                    service: info
                }
            }
        }
        else if (type == "card") {
            return {
                [uiComponentBuilder.selector]: {
                    name: uiComponentBuilder.name,
                    header: uiComponentBuilder.properties["header"],
                    children: this.expandChildren(uiComponentBuilder.componentList),
                    service: info
                }
            }
        }
        else if (type == "breadcrumb") {
            return {
                [uiComponentBuilder.selector]: {
                    name: uiComponentBuilder.name,
                    children: this.expandChildren(uiComponentBuilder.componentList),
                    service: info
                }
            }
        }
    }
}