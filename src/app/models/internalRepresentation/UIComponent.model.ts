import AbstractComponent from "src/app/shared/AbstractComponent.model";
import { ServiceComponentModel } from "../serviceComponent/service-component.model";
import { IServiceEntry, ServiceComponent } from "../store/serviceEntry.model";
import { UIComponentBuilder } from "../UIComponentBuilder";

export class UIComponent {
  protected readonly id: string;
  protected readonly selector: string;
  protected readonly category: string;
  protected readonly style: {};
  protected readonly geometry: {};
  protected readonly type: string;
  protected readonly name: string;
  protected serviceComponent: IServiceEntry;
  
  constructor(uiComponentBuilder?: UIComponentBuilder) {
    this.name = uiComponentBuilder.name;
    this.id = uiComponentBuilder.id;
    this.selector = uiComponentBuilder.selector;
    this.category = uiComponentBuilder.category;
    this.type = uiComponentBuilder.type; 
    this.style = uiComponentBuilder.style;
    this.geometry = uiComponentBuilder.geometry;
    this.serviceComponent = new IServiceEntry();
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
  
  setProperties(properties: Object): UIComponent {
    return new UIComponent();
  }
  
  setName(name: string): UIComponent {
    return new UIComponent();
  }
  
  setServiceComponent(serviceEntry: ServiceComponent) {
    return new UIComponent();
  }
  
  setGeometry(geometry: mxGeometry): UIComponent {
    return new UIComponent();
  }
  
  setStyle(style: Object): UIComponent {
    return new UIComponent();
  }
  
  copy() {
    
  }
  
  deleteBuilder() {

  }

  getInfo(): any {

  } // for Internal Representation (pageUICDL Output)
  getProperties(){} // form property
}