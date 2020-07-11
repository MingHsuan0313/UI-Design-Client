import {Library} from "./library";
import {UIComponent} from "../models/model";

export class Storage {
  static components: any[];
  static UICDL: any[];
  static PageUICDL: any[];
  static library: any = Library;
  static add(component: UIComponent) {}

  static getGenre(): any[] {
    return Object.keys(this.library["genre"]);
  }
  static getCategories(genre: string): any[] {
    return Object.keys(this.library["genre"][genre]["category"]);
  }
  static getComponents(genre: string, category: string): any[] {
    return Object.values(this.library["genre"][genre]["category"][category]);
  }

}
