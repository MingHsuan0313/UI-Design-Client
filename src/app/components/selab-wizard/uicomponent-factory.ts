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

    static deepInstanceCreation(pageUICDLJSONObject: Object): PageUICDL {
        let pageId = pageUICDLJSONObject["id"];
        let pageUICDL = new PageUICDL(pageId);
        Object.assign(pageUICDL, pageUICDLJSONObject);
        let bodyComponent = UIComponentFactory.createLayout(pageId);
        let footerComponent = UIComponentFactory.createLayout(pageId);
        let headerComponent = UIComponentFactory.createLayout(pageId);
        let sidebarComponent = UIComponentFactory.createLayout(pageId);
        let asidebarComponent = UIComponentFactory.createLayout(pageId);
        pageUICDL['footer'] = footerComponent;
        pageUICDL['header'] = headerComponent;
        pageUICDL['sidebar'] = sidebarComponent;
        pageUICDL['asidebar'] = asidebarComponent;
        for (let index = 0; index < pageUICDLJSONObject['body'].componentList.length; index++) {
            let uiComponentJSONObject = pageUICDLJSONObject['body'].componentList[index];
            let uiComponentBuilder = UIComponentFactory.create(uiComponentJSONObject.type, pageId);
            uiComponentBuilder
                .setName(uiComponentJSONObject.name)
                .setServiceComponent(uiComponentJSONObject.serviceComponent)
                .setProperties(uiComponentJSONObject.properties)
                .setGeometry(uiComponentJSONObject.geometry);
            if (this.isCompositeComponent(uiComponentJSONObject))
                this.createSubComponentInstances(uiComponentJSONObject['componentList'], uiComponentBuilder);
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
            uiComponentBuilder.subComponentBuilders.push((subUIComponentBuilder));
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
        else if (type == "tree") {
            uiComponentBuilder = new UIComponentBuilder()
                .setCategory("informative")
                .setID(`${this.nextID}`)
                .setSelector(`${type}${this.nextID}`)
                .setType("tree")
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
        console.log(uiComponentBuilder)
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

    static expandChildren(componentBuilders: UIComponentBuilder[]) {
        let children = {};
        for (let index = 0; index < componentBuilders.length; index++) {
            children[(componentBuilders[index].selector)]
                = componentBuilders[index].build()
                    .getInfo();
        }
        console.log(children);
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
                    children: this.expandChildren(uiComponentBuilder.subComponentBuilders),
                    service: info
                }
            }
        }
        else if (type == "tree") {
            return {
                [uiComponentBuilder.selector]: {
                    name: uiComponentBuilder.name,
                    content: uiComponentBuilder.properties["content"],
                    service: info
                }
            }
        }
        else if (type == "dropdown") {
            return {
                [uiComponentBuilder.selector]: {
                    name: uiComponentBuilder.name,
                    items: uiComponentBuilder.properties["items"],
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
                    children: this.expandChildren(uiComponentBuilder.subComponentBuilders),
                    service: info
                }
            }
        }
        else if (type == "breadcrumb") {
            return {
                [uiComponentBuilder.selector]: {
                    name: uiComponentBuilder.name,
                    children: this.expandChildren(uiComponentBuilder.subComponentBuilders),
                    service: info
                }
            }
        }
    }
}