import { UIComponent } from "./UIComponent.model";
import { CompositeComponent } from "./CompositeComponent.model";
import { IServiceEntry } from "../service-component-dependency";
import { UIComponentBuilder } from "../../components/selab-wizard/UIComponentBuilder";
import { UIComponentFactory } from "src/app/components/selab-wizard/uicomponent-factory";

export class InputGroupComponent extends CompositeComponent {
  public readonly componentList: any[] = [];

  constructor(uiComponentBuilder?: UIComponentBuilder) {
    super(uiComponentBuilder);
    this.componentList = uiComponentBuilder.componentList;
  }

  setProperties(properties: Object): InputGroupComponent{
    let uiComponentBuilder = UIComponentFactory.uiComponentBuilders.get(this.id);
    return uiComponentBuilder
      .setProperties(properties)
      .buildInputGroupComponent();
  }

  add(component: UIComponent): void {
    this.componentList.push(component);
  }
}