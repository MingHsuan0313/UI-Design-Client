
import { BasicComponent } from "./BasicComponent.model";
import { UIComponentBuilder } from "../../components/selab-wizard/UIComponentBuilder";
import { UIComponentFactory } from "src/app/components/selab-wizard/uicomponent-factory";
import { IServiceEntry } from "../service-component-dependency";

export class DropdownComponent extends BasicComponent {
  public readonly items: String;

  constructor(uiComponentBuilder?: UIComponentBuilder) {
    if (uiComponentBuilder) {
      super(uiComponentBuilder);
      let properties = uiComponentBuilder.getProperties();
      if (properties != undefined) {
        this.items = properties["items"];
      }
    }
  }

  getValue(index: number): string {
    return this.items.split(" ")[index];
  }

  setProperties(properties: Object): DropdownComponent {
    let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
    return uiComponentBuilder
      .setProperties(properties)
      .buildDropdownComponent();
  }

  setItems(items: string): DropdownComponent {
    let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
    uiComponentBuilder.properties['items'] = items;
    return uiComponentBuilder.buildDropdownComponent();
  }

  getInfo(): any {
    return {
      [this.getSelector().toString()]: {
        name: this.name,
        items: this.items,
        service: this.serviceComponent.getInfo()
      }
    }
  }
}