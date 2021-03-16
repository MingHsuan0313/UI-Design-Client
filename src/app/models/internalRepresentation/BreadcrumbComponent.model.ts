import { UIComponent } from "./UIComponent.model";
import { UIComponentBuilder } from "../../components/selab-wizard/UIComponentBuilder";
import { UIComponentFactory } from "src/app/components/selab-wizard/uicomponent-factory";
import { IServiceEntry, ServiceComponentModel } from "../service-component-dependency";
import { BasicComponent } from "./BasicComponent.model";

export class BreadcrumbComponent extends BasicComponent {
  items: string;

  constructor(uiComponentBuilder?: UIComponentBuilder) {
    if(uiComponentBuilder){
      super(uiComponentBuilder);
      let properties = uiComponentBuilder.getProperties();
      if(properties != undefined) {
        this.items = properties["items"];
      }
    }
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
}