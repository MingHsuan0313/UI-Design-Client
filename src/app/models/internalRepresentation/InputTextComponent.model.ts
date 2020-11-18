import { UIComponent } from "./UIComponent.model";
import { ServiceComponentModel } from "../serviceComponent/service-component.model";
import { BasicComponent } from "./BasicComponent.model";
import { UIComponentBuilder } from "../UIComponentBuilder";
import { Input } from "@angular/core";

export class InputTextComponent extends BasicComponent {
  public typeInfo: String;  // e.g. input-text, input-password
  public label: String;

  constructor(uiComponentBuilder: UIComponentBuilder) {
    super(uiComponentBuilder);
    let properties = uiComponentBuilder.getProperties();
    if (properties != undefined) {
      this.typeInfo = properties["typeInfo"];
      this.label = properties["label"];
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
        "value": "label"
      }
    ]
  }

  setProperties(properties:Object): InputTextComponent {
    return this.uiComponentBuilder
            .setProperties(properties)
            .buildInputComponent();
  }
  
  setName(name: string): InputTextComponent {
    return this.uiComponentBuilder
            .setName(name)
            .buildInputComponent();
  }

  add(component: UIComponent): void {
  }

  getInfo(): any {
    return {
      [this.getSelector().toString()]: {
        name: this.name,
        label: this.label,
        service: this.serviceComponent.getInfo()
      }
    }
  }

  remove(component: UIComponent): void {
  }
}