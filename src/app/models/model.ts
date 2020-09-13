export interface UIComponent {
  x: String;
  y: String;
  width: String;
  height: String;
  id: String;
  selector: String;
  type: String;
  style: Object;
  layout: String;
  category: String;

  serviceComponent: ServiceComponentModel;

  add(component: UIComponent): void;
  remove(component: UIComponent): void;
  getInfo(): any;
}

export class Icon implements UIComponent {
  x: String;
  y: String;
  width: String;
  height: String;
  id: String;
  selector: String;
  type: String;
  style: String;
  layout: String;
  text: String;
  category: String;

  serviceComponent: ServiceComponentModel;

  constructor(init?: Partial<Icon>) {
    Object.assign(this, init);
    this.category = "informative";
    this.serviceComponent = new ServiceComponentModel();
  }

  add(component: UIComponent): void {
  }

  getInfo(): any {
    return this;
  }

  remove(component: UIComponent): void {
  }
}

export class Text implements UIComponent {
  x: String;
  y: String;
  width: String;
  height: String;
  id: String;
  selector: String;
  type: String;
  style: String;
  layout: String;
  text: String;
  href: String;
  category: String;

  serviceComponent: ServiceComponentModel;

  constructor(init?: Partial<Text>) {
    Object.assign(this, init);
    this.category = "informative";
    this.serviceComponent = new ServiceComponentModel();
  }

  add(component: UIComponent): void {
  }

  getInfo(): any {
    return this;
  }

  remove(component: UIComponent): void {
  }
}

export class Button implements UIComponent {
  x: String;
  y: String;
  width: String;
  height: String;
  id: String;
  selector: String;
  type: String;
  style: String;
  layout: String;
  text: String;
  href: String;
  category: String;

  serviceComponent: ServiceComponentModel;

  constructor(init?: Partial<Button>) {
    Object.assign(this, init);
    this.category = "informative";
    this.serviceComponent = new ServiceComponentModel();
  }

  add(component: UIComponent): void {
  }

  getInfo(): any {
    return this;
  }

  remove(component: UIComponent): void {
  }
}

export class Table implements UIComponent {
  x: String;
  y: String;
  width: String;
  height: String;
  id: String;
  selector: String;
  type: String;
  style: String;
  layout: String;
  headers: any[];
  rows: any[];
  category: String;

  serviceComponent: ServiceComponentModel;

  constructor(init?: Partial<Table>) {
    Object.assign(this, init);
    this.category = "informative";
    this.serviceComponent = new ServiceComponentModel();
  }

  add(component: UIComponent): void {
  }

  getInfo(): any {
    return this;
  }

  remove(component: UIComponent): void {
  }
}

export class CardComposite implements UIComponent {
  x: String;
  y: String;
  width: String;
  height: String;
  id: String;
  selector: String;
  type: String;
  style: String;
  layout: String;
  header: String;
  componentList: any[] = [];
  category: String;

  serviceComponent: ServiceComponentModel;

  constructor(init?: Partial<CardComposite>) {
    Object.assign(this, init);
    this.category = "informative";
    this.serviceComponent = new ServiceComponentModel();
  }


  add(component: any): void {
    this.componentList.push(component);
  }

  getInfo(): any {
    return this;
  }

  remove(component: UIComponent): void {
  }
}

export class Dropdown implements UIComponent {
  x: String;
  y: String;
  width: String;
  height: String;
  id: String;
  selector: String;
  type: String;
  style: String;
  layout: String;
  items: any[];
  category: String;

  serviceComponent: ServiceComponentModel;

  constructor(init?: Partial<Dropdown>) {
    Object.assign(this, init);
    this.category = "informative";
    this.serviceComponent = new ServiceComponentModel();
  }

  add(component: UIComponent): void {
  }

  getInfo(): any {
    return this;
  }

  remove(component: UIComponent): void {
  }
}

