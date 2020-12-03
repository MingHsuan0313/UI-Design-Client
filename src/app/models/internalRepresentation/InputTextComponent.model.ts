import { UIComponent } from "./UIComponent.model";
import { ServiceComponentModel } from "../serviceComponent/service-component.model";
import { BasicComponent } from "./BasicComponent.model";
import { UIComponentBuilder } from "../UIComponentBuilder";
import { Input } from "@angular/core";
import { UIComponentFactory } from "src/app/components/selab-wizard/uicomponent-factory";
import { IServiceEntry } from "../store/serviceEntry.model";

export class InputTextComponent extends BasicComponent {
  public typeInfo: string;  // e.g. input-text, input-password
  public label: string;

  constructor(uiComponentBuilder: UIComponentBuilder) {
    super(uiComponentBuilder);
    let properties = uiComponentBuilder.getProperties();
    if (properties != undefined) {
      this.typeInfo = properties["typeInfo"];
      this.label = properties["name"];
    }
  }


  getProperties(){
    return [
      {
        "type": "String",
        "value": "name"
      },
    ]
  }

  setProperties(properties:Object): InputTextComponent {
    let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
    return uiComponentBuilder
            .setProperties(properties)
            .buildInputComponent();
  }
  
  setName(name: string): InputTextComponent {
    let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
    return uiComponentBuilder
            .setName(name)
            .buildInputComponent();
  }
  
  setServiceComponent(serviceComponent: IServiceEntry): InputTextComponent {
    let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id)
    return uiComponentBuilder
            .setServiceComponent(serviceComponent)
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