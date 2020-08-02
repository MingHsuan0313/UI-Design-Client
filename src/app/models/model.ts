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
  isArgument: String; // "" if it's not an argment , instead argument name

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
  serviceComponent: Object;
  isArgument: String;

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
  isArgument: String;

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
  isArgument: String;

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
  isArgument: String;

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
  isArgument: String;

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
  isArgument: String;

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
  isArgument: String;

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
  isArgument: String;

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
  isArgument: String;

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
  isArgument: String;

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
  isArgument: String;

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

  setServiceComponent(serviceComponent,argumentName?) {
    this.serviceComponent = serviceComponent;
    this.isArgument = argumentName;
  }
}