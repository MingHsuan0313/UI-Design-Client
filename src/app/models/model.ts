export interface UIComponent {
  x: String;
  y: String;
  width: String;
  height: String;
  ID: String;
  selector: String;
  type: String;

  add(component: UIComponent): void;
  remove(component: UIComponent): void;
  getInfo(): String;
}

export class Icon implements UIComponent {
  x: String;
  y: String;
  width: String;
  height: String;
  ID: String;
  selector: String;
  text: String;
  type: String;

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

  getValue() {

  }
}

export class Text implements UIComponent {
  ID: String;
  height: String;
  selector: String;
  width: String;
  x: String;
  y: String;
  text: String;
  href: String;
  type: String;

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

export class Button implements UIComponent {
  ID: String;
  height: String;
  selector: String;
  width: String;
  x: String;
  y: String;
  text: String;
  href: String;
  type: String;

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

export class Table implements UIComponent {
  ID: String;
  height: String;
  selector: String;
  width: String;
  x: String;
  y: String;
  headers: any[];
  rows: any[];
  type: String;

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

export class CardComposite implements UIComponent {
  ID: String;
  height: String;
  selector: String;
  width: String;
  x: String;
  y: String;
  header: String;
  type: String;
  componentList: any[] = [];

  constructor(init?: Partial<Icon>) {
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
  ID: String;
  height: String;
  selector: String;
  width: String;
  x: String;
  y: String;
  type: String;
  items: any[];

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

export class InputGroupComposite implements UIComponent {
  ID: String;
  height: String;
  selector: String;
  width: String;
  x: String;
  y: String;
  type: String;
  componentList: any[] = [];

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
