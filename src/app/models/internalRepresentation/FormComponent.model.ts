import { UIComponent } from "./UIComponent.model";
import { ServiceComponentModel } from "../serviceComponent/service-component.model";
import { CompositeComponent } from "./CompositeComponent.model";

export class FormComponent extends CompositeComponent {

    constructor(properties?) {
        super();
        if (properties != undefined) {
            this.name = properties["name"];
        }
        this.componentList = [];
        this.category = "input";
        this.type = "form";
        this.serviceComponent = new ServiceComponentModel();
    }

    setUIComponent(properties) {
        this.name = properties["name"];
    }
    
    getProperties() {
        return [
            {
                "type": "String",
                "value": "name"
            }
        ]
    }
    
    getChildrenOptions() {
        return ["text","button","input","dropdown"];
    }

    add(component: UIComponent): void {
        this.componentList.push(component);
    }

    getInfo() {
        return {
           name: this.name,
           service: this.serviceComponent.getInfo(),
           children: this.expandChildren()
        };
    }
    
    // expandChildren() {
    //     let children = {};
    //     for(let index = 0;index < this.componentList.length;index++) {
    //         children[(this.componentList[index].getSelector()).toString()]
    //          = this.componentList[index]
    //             .getInfo()[this.componentList[index]
    //             .getSelector().toString()];
    //     }
    //     return children;
    // }

    remove(component: UIComponent): void {
    }
}