
import { UIComponent } from "./UIComponent.model";
import { BasicComponent } from "./BasicComponent.model";
import { UIComponentBuilder } from "../../components/selab-wizard/UIComponentBuilder";
import { TextComponent } from "./TextComponent.model";
import { UIComponentFactory } from "src/app/components/selab-wizard/uicomponent-factory";
import { IServiceEntry } from "../service-component-dependency";

export class ButtonComponent extends BasicComponent {
  text: String;
  href: String;
  trigger: Boolean;

  constructor(uiComponentBuilder: UIComponentBuilder) {
    super(uiComponentBuilder);
    let properties = uiComponentBuilder.getProperties();
    if (properties != undefined) {
      this.text = properties["name"];
      this.href = properties["href"];
      this.trigger = properties["trigger"];
    }
  }

  setProperties(properties: object): ButtonComponent {
    let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
    return uiComponentBuilder
      .setProperties(properties)
      .buildButtonComponent();
  }
  
  setName(name: string): ButtonComponent {
    let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
    return uiComponentBuilder
            .setName(name)
            .buildButtonComponent();
  }
  
  setServiceComponent(serviceComponent: IServiceEntry): ButtonComponent {
    let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
    return uiComponentBuilder
      .setServiceComponent(serviceComponent)
      .buildButtonComponent();
  }
  
  setStyle(style: Object): ButtonComponent {
    let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
    return uiComponentBuilder
      .setStyle(style)
      .buildButtonComponent()
  }
  
  setGeometry(geometry: Object): ButtonComponent {
    let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
    return uiComponentBuilder
      .setGeometry(geometry)
      .buildButtonComponent()
  }

  copy(): ButtonComponent {
    let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
    return uiComponentBuilder
      .buildButtonComponent()
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

  remove(component: UIComponent): void {
  }
}