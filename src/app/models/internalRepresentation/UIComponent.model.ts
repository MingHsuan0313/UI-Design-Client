import { ServiceComponentModel } from "../serviceComponent/service-component.model";

export class UIComponent {
  public id: String;
  public selector: String;
  public category: String;
  public style: Object;
  public x: String;
  public y: String;
  public width: String;
  public height: String;
  public type: String;
  public name: String;
  public serviceComponent: ServiceComponentModel;

  public getName(): String {
    return this.name;
  }

  public setName(name: String): void {
    this.name = name;
  }

  public getServiceComponent(): ServiceComponentModel {
    return this.serviceComponent;
  }

  public setServiceComponent(serviceComponent: ServiceComponentModel): void {
    this.serviceComponent = serviceComponent;
  }

  public getX(): String {
    return this.x;
  }

  public setX(x: String): void {
    this.x = x;
  }

  public getY(): String {
    return this.y;
  }

  public setY(y: String): void {
    this.y = y;
  }

  public getWidth(): String {
    return this.width;
  }

  public setWidth(width: String): void {
    this.width = width;
  }

  public getHeight(): String {
    return this.height;
  }

  public setHeight(height: String): void {
    this.height = height;
  }

  public getCategory(): String {
    return this.category;
  }

  public setCategory(category: String): void {
    this.category = category;
  }

  public getId(): String {
    return this.id;
  }

  public setId(id: String): void {
    this.id = id;
  }

  public getSelector(): String {
    return this.selector;
  }

  public setSelector(selector: String): void {
    this.selector = selector;
  }

  public getStyle(): Object {
    return this.style;
  }

  public setStyle(style: Object): void {
    this.style = style;
  }

  add(component: UIComponent) { }
  remove(component: UIComponent) { }
  getInfo() { }
}