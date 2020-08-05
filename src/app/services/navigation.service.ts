import {Injectable} from '@angular/core';
import {NavigationComponent} from '../models/navigation-component.model';
import {Storage} from '../shared/storage';


@Injectable({
  providedIn: 'root'
})

export default class NavigationService {


  createNavigationComponent(source, url, target) {

    let parent = this.findParentByName(source);
    if (parent == 'None') {
      parent = this.createRoot(source);
    }

    let nc = new NavigationComponent();
    nc[path] = url;
    nc[component] = target;
    // nc[serviceComponent] = this.findServiceComponentByName();

    parent.add(nc);

    Storage.navigationList.push(nc);
    return nc;
  }

  createRoot(source) {
    let root = new NavigationComponent();

    // default route
    root[path] = '';
    root[component] = source;
    // root[serviceComponent] = this.findServiceComponentByName();
    Storage.navigationList.push(nc);
    return nc;
  }

  findParentByName(source) {
    for (let nav of Storage.navigationList) {
      if (nav[component] == source) {
        return nav;
      }
    }
    return 'None';
  }

  findServiceComponentByName(pageName) {

    return {};
  }
}
