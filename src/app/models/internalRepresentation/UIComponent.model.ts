import AbstractComponent from "src/app/shared/AbstractComponent.model";
import { ServiceComponentModel } from "../serviceComponent/service-component.model";
import { UIComponentBuilder } from "../UIComponentBuilder";

export class UIComponent {
  protected readonly id: string;
  protected readonly selector: string;
  protected readonly category: string;
  protected readonly style: Map<string,string>;
  protected readonly geometry: mxGeometry;
  protected readonly type: string;
  protected readonly name: string;
  protected readonly serviceComponent: ServiceComponentModel;
  
  constructor(uiComponentBuilder?: UIComponentBuilder) {
    this.name = uiComponentBuilder.name;
    this.id = uiComponentBuilder.id;
    this.selector = uiComponentBuilder.selector;
    this.category = uiComponentBuilder.category;
    this.type = uiComponentBuilder.type; 
    this.serviceComponent = new ServiceComponentModel();
  }

  public getName():  string{
    return this.name;
  }

  public getServiceComponent(): ServiceComponentModel {
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
  
  setProperties(properties: Object): UIComponent {
    return new UIComponent();
  }
  
  setName(name: string): UIComponent {
    return new UIComponent();
  }
  
  deleteBuilder() {

  }

  getInfo(): any {

  } // for Internal Representation (pageUICDL Output)
  getProperties(){} // form property
}