import { IServiceEntry } from "../service-component-dependency";
import { UIComponentBuilder } from "../../components/selab-wizard/UIComponentBuilder";
import { UIComponentFactory } from "src/app/components/selab-wizard/uicomponent-factory";

export class UIComponent {
  public readonly id: string;
  public readonly selector: string;
  public readonly category: string;
  public readonly pageId: string;
  public readonly style: {};
  public readonly geometry: {};
  public readonly type: string;
  public readonly name: string;
  public readonly serviceComponent: IServiceEntry;
  public readonly properties: {};
  // public uiComponentBuilder: UIComponentBuilder;

  constructor(uiComponentBuilder?: UIComponentBuilder) {
    this.name = uiComponentBuilder.name;
    this.id = uiComponentBuilder.id;
    this.selector = uiComponentBuilder.selector;
    this.category = uiComponentBuilder.category;
    this.type = uiComponentBuilder.type; 
    this.style = uiComponentBuilder.style;
    this.geometry = uiComponentBuilder.geometry;
    this.serviceComponent = uiComponentBuilder.serviceComponent;
    this.pageId = uiComponentBuilder.pageId;
    this.properties = uiComponentBuilder.properties;
    // this.uiComponentBuilder = uiComponentBuilder;
  }

  public getName():  string{
    return this.name;
  }

  public getServiceComponent(): IServiceEntry {
    return this.serviceComponent;
  }

  public getCategory(): string {
    return this.category;
  }

  public getId():  string {
    return this.id;
  }

  public getSelector(): string{
    return this.selector;
  }

  public getStyle(): Object {
    return this.style;
  }
  
  public getType() {
    return this.type;
  }

  setName(name: string) {}
  setServiceComponent(serviceComponent: IServiceEntry) {}
  setStyle(style: object) {}
  setGeometry(geometry: object) {}
  copy() {}
  setProperties(properties: Object) {}
  getInfo() {} // for Internal Representation (pageUICDL Output)
  getProperties(){} // form property
}