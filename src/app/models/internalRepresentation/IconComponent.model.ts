import { UIComponent } from "./UIComponent.model";
import { BasicComponent } from "./BasicComponent.model";
import { UIComponentBuilder } from "../UIComponentBuilder";
import { UIComponentFactory } from "src/app/components/selab-wizard/uicomponent-factory";
export class IconComponent extends BasicComponent {
  text: string;

  constructor(uiComponentBuilder: UIComponentBuilder) {
    super(uiComponentBuilder);
    let properties = uiComponentBuilder.getProperties();
    if (properties != undefined) {
      this.text = properties["text"];
    }

  }

  setStyle(style: Object): IconComponent {
    let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
    return uiComponentBuilder
      .setStyle(style)
      .buildIconComponent();
  }
  
  setGeometry(geometry: Object): IconComponent{
    let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
    return uiComponentBuilder
      .setGeometry(geometry)
      .buildIconComponent();
  }

  copy(): IconComponent{
    let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
    return uiComponentBuilder
      .buildIconComponent();
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
      }
    ]
  }

  add(component: UIComponent): void {
  }

  getInfo(): any {
    return this;
  }

  remove(component: UIComponent): void {
  }
}
