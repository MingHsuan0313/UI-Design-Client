import { UIComponent } from "./UIComponent.model";
import { BasicComponent } from "./BasicComponent.model";
import { UIComponentBuilder } from "../../components/selab-wizard/UIComponentBuilder";
import { UIComponentFactory } from "src/app/components/selab-wizard/uicomponent-factory";
import { IServiceEntry } from "../service-component-dependency";
export class TextComponent extends BasicComponent {
  text: string;
  href: string;

  constructor(uiComponentBuilder?: UIComponentBuilder) {
    if(uiComponentBuilder){
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

  setStyle(style: Object): TextComponent {
    let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
    return uiComponentBuilder
      .setStyle(style)
      .buildTextComponent()
  }
  
  setGeometry(geometry: Object): TextComponent {
    let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
    return uiComponentBuilder
      .setGeometry(geometry)
      .buildTextComponent()
  }

  copy(): TextComponent {
    let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
    return uiComponentBuilder
      .buildTextComponent()
  }

  setServiceComponent(serviceComponent: IServiceEntry): TextComponent{
    let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
    return uiComponentBuilder
      .setServiceComponent(serviceComponent)
      .buildTextComponent();
  }


  setProperties(properties: Object): TextComponent {
    let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
    return uiComponentBuilder
      .setProperties(properties)
      .buildTextComponent();
  }
  
  setName(name: string): TextComponent {
    let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
    return uiComponentBuilder
            .setName(name)
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
}