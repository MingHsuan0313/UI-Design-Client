import {Library} from './library';
import {HttpHeaders} from '@angular/common/http';
import {HttpClient} from '@angular/common/http';
import {Layout, UIComponent} from '../models/ui-components-dependency';
import {PropertyGenerator} from './property-generator';
import {NavigationComponent} from '../models/navigation/navigation-component.model';
import * as _ from 'lodash';

export class Storage {
  static newCompositeList: any[] = [];  // store reusable composite component
  static components: any[] = [];
  static layoutComponent: Layout;
  static UICDL: any[] = [];
  static PageUICDL: any = {};
  static library: any = Library;
  static layout: any = '';
  static isNewPage = true;
  static pageUICDLList: any[] = [];

  // unorder, check if component exists / data binding
  static navigationList: NavigationComponent[] = [];
  static navigationFlow: NavigationComponent;

  // for temporary import
  static PageComponents: any[] = [];
  static images: any[] = [];

  static add(component: UIComponent) {
    this.components.push(component);
    this.UICDL.push(component.getInfo());
    if (component.selector.startsWith('card') || component.selector.startsWith('form')) {
      this.newCompositeList.push(component);
      console.log("composite is pushed");
      this.library['genre']['CoreUI']['category']['Containers'].push(component.selector);
    }
  }

  static removeComponentByIDs(componentIDs: String[]) {

  }

  static removeComponentByID(componentID: String) {

  }

  static copyComponentByID(componentID: String) {

  }

  static copyComponentByIDs(componentIDs: String[]) {

  }

  static setLayoutComponent(component) {
    this.layoutComponent = _.cloneDeep(component);
    this.layoutComponent["componentList"] = this.UICDL;
    this.PageUICDL['componentList'] = (this.layoutComponent);
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
     const clonedPageUICDL = _.cloneDeep(this.PageUICDL);
     return clonedPageUICDL;
  }

  static createPageUICDL(){
    if (this.isNewPage) {
      this.PageUICDL['id'] = PropertyGenerator.getPageID();
      this.PageUICDL['selector'] = 'page' + this.PageUICDL['id'];
      this.pageUICDLList.push(this.PageUICDL);
      this.isNewPage = false;
    }
    this.PageUICDL['componentList'] = [];

  }

  

  static clearTemp() { 
    this.components = [];
    this.UICDL = [];
    console.log("clear graph")
  }
}



