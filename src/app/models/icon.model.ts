import UIComponent from "./ui-component.model";

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