export class NavigationComponent {
  path: any;
  component: any;
  serviceComponent: any;
  children: any[] = [];

  add(child) {
    this.children.push(child);
  }
}
