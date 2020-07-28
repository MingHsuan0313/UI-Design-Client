import {Library} from "./library";
import {UIComponent} from "../models/modelDependency";
import {HttpHeaders} from "@angular/common/http";
import {HttpClient} from "@angular/common/http";
import {Layout} from '../models/model';

export class Storage {
  static components: any[] = [];
  static layoutComponent: Layout;
  static UICDL: any[] = [];
  static PageUICDL: any = {};
  static library: any = Library;
  static layout: any = "";

  static add(component: UIComponent) {
    this.components.push(component);
    this.UICDL.push(component.getInfo());
  }

  static setLayoutComponent(component) {
    this.layoutComponent = component;
  }

  static getGenre(): any[] {
    return Object.keys(this.library["genre"]);
  }
  static getCategories(genre: string): any[] {
    return Object.keys(this.library["genre"][genre]["category"]);
  }
  static getComponents(genre: string, category: string): any[] {
    return Object.values(this.library["genre"][genre]["category"][category]);
  }
  static getComponentProperties(component: string): any[] {
    return Object.values(this.library["components"][component]);
  }

  static getCompositeElements(component: string): any[] {
    return Object.values(this.library["compositeComponents"][component]);
  }

  static getComponentValue(componentType: string): any {
    return Object.values(this.library["componentValue"][componentType]);
  }

  static getPageUICDL() {
    this.PageUICDL["selector"] = "page1";
    this.layoutComponent["componentList"] = this.UICDL;
    this.PageUICDL["componentList"] = (this.layoutComponent);
    return this.PageUICDL;
  }
}


