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

  add(component: UIComponent): void {
  }

  getInfo(): String {
    return '';
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

  add(component: UIComponent): void {
  }

  getInfo(): String {
    return '';
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

  add(component: UIComponent): void {
  }

  getInfo(): String {
    return '';
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

  add(component: UIComponent): void {
  }

  getInfo(): String {
    return '';
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

  add(component: UIComponent): void {
  }

  getInfo(): String {
    return '';
  }

  remove(component: UIComponent): void {
  }

}

export class DropdownComposite implements UIComponent {
  ID: String;
  height: String;
  selector: String;
  width: String;
  x: String;
  y: String;

  add(component: UIComponent): void {
  }

  getInfo(): String {
    return '';
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

  add(component: UIComponent): void {
  }

  getInfo(): String {
    return '';
  }

  remove(component: UIComponent): void {
  }

}
