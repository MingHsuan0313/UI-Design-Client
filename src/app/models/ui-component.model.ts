export default interface UIComponent {
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
