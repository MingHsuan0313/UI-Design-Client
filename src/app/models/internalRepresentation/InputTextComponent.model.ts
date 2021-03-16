import { BasicComponent } from "./BasicComponent.model";
import { UIComponentBuilder } from "../../components/selab-wizard/UIComponentBuilder";
import { UIComponentFactory } from "src/app/components/selab-wizard/uicomponent-factory";

export class InputTextComponent extends BasicComponent {
  public readonly typeInfo: string;  // e.g. input-text, input-password
  public readonly description: string;

  constructor(uiComponentBuilder?: UIComponentBuilder) {
    if (uiComponentBuilder) {
      super(uiComponentBuilder);
      let properties = uiComponentBuilder.getProperties();
      if (properties != undefined) {
        this.typeInfo = properties["typeInfo"];
        this.description = properties["name"];
      }
    }
  }

  getInfo(): any {
    return {
      [this.getSelector().toString()]: {
        name: this.name,
        service: this.serviceComponent.getInfo()
      }
    }
  }
}