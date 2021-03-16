import { UIComponentBuilder } from "../../components/selab-wizard/UIComponentBuilder";
import { UIComponentFactory } from "src/app/components/selab-wizard/uicomponent-factory";
import { BasicComponent } from "./BasicComponent.model";

export class BreadcrumbComponent extends BasicComponent {
  public readonly items: string;

  constructor(uiComponentBuilder?: UIComponentBuilder) {
    if(uiComponentBuilder){
      super(uiComponentBuilder);
      let properties = uiComponentBuilder.getProperties();
      if(properties != undefined) {
        this.items = properties["items"];
      }
    }
  }

  setProperties(properties: Object): BreadcrumbComponent {
    let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
    return uiComponentBuilder
      .setProperties(properties)
      .buildBreadcrumbComponent();
  }
}