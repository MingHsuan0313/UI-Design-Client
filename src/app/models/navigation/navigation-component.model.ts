export class NavigationComponent {
  path: any;
  component: any;
  serviceComponent: any;
  children: any[] = [];

  add(child) {
    this.children.push(child);
  }

  remove(i) {
    this.children.splice(i, 1);
  }
}
