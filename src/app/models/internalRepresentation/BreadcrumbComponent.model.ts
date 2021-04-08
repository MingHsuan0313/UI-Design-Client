import { UIComponentBuilder } from "../../components/selab-wizard/UIComponentBuilder";
import { UIComponentFactory } from "src/app/components/selab-wizard/uicomponent-factory";
import { BasicComponent } from "./BasicComponent.model";
import { IServiceEntry } from "../service-component-dependency";
import { UIComponent } from "./UIComponent.model";
export class BreadcrumbComponent extends BasicComponent {
  public readonly items: string;

  constructor(uiComponentBuilder?: UIComponentBuilder) {
    if(uiComponentBuilder){
      super(uiComponentBuilder);
      let properties = uiComponentBuilder.getProperties();
      if(properties != undefined) {
        this.items = properties["items"].value;
      }
    }
  }

  setProperties(properties: Object): BreadcrumbComponent {
    let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
    return uiComponentBuilder
      .setProperties(properties)
      .buildBreadcrumbComponent();
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