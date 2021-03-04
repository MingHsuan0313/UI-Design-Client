import { UIComponent } from "./UIComponent.model";
import { CompositeComponent } from "./CompositeComponent.model";
import { UIComponentBuilder } from "../../components/selab-wizard/UIComponentBuilder";
import { UIComponentFactory } from "src/app/components/selab-wizard/uicomponent-factory";
import { IServiceEntry } from "../service-component-dependency";

export class CardComponent extends CompositeComponent {
  header: String;

  constructor(uiComponentBuilder?: UIComponentBuilder) {
    if(uiComponentBuilder){
      super(uiComponentBuilder);
      let properties = uiComponentBuilder.getProperties();
      if (properties != undefined) {
        this.header = properties["header"];
      }
      this.componentList = uiComponentBuilder.componentList;
    }
  }

  setStyle(style: Object): CardComponent{
    let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
    return uiComponentBuilder
      .setStyle(style)
      .buildCardComponent()
  }
  
  setGeometry(geometry: Object): CardComponent{
    let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
    return uiComponentBuilder
      .setGeometry(geometry)
      .buildCardComponent()
  }

  copy(): CardComponent{
    let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
    return uiComponentBuilder
      .buildCardComponent()
  }

  setServiceComponent(serviceComponent: IServiceEntry): CardComponent{
    let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
    return uiComponentBuilder
      .setServiceComponent(serviceComponent)
      .buildCardComponent();
  }

  setName(name: string): CardComponent{
    let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
    return uiComponentBuilder
      .setName(name)
      .buildCardComponent();
  }

  setProperties(properties: Object): CardComponent{
    let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
    return uiComponentBuilder
      .setProperties(properties)
      .buildCardComponent();
  }


  add(component: any): void {
    this.componentList.push(component);
  }

  getInfo(): any {
    return {
      card: {
        name: this.name,
        header: this.header,
        children: this.expandChildren()
      }
    }
  }

  remove(component: UIComponent): void {
  }
}