
import { BasicComponent } from "./BasicComponent.model";
import { UIComponentBuilder } from "../../components/selab-wizard/UIComponentBuilder";
import { UIComponentFactory } from "src/app/components/selab-wizard/uicomponent-factory";
import { IServiceEntry } from "../service-component-dependency";

export class ButtonComponent extends BasicComponent {
  public readonly text: String;
  public readonly href: String;
  public readonly trigger: Boolean;

  constructor(uiComponentBuilder?: UIComponentBuilder) {
    if (uiComponentBuilder) {
      super(uiComponentBuilder);
      let properties = uiComponentBuilder.getProperties();
      if (properties != undefined) {
        this.text = properties["name"];
        this.href = properties["href"];
        this.trigger = properties["trigger"];
      }
    }
  }

  setProperties(properties: object): ButtonComponent {
    let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
    return uiComponentBuilder
      .setProperties(properties)
      .buildButtonComponent();
  }

  getValue(): string {
    return this.text.toString();
  }

  getInfo() {
    return {
      [this.getSelector().toString()]: { 
        name: this.name, 
        text: this.text, 
        href: this.href, 
        service: this.serviceComponent.getInfo() 
      }
    }
  }
}