
import { UIComponent } from "./UIComponent.model";
import { ServiceComponentModel } from "../serviceComponent/service-component.model";
import { BasicComponent } from "./BasicComponent.model";
import { UIComponentBuilder } from "../UIComponentBuilder";
import { TextComponent } from "./TextComponent.model";

export class ButtonComponent extends BasicComponent {
  text: String;
  href: String;
  trigger: Boolean;

  constructor(uiComponentBuilder: UIComponentBuilder) {
    super(uiComponentBuilder);
    let properties = uiComponentBuilder.getProperties();
    if (properties != undefined) {
      this.text = properties["text"];
      this.href = properties["href"];
      this.trigger = properties["trigger"];
    }
  }

  setProperties(properties: object): ButtonComponent {
    return this.uiComponentBuilder
      .setProperties(properties)
      .buildButtonComponent();
  }
  
  setName(name: string): ButtonComponent {
    return this.uiComponentBuilder
            .setName(name)
            .buildButtonComponent();
  }
  
  setServiceComponent(serviceComponent: ServiceComponentModel): ButtonComponent {
    return this.uiComponentBuilder
      .setServiceComponet(serviceComponent)
      .buildButtonComponent();
  }
  
  add(component: UIComponent): void {
  }
  
  getValue(): string {
    return this.text.toString();
  }

  getInfo() {
    return {
      [this.getSelector().toString()]:{
        name: this.name,
        text: this.text,
        href: this.href,
        service: this.serviceComponent.getInfo()
    }}
 }

  getProperties() {
    return [
      {
        "type": "String",
        "value": "name"
      },
      {
        "type": "String",
        "value": "text"
      },
      {
        "type": "String",
        "value": "href"
      },
      {
        "type": "Boolean",
        "value": "trigger"
      },
    ]
  }

  remove(component: UIComponent): void {
  }
}