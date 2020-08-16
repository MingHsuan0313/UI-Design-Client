import {Library} from './library';
import {HttpHeaders} from '@angular/common/http';
import {HttpClient} from '@angular/common/http';
import {Layout, UIComponent} from '../models/model';
import {PropertyGenerator} from './property-generator';
import {NavigationComponent} from '../models/navigation-component.model';

export class Storage {
  static newCompositeList: any[] = [];  // store reusable composite component
  static components: any[] = [];
  static layoutComponent: Layout;
  static UICDL: any[] = [];
  static PageUICDL: any = {};
  static library: any = Library;
  static layout: any = '';
  static isNewPage = true;

  // unorder, check if component exists / data binding
  static navigationList: NavigationComponent[] = [];
  static navigationFlow: NavigationComponent;

  // for temporary import
  static PageComponents: any[] = [];
  static image: any[] = [];

  static add(component: UIComponent) {
    this.components.push(component);
    this.UICDL.push(component.getInfo());
    if (component.selector.startsWith('card') || component.selector.startsWith('form')) {
      this.newCompositeList.push(component);
      console.log("composite is pushed");
      this.library['genre']['CoreUI']['category']['Containers'].push(component.selector);
    }
  }

  static setLayoutComponent(component) {
    this.layoutComponent = component;
  }

  static getGenre(): any[] {
    return Object.keys(this.library['genre']);
  }

  static getCategories(genre: string): any[] {
    return Object.keys(this.library['genre'][genre]['category']);
  }

  static getComponents(genre: string, category: string): any[] {
    return Object.values(this.library['genre'][genre]['category'][category]);
  }

  static getComponentProperties(component: string): any[] {
    if(this.library['components'][component] == undefined) return undefined;
    return Object.values(this.library['components'][component]);
  }

  static getCompositeElements(component: string): any[] {
    return Object.values(this.library['compositeComponents'][component]);
  }

  static getComponentValue(componentType: string): any {
    return Object.values(this.library['componentValue'][componentType]);
  }

  static getCompositeByName(componentName){
    for(let component of this.newCompositeList){
      console.log(component.selector);
      console.log(componentName);
      if(component.selector == componentName){
        console.log("match");
        return component;
      }
    }
  }

  static getPageUICDL() {
    if (this.isNewPage) {
      this.PageUICDL['id'] = PropertyGenerator.getPageID();
      this.PageUICDL['selector'] = 'page' + this.PageUICDL['id'];
      this.isNewPage = false;
    }
    this.layoutComponent['componentList'] = this.UICDL;
    this.PageUICDL['componentList'] = (this.layoutComponent);

    return this.PageUICDL;
  }

  static clearTemp() {
    this.components = [];
    this.UICDL = [];
  }
}



