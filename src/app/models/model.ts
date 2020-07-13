export interface UIComponent {
  x: String;
  y: String;
  width: String;
  height: String;
  ID: String;
  selector: String;

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

  constructor(init?:Partial<Icon>) {
    Object.assign(this,init);
  }
  add(component: UIComponent): void {
  }

  getInfo(): String {
    return "";
  }

  remove(component: UIComponent): void {
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

  constructor(init?:Partial<Icon>) {
    Object.assign(this,init);
  }

  add(component: UIComponent): void {
  }

  getInfo(): String {
    return "";
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
  text:String;

  constructor(init?:Partial<Icon>) {
    Object.assign(this,init);
  }
  add(component: UIComponent): void {
  }

  getInfo(): String {
    return "";
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
  headers:any[];
  rows:any[];

  constructor(init?:Partial<Icon>) {
    Object.assign(this,init);
  }
  add(component: UIComponent): void {
  }

  getInfo(): String {
    return "";
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
  header:String;
  componentList:any[]=[];
  constructor(init?:Partial<Icon>) {
    Object.assign(this,init);
  }
  add(component: any): void {
    this.componentList.push(component);
  }

  getInfo(): String {
    console.log("Card Composite get Info")
    console.log(this.componentList);
    return "";
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
  items:any[];

  constructor(init?:Partial<Icon>) {
    Object.assign(this,init);
  }
  add(component: UIComponent): void {
  }

  getInfo(): String {
    return "";
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

  constructor(init?:Partial<Icon>) {
    Object.assign(this,init);
  }
  add(component: UIComponent): void {
  }

  getInfo(): String {
    return "";
  }

  remove(component: UIComponent): void {
  }

}
