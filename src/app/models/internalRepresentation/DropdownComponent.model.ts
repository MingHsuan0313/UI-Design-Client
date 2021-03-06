
import { UIComponent } from "./UIComponent.model";
import { BasicComponent } from "./BasicComponent.model";
import { UIComponentBuilder } from "../../components/selab-wizard/UIComponentBuilder";
import { UIComponentFactory } from "src/app/components/selab-wizard/uicomponent-factory";
import { IServiceEntry } from "../service-component-dependency";

export class DropdownComponent extends BasicComponent {
  items: String;

  constructor(uiComponentBuilder?: UIComponentBuilder) {
    if(uiComponentBuilder){
      super(uiComponentBuilder);
      let properties = uiComponentBuilder.getProperties();
      if (properties != undefined) {
        this.items = properties["items"];
      }
    }
  }

  setStyle(style: Object): DropdownComponent{
    let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
    return uiComponentBuilder
      .setStyle(style)
      .buildDropdownComponent()
  }
  
  setGeometry(geometry: Object): DropdownComponent{
    let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
    return uiComponentBuilder
      .setGeometry(geometry)
      .buildDropdownComponent()
  }

  copy(): DropdownComponent{
    let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
    return uiComponentBuilder
      .buildDropdownComponent()
  }

  getValue(index: number): string {
    return this.items.split(" ")[index];
  }

  setServiceComponent(serviceComponent: IServiceEntry): DropdownComponent{
    let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
    return uiComponentBuilder
      .setServiceComponent(serviceComponent)
      .buildDropdownComponent();
  }


  setProperties(properties: Object): DropdownComponent{
    let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
    return uiComponentBuilder
      .setProperties(properties)
      .buildDropdownComponent();
  }
  
  setName(name: string): DropdownComponent{
    let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
    return uiComponentBuilder
            .setName(name)
            .buildDropdownComponent();
  }

  getInfo(): any {
    return {
      [this.getSelector().toString()]: {
        name: this.name,
        items: this.items,
        service:this.serviceComponent.getInfo()
      }
    }
  }

  setItems(items: string) {
    this.items = items;
  }
}