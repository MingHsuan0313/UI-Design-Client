import {Library} from './library';
import {HttpHeaders} from '@angular/common/http';
import {HttpClient} from '@angular/common/http';
import {Layout, UIComponent} from '../models/ui-component-dependency';
import {PropertyGenerator} from './property-generator';
import {NavigationComponent} from '../models/navigation/navigation-component.model';
import * as _ from 'lodash';
import { PageUICDL } from '../models/internalRepresentation/pageUICDL.model';

export class Storage {
  static newCompositeList: any[] = [];  // store reusable composite component
  static components: any[] = [];
  static layoutComponent: Layout;
  static pageUICDL: PageUICDL;
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
  
  constructor() {
    console.log("storage initialization");
  }

  static add(component: UIComponent) {
    console.log("push ui component");
    this.components.push(component);
    console.log(this.components);

    console.log("layout component");
    console.log(this.layoutComponent);

    if (component.selector.startsWith('card') || component.selector.startsWith('form')) {
      this.newCompositeList.push(component);
      this.library['genre']['CoreUI']['category']['Containers'].push(component.selector);
    }
    console.log(this.pageUICDL);
    this.pageUICDL.body.componentList.push(component);
  }

  static setLayoutComponent(component) {
    // this.layoutComponent = _.cloneDeep(component);
    // this.layoutComponent["componentList"] = this.components;
    // console.log("layout component");
    // console.log(this.layoutComponent);
    // this.pageUICDL['componentList'] = (this.layoutComponent);
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
     const clonedPageUICDL = _.cloneDeep(this.pageUICDL);
     return clonedPageUICDL;
  }

  static createPageUICDL(){
    // if (this.isNewPage) {
    //   this.pageUICDL['id'] = PropertyGenerator.getPageID();
    //   this.pageUICDL['selector'] = 'page' + this.pageUICDL['id'];
    //   this.pageUICDLList.push(this.pageUICDL);
    //   this.isNewPage = false;
    // }
    // this.pageUICDL['componentList'] = [];
  }

  static clearTemp() { 
    this.components = [];
    console.log("clear graph")
  }
  
  static setPageUICDL(pageUICDL: PageUICDL) {
    this.pageUICDL = pageUICDL;  
  }
}



