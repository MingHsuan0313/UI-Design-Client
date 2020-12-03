import { UIComponent } from "./UIComponent.model";
import { CompositeComponent } from "./CompositeComponent.model";
import { UIComponentBuilder } from "../UIComponentBuilder";
import { UIComponentFactory } from "src/app/components/selab-wizard/uicomponent-factory";
import { IServiceEntry } from "../store/serviceEntry.model";

export class BreadcrumbComponent extends CompositeComponent {

  constructor(uiComponentBuilder: UIComponentBuilder) {
    super(uiComponentBuilder);
    this.componentList = uiComponentBuilder.componentList;
  }

  setServiceComponent(serviceComponent: IServiceEntry): BreadcrumbComponent{
    let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
    return uiComponentBuilder
      .setServiceComponent(serviceComponent)
      .buildBreadcrumbComponent();
  }

  setName(name: string): BreadcrumbComponent{
    let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
    return uiComponentBuilder
      .setName(name)
      .buildBreadcrumbComponent();
  }

  setProperties(properties: Object): BreadcrumbComponent {
    let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
    return uiComponentBuilder
      .setProperties(properties)
      .buildBreadcrumbComponent();
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
    return ["text"];
  }

  add(component: UIComponent): void {
    this.componentList.push(component);
  }

  getInfo() {
    return {
      name: this.name,
      service: this.serviceComponent.getInfo(),
      children: this.expandChildren()
    }

  }

  remove(component: UIComponent): void {
  }
}
