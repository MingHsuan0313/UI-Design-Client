import { UIComponent } from "./UIComponent.model";
import { CompositeComponent } from "./CompositeComponent.model";
import { IServiceEntry } from "../store/serviceEntry.model";
import { UIComponentBuilder } from "../UIComponentBuilder";
import { UIComponentFactory } from "src/app/components/selab-wizard/uicomponent-factory";

export class InputGroupComponent extends CompositeComponent {
  componentList: any[] = [];

  constructor(uiComponentBuilder: UIComponentBuilder) {
    super(uiComponentBuilder);
    this.componentList = uiComponentBuilder.componentList;
  }

  setStyle(style: Object): InputGroupComponent {
    let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
    return uiComponentBuilder
      .setStyle(style)
      .buildInputGroupComponent()
  }
  
  setGeometry(geometry: Object): InputGroupComponent {
    let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
    return uiComponentBuilder
      .setGeometry(geometry)
      .buildInputGroupComponent()
  }

  copy(): InputGroupComponent {
    let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
    return uiComponentBuilder
      .buildInputGroupComponent()
  }

  setServiceComponent(serviceComponent: IServiceEntry): InputGroupComponent{
    let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
    return uiComponentBuilder
      .setServiceComponent(serviceComponent)
      .buildInputGroupComponent();
  }

  setName(name: string): InputGroupComponent{
    let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
    return uiComponentBuilder
      .setName(name)
      .buildInputGroupComponent();
  }

  setProperties(properties: Object): InputGroupComponent{
    let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
    return uiComponentBuilder
      .setProperties(properties)
      .buildInputGroupComponent();
  }


  getProperties() {
    return [
      {
        "type": "String",
        "value": "name"
      }
    ]
  }
  
  getChildrenOptions() {
    return ["text","button","icon","dropdown"];
  }

  add(component: UIComponent): void {
    this.componentList.push(component);
  }

  getInfo(): any {
    return this;
  }

  remove(component: UIComponent): void {
  }
}