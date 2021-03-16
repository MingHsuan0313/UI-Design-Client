import { BasicComponent } from "./BasicComponent.model";
import { UIComponentBuilder } from "../../components/selab-wizard/UIComponentBuilder";
import { UIComponentFactory } from "src/app/components/selab-wizard/uicomponent-factory";
import { IServiceEntry } from "../service-component-dependency";

export class TableComponent extends BasicComponent {
  public readonly headers: string;
  public readonly rows: string;

  constructor(uiComponentBuilder?: UIComponentBuilder) {
    if (uiComponentBuilder) {
      super(uiComponentBuilder);
      let properties = uiComponentBuilder.getProperties();
      if (properties != undefined) {
        this.headers = properties["headers"];
        this.rows = properties["rows"];
      }
    }
  }

  getValue(part: string, index: number): string {
    if (part == "header") {
      return this.headers.split(" ")[index]
    }
    else if (part == "row") {
      return this.rows.split(" ")[index]
    }
  }

  getInfo() {
    return {
      [this.getSelector().toString()]: {
        name: this.name,
        headers: this.headers,
        service: this.serviceComponent.getInfo()
      }
    };
  }
}