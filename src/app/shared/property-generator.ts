export class PropertyGenerator {
  static id = 1;

  static getID() {
    this.id++;
    return this.id.toString();
  }

  static getSelector(componentName) {
    this.id++;
    return componentName + this.id.toString();
  }
}
