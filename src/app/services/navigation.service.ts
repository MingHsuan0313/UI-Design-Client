import {Injectable} from '@angular/core';
import {NavigationComponent} from '../models/navigation-component.model';
import {Storage} from '../shared/storage';


@Injectable({
  providedIn: 'root'
})

export default class NavigationService {


  createNavigationComponent(source, url, target) {

    let parent = this.findNavigationComponentByName(source);
    if (parent == null) {
      parent = this.createRoot(source);
    }

    let nc = this.findNavigationComponentByName(target);
    if (nc == null) {
      nc = new NavigationComponent();
      // nc[serviceComponent] = this.findServiceComponentByName();
    }
    nc['path'] = url;
    nc['component'] = target;
    parent.add(nc);

    Storage.navigationList.push(nc);
    return nc;
  }

  createRoot(source) {
    let root = new NavigationComponent();

    // default route
    root['path'] = '';
    root['component'] = 'DefaultLayoutComponent'; // now it is our default
    // root[serviceComponent] = this.findServiceComponentByName();
    Storage.navigationList.push(root);
    this.setRoot();
    return root;
  }

  findNavigationComponentByName(source) {
    for (let nav of Storage.navigationList) {
      if (nav['component'] == source) {
        return nav;
      }
    }
  }

  findServiceComponentByName(pageName) {

    return {};
  }

  setRoot() {
    Storage.navigationFlow = this.findNavigationComponentByName('DefaultLayoutComponent');
  }
}