export class InputGroupComposite implements UIComponent {
  x: String;
  y: String;
  width: String;
  height: String;
  id: String;
  selector: String;
  type: String;
  style: String;
  layout: String;
  componentList: any[] = [];
  category: String;

  serviceComponent: ServiceComponentModel;

  constructor(init?: Partial<InputGroupComposite>) {
    Object.assign(this, init);
    this.category = "input";
    this.serviceComponent = new ServiceComponentModel();
  }

  add(component: UIComponent): void {
    this.componentList.push(component);
  }

  getInfo(): any {
    return this;
  }

  remove(component: UIComponent): void {
  }
}

export class INPUT implements UIComponent {
  x: String;
  y: String;
  width: String;
  height: String;
  id: String;
  selector: String;
  type: String;
  style: String;
  layout: String;
  typeInfo: String;  // e.g. input-text, input-password
  category: String;

  serviceComponent: ServiceComponentModel;

  constructor(init?: Partial<INPUT>) {
    Object.assign(this, init);
    this.category = "input";
    this.serviceComponent = new ServiceComponentModel();
  }

  add(component: UIComponent): void {
  }

  getInfo(): any {
    return this;
  }

  remove(component: UIComponent): void {
  }
}

export class BreadcrumbComposite implements UIComponent {
  x: String;
  y: String;
  width: String;
  height: String;
  id: String;
  selector: String;
  type: String;
  style: String;
  layout: String;
  componentList: any[] = [];
  category: String;

  serviceComponent: ServiceComponentModel;
  serviceType: ServiceMappingType;
  argumentName: String;

  constructor(init?: Partial<BreadcrumbComposite>) {
    Object.assign(this, init);
    this.category = "navigation";
    this.serviceComponent = new ServiceComponentModel();
  }

  add(component: UIComponent): void {
    this.componentList.push(component);
  }

  getInfo(): any {
    return this;
  }

  remove(component: UIComponent): void {
  }
}

export class FormComposite implements UIComponent {
  x: String;
  y: String;
  width: String;
  height: String;
  id: String;
  selector: String;
  type: String;
  style: String;
  layout: String;
  componentList: any[] = [];
  category: String;

  serviceComponent: ServiceComponentModel;
  serviceType: ServiceMappingType;
  argumentName: String;

  constructor(init?: Partial<FormComposite>) {
    Object.assign(this, init);
    this.category = "input";
    this.serviceComponent = new ServiceComponentModel();
  }

  add(component: UIComponent): void {
    this.componentList.push(component);
  }

  getInfo(): any {
    return this;
  }

  remove(component: UIComponent): void {
  }
}

export class Layout implements UIComponent {
  x: String;
  y: String;
  width: String;
  height: String;
  id: String;
  selector: String;
  type: String;       // layout1, layout2, ...
  style: String;
  layout: String;
  componentList: any[] = [];
  header: any[] = [];
  sidebar: any[] = [];
  footer: any[] = [];
  asidebar: any[] = [];
  category: String;

  serviceComponent: ServiceComponentModel;

  constructor(init?: Partial<Layout>) {
    Object.assign(this, init);
    this.category = "layout";
    this.serviceComponent = new ServiceComponentModel();
  }

  add(component: UIComponent): void {
  }

  getInfo(): any {
    return this;
  }

  remove(component: UIComponent): void {
  }
}

export enum ServiceMappingType {
  service = "ServiceComponent",
  argument = "Argument",
  none = "None",
}

export class ServiceComponentModel {
  name:String;
  preference: number;
  serviceType: ServiceMappingType;
  code: String;

  constructor() {
    this.name = "";
    this.preference = 0;
    this.serviceType = ServiceMappingType["none"];
    this.code = "";
  }

  setName(serviceComponentName: String) {
    this.name = serviceComponentName;
  }

  setPreference(preference: number) {
    this.preference = preference;
  }

  setServiceType(serviceType: ServiceMappingType) {
    this.serviceType = serviceType;
  }

  setCode(code: String) {
    this.code = code;
  }
}