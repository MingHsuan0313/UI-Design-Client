import { UIComponent } from "./UIComponent.model";
import { CompositeComponent } from "./CompositeComponent.model";
import { UIComponentBuilder } from "../UIComponentBuilder";
import { UIComponentFactory } from "src/app/components/selab-wizard/uicomponent-factory";
import { IServiceEntry } from "../store/serviceEntry.model";

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

  setStyle(style: Object): CardComponent{
    let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
    return uiComponentBuilder
      .setStyle(style)
      .buildCardComponent()
  }
  
  setGeometry(geometry: Object): CardComponent{
    let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
    return uiComponentBuilder
      .setGeometry(geometry)
      .buildCardComponent()
  }

  copy(): CardComponent{
    let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
    return uiComponentBuilder
      .buildCardComponent()
  }

  setServiceComponent(serviceComponent: IServiceEntry): CardComponent{
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