import { UIComponent } from "./UIComponent.model";
import { ServiceComponentModel } from "../serviceComponent/service-component.model";
import { CompositeComponent } from "./CompositeComponent.model";
import { UIComponentBuilder } from "../UIComponentBuilder";
import { UIComponentFactory } from "src/app/components/selab-wizard/uicomponent-factory";

export class CardComponent extends CompositeComponent {
  header: String;

  constructor(uiComponentbuilder: UIComponentBuilder) {
    super(uiComponentbuilder);
    let properties = uiComponentbuilder.getProperties();
    if (properties != undefined) {
      this.header = properties["header"];
    }
    this.componentList = uiComponentbuilder.componentList;
  }

  setServiceComponent(serviceComponent: ServiceComponentModel): CardComponent{
    let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
    return uiComponentBuilder
      .setServiceComponent(serviceComponent)
      .buildCardComponent();
  }

  setName(name: string): CardComponent{
    let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
    return uiComponentBuilder
      .setName(name)
      .buildCardComponent();
  }

  setProperties(properties: Object): CardComponent{
    let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
    return uiComponentBuilder
      .setProperties(properties)
      .buildCardComponent();
  }

  getProperties() {
    return [
      {
        "type": "String",
        "value": "name"
      },
      {
        "type": "String",
        "value": "header"
      }
    ]
  }

  getChildrenOptions() {
    return ["text", "dropdown", "button", "table"]
  }

  add(component: any): void {
    this.componentList.push(component);
  }

  getInfo(): any {
    return {
      card: {
        name: this.name,
        header: this.header,
        children: this.expandChildren()
      }
    }
  }

  remove(component: UIComponent): void {
  }
}