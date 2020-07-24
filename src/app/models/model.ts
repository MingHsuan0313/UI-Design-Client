export interface UIComponent {
  x: String;
  y: String;
  width: String;
  height: String;
  id: String;
  selector: String;
  type: String;
  style: String;

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
  text: String;

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
  text: String;
  href: String;

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
  text: String;
  href: String;

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
  headers: any[];
  rows: any[];

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
  header: String;
  componentList: any[] = [];

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
  items: any[];

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
  componentList: any[] = [];

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
}

export class INPUT implements UIComponent {
  x: String;
  y: String;
  width: String;
  height: String;
  id: String;
  selector: String;
  type: String;   // e.g. input-text, input-password
  style: String;

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
  componentList: any[] = [];

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
  componentList: any[] = [];

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
  header: any = [];
  sidebar: any = [];

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

}



