import { UIComponent } from "./UIComponent.model";
import { ServiceComponentModel } from "../serviceComponent/service-component.model";
import { BasicComponent } from "./BasicComponent.model";
import { UIComponentBuilder } from "../UIComponentBuilder";
export class TextComponent extends BasicComponent {
  text: string;
  href: string;

  constructor(uiComponentBuilder: UIComponentBuilder) {
    super(uiComponentBuilder);
    let properties = uiComponentBuilder.getProperties();
    if (uiComponentBuilder.getProperties() != undefined) {
      console.log("this time i am heree")
      this.text = properties["text"];
      this.href = properties["href"];
    }
  }

  getProperties() {
    return [
      {
        "type": "String",
        "value": "name"
      },
      {
        'type': "String",
        "value": "text"
      },
      {
        "type": "String",
        "value": "href"
      }
    ]
  }

  getValue(): string {
    return this.text;
  }

  setServiceComponent(serviceComponent: ServiceComponentModel): TextComponent{
    return this.uiComponentBuilder
      .setServiceComponet(serviceComponent)
      .buildTextComponent();
  }


  setProperties(properties: Object): TextComponent {
    return this.uiComponentBuilder
      .setProperties(properties)
      .buildTextComponent();
  }
  
  setName(name: string): TextComponent {
    return this.uiComponentBuilder
            .setName(name)
            .buildTextComponent();
  }

  add(component: UIComponent): void {
  }

  getInfo() {
    console.log("get info")
    console.log(this.name)
    console.log(this.href)
    return {
      [this.selector]: {
        name: this.name,
        href: this.href,
        text: this.text,
        service: this.serviceComponent.getInfo()
      }
    };
  }

  remove(component: UIComponent): void {
  }
}