
import { UIComponent } from "./UIComponent.model";
import { ServiceComponentModel } from "../serviceComponent/service-component.model";
import { BasicComponent } from "./BasicComponent.model";
import { UIComponentBuilder } from "../UIComponentBuilder";
import { UIComponentFactory } from "src/app/components/selab-wizard/uicomponent-factory";
import { IServiceEntry } from "../store/serviceEntry.model";

export class DropdownComponent extends BasicComponent {
  items: String;

  constructor(uiComponentBuilder: UIComponentBuilder) {
    super(uiComponentBuilder);
    let properties = uiComponentBuilder.getProperties();
    if (properties != undefined) {
      this.items = properties["items"];
    }
  }

  getProperties() {
    return [
      {
        "type": "String",
        "value": "name"
      },
      {
        "type": "String",
        "value": "items"
      }
    ]
  }
  
  getValue(index: number): string {
    return this.items.split(" ")[index];
  }

  setServiceComponent(serviceComponent: IServiceEntry): DropdownComponent{
    let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
    return uiComponentBuilder
      .setServiceComponent(serviceComponent)
      .buildDropdownComponent();
  }


  setProperties(properties: Object): DropdownComponent{
    let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
    return uiComponentBuilder
      .setProperties(properties)
      .buildDropdownComponent();
  }
  
  setName(name: string): DropdownComponent{
    let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
    return uiComponentBuilder
            .setName(name)
            .buildDropdownComponent();
  }

  add(component: UIComponent): void {
  }

  getInfo(): any {
    return {
      [this.getSelector().toString()]: {
        name: this.name,
        items: this.items,
        service:this.serviceComponent.getInfo()
      }
    }
  }

  remove(component: UIComponent): void {
  }

  setItems(items: string) {
    this.items = items;
  }
}