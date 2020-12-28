import { UIComponent } from "./UIComponent.model";
import { BasicComponent } from "./BasicComponent.model";
import { UIComponentBuilder } from "../../components/selab-wizard/UIComponentBuilder";
import { Input } from "@angular/core";
import { UIComponentFactory } from "src/app/components/selab-wizard/uicomponent-factory";
import { IServiceEntry } from "../service-component-dependency";

export class InputTextComponent extends BasicComponent {
  public typeInfo: string;  // e.g. input-text, input-password
  public description: string;

  constructor(uiComponentBuilder: UIComponentBuilder) {
    super(uiComponentBuilder);
    let properties = uiComponentBuilder.getProperties();
    if (properties != undefined) {
      this.typeInfo = properties["typeInfo"];
      this.description = properties["name"];
    }
  }

  setStyle(style: Object): InputTextComponent {
    let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
    return uiComponentBuilder
      .setStyle(style)
      .buildInputComponent()
  }
  
  setGeometry(geometry: Object): InputTextComponent {
    let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
    return uiComponentBuilder
      .setGeometry(geometry)
      .buildInputComponent()
  }

  copy(): InputTextComponent {
    let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
    return uiComponentBuilder
      .buildInputComponent()
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
        // description: this.description,
        service: this.serviceComponent.getInfo()
      }
    }
  }

  remove(component: UIComponent): void {
  }
}