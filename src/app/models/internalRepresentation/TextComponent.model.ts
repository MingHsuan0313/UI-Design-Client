import { BasicComponent } from "./BasicComponent.model";
import { UIComponentBuilder } from "../../components/selab-wizard/UIComponentBuilder";
import { UIComponentFactory } from "src/app/components/selab-wizard/uicomponent-factory";
import { IServiceEntry } from "../service-component-dependency";
import { UIComponent } from "./UIComponent.model";
export class TextComponent extends BasicComponent {
  public readonly text: string;
  public readonly href: string;

  constructor(uiComponentBuilder?: UIComponentBuilder) {
    if (uiComponentBuilder) {
      super(uiComponentBuilder);
      let properties = uiComponentBuilder.getProperties();
      if (uiComponentBuilder.getProperties() != undefined) {
        console.log("this time i am heree")
        this.text = properties["name"];
        this.href = properties["href"];
      }
    }
  }

  getValue(): string {
    return this.text;
  }

  setProperties(properties: Object): TextComponent {
    let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
    return uiComponentBuilder
      .setProperties(properties)
      .buildTextComponent();
  }

  getInfo() {
    console.log("get info")
    return {
      [this.selector]: {
        name: this.name,
        href: this.href,
        text: this.text,
        service: this.serviceComponent.getInfo()
      }
    };
  }

  setServiceComponent(serviceComponent: IServiceEntry) {
    let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
    return uiComponentBuilder
      .setServiceComponent(serviceComponent)
      .build();
  }

  setName(name: string): UIComponent {
    let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
    return uiComponentBuilder
      .setName(name)
      .build();
  }

  setStyle(style: object): UIComponent {
    let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
    return uiComponentBuilder
      .setStyle(style)
      .build();
  }

  setGeometry(geometry: object): UIComponent {
    let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
    return uiComponentBuilder
      .setGeometry(geometry)
      .build();
  }

  copy(): UIComponent {
    let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
    return uiComponentBuilder.build();
  }
}