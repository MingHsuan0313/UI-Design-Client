import {Injectable} from '@angular/core';
import {NavigationComponent} from '../models/navigation/navigation-component.model';
import {Storage} from '../shared/storage';


@Injectable({
  providedIn: 'root'
})

export default class NavigationService {


  createNavigationComponent(source, url, target) {

    let parent;

    // root setting: Default layout
    if (source == 'DefaultLayout') {
      if (Storage.navigationFlow == null) {
        parent = this.createRoot(source);
      } else {
        parent = Storage.navigationFlow;
      }
    } else{
      parent = this.findNavigationComponentByName(source);
    }

      let nc = this.findNavigationComponentByName(target);
      if (nc == null) {
        nc = new NavigationComponent();
        parent.add(nc);
        Storage.navigationList.push(nc);
        // nc[serviceComponent] = this.findServiceComponentByName();
      }
      nc['path'] = url;
      nc['component'] = target;

      return nc;
    }

    // should only call once
    createRoot(source) {
    console.log("create root");
      let root = new NavigationComponent();

      // default route
      root['path'] = '';
      root['component'] = 'DefaultLayout'; // now it is our default
      // root[serviceComponent] = this.findServiceComponentByName();
      Storage.navigationList.push(root);
      this.setRoot(root);
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

    setRoot(root) {
      Storage.navigationFlow = root;
    }
  }
