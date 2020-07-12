import UIComponent from "./ui-component.model";

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