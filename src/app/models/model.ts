export interface UIComponent {
  x: String;
  y: String;
  width: String;
  height: String;
  id: String;
  selector: String;
  type: String;
  style: String;
  layout: String;

  serviceComponent: Object;
  serviceType: ServiceMappingType;
  argumentName: String;

  add(component: UIComponent): void;

  remove(component: UIComponent): void;

  setArgument(argumentName): void;

  setServiceComponent(serviceComponent): void;

  setServiceType(serviceType: ServiceMappingType): void;

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

  serviceComponent: Object;
  serviceType: ServiceMappingType;
  argumentName: String;

  constructor(init?: Partial<Icon>) {
    Object.assign(this, init);
  }

  add(component: UIComponent): void {
  }

  getInfo(): any {
    return this;
  }

  remove(component: UIComponent): void {
  }

  setServiceComponent(serviceComponent): void {
    this.serviceComponent = serviceComponent;
  }

  setServiceType(serviceType: ServiceMappingType): void {
    this.serviceType = serviceType;
    if (serviceType == ServiceMappingType["none"] ||
      serviceType == ServiceMappingType["argument"]) {
      this.serviceComponent = {}
    }
  }

  setArgument(argumentName: any): void {
    this.argumentName = argumentName
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

  serviceComponent: Object;
  serviceType: ServiceMappingType;
  argumentName: String;

  constructor(init?: Partial<Text>) {
    Object.assign(this, init);
  }

  add(component: UIComponent): void {
  }

  getInfo(): any {
    return this;
  }

  remove(component: UIComponent): void {
  }

  setServiceComponent(serviceComponent) {
    this.serviceComponent = serviceComponent;
  }

  setServiceType(serviceType: ServiceMappingType): void {
    this.serviceType = serviceType;
    if (serviceType == ServiceMappingType["none"] ||
      serviceType == ServiceMappingType["argument"]) {
      this.serviceComponent = {}
    }
  }

  setArgument(argumentName: any): void {
    this.argumentName = argumentName;
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

  serviceComponent: Object;
  serviceType: ServiceMappingType;
  argumentName: String;

  constructor(init?: Partial<Button>) {
    Object.assign(this, init);
  }

  add(component: UIComponent): void {
  }

  getInfo(): any {
    return this;
  }

  remove(component: UIComponent): void {
  }

  setServiceComponent(serviceComponent) {
    this.serviceComponent = serviceComponent;

  }

  setServiceType(serviceType: ServiceMappingType): void {
    this.serviceType = serviceType;
    if (serviceType == ServiceMappingType["none"] ||
      serviceType == ServiceMappingType["argument"]) {
      this.serviceComponent = {}
    }
  }

  setArgument(argumentName: any): void {
    this.argumentName = argumentName;
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

  serviceComponent: Object;
  serviceType: ServiceMappingType;
  argumentName: String;

  constructor(init?: Partial<Table>) {
    Object.assign(this, init);
  }

  add(component: UIComponent): void {
  }

  getInfo(): any {
    return this;
  }

  remove(component: UIComponent): void {
  }

  setServiceComponent(serviceComponent) {
    this.serviceComponent = serviceComponent;
  }

  setServiceType(serviceType) {
    this.serviceType = serviceType;
    if (serviceType == ServiceMappingType["none"] ||
      serviceType == ServiceMappingType["argument"]) {
      this.serviceComponent = {}
    }
  }

  setArgument(argumentName: any): void {
    this.argumentName = argumentName;
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

  serviceComponent: Object;
  serviceType: ServiceMappingType;
  argumentName: String;

  constructor(init?: Partial<CardComposite>) {
    Object.assign(this, init);
  }


  add(component: any): void {
    this.componentList.push(component);
  }

  getInfo(): any {
    return this;
  }

  remove(component: UIComponent): void {
  }

  setServiceComponent(serviceComponent) {
    this.serviceComponent = serviceComponent;
  }

  setServiceType(serviceType) {
    this.serviceType = serviceType;
    if (serviceType == ServiceMappingType["none"] ||
      serviceType == ServiceMappingType["argument"]) {
      this.serviceComponent = {}
    }
  }

  setArgument(argumentName: any): void {
    this.argumentName = argumentName;
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

  serviceComponent: Object;
  serviceType: ServiceMappingType;
  argumentName: String;

  constructor(init?: Partial<Dropdown>) {
    Object.assign(this, init);
  }

  add(component: UIComponent): void {
  }

  getInfo(): any {
    return this;
  }

  remove(component: UIComponent): void {
  }

  setServiceComponent(serviceComponent) {
    this.serviceComponent = serviceComponent;
  }

  setServiceType(serviceType: ServiceMappingType) {
    this.serviceType = serviceType;
    if (serviceType == ServiceMappingType["none"] ||
      serviceType == ServiceMappingType["argument"]) {
      this.serviceComponent = {}
    }
  }

  setArgument(argumentName: any): void {
    this.argumentName = argumentName;
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

  serviceComponent: Object;
  serviceType: ServiceMappingType;
  argumentName: String;

  constructor(init?: Partial<InputGroupComposite>) {
    Object.assign(this, init);
  }

  add(component: UIComponent): void {
    this.componentList.push(component);
  }

  getInfo(): any {
    return this;
  }

  remove(component: UIComponent): void {
  }

  setServiceComponent(serviceComponent) {
    this.serviceComponent = serviceComponent;
  }
  
  setServiceType(serviceType: ServiceMappingType) {
    this.serviceType = serviceType;
    if (serviceType == ServiceMappingType["none"] ||
      serviceType == ServiceMappingType["argument"]) {
      this.serviceComponent = {}
    }
  }

  setArgument(argumentName: any): void {
    this.argumentName = argumentName;
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

  serviceComponent: Object;
  serviceType: ServiceMappingType;
  argumentName: String;

  constructor(init?: Partial<INPUT>) {
    Object.assign(this, init);
  }

  add(component: UIComponent): void {
  }

  getInfo(): any {
    return this;
  }

  remove(component: UIComponent): void {
  }

  setServiceComponent(serviceComponent) {
    this.serviceComponent = serviceComponent;
  }

  setServiceType(serviceType: ServiceMappingType) {
    this.serviceType = serviceType;
    if (serviceType == ServiceMappingType["none"] ||
      serviceType == ServiceMappingType["argument"]) {
      this.serviceComponent = {}
    }
  }

  setArgument(argumentName: any): void {
    this.argumentName = argumentName;
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

  serviceComponent: Object;
  serviceType: ServiceMappingType;
  argumentName: String;

  constructor(init?: Partial<BreadcrumbComposite>) {
    Object.assign(this, init);
  }

  add(component: UIComponent): void {
    this.componentList.push(component);
  }

  getInfo(): any {
    return this;
  }

  remove(component: UIComponent): void {
  }

  setServiceComponent(serviceComponent) {
    this.setServiceComponent = serviceComponent;
  }

  setServiceType(serviceType: ServiceMappingType) {
    this.serviceType = serviceType;
    if (serviceType == ServiceMappingType["none"] ||
      serviceType == ServiceMappingType["argument"]) {
      this.serviceComponent = {}
    }
  }

  setArgument(argumentName: any): void {
    this.argumentName = argumentName;
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

  serviceComponent: Object;
  serviceType: ServiceMappingType;
  argumentName: String;

  constructor(init?: Partial<FormComposite>) {
    Object.assign(this, init);
  }

  add(component: UIComponent): void {
    this.componentList.push(component);
  }

  getInfo(): any {
    return this;
  }

  remove(component: UIComponent): void {
  }

  setServiceComponent(serviceComponent) {
    this.serviceComponent = serviceComponent;
  }

  setServiceType(serviceType: ServiceMappingType) {
    this.serviceType = serviceType;
    if (serviceType == ServiceMappingType["none"] ||
      serviceType == ServiceMappingType["argument"]) {
      this.serviceComponent = {}
    }
  }

  setArgument(argumentName: any): void {
    this.argumentName = argumentName;
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

  serviceComponent: Object;
  serviceType: ServiceMappingType;
  argumentName: String;

  constructor(init?: Partial<Layout>) {
    Object.assign(this, init);
  }

  add(component: UIComponent): void {
  }

  getInfo(): any {
    return this;
  }

  remove(component: UIComponent): void {
  }

  setServiceComponent(serviceComponent, argumentName?) {
    this.serviceComponent = serviceComponent;
  }

  setServiceType(serviceType: ServiceMappingType) {
    this.serviceType = serviceType;
    if (serviceType == ServiceMappingType["none"] ||
      serviceType == ServiceMappingType["argument"]) {
      this.serviceComponent = {}
    }
  }

  setArgument(argumentName: any): void {
    this.argumentName = argumentName;
  }
}

export enum ServiceMappingType {
  service = "ServiceComponent",
  argument = "Argument",
  none = "None",
}