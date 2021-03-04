import { GraphStorage , VertexStorage , StyleStorage } from "../../graph-dependency";
import { PageUICDL } from "../../internalRepresentation/pageUICDL.model";
import { UIComponent } from "../../ui-component-dependency";
import { SelabEditor } from "../selab-editor.model";

export abstract class ICreateComponentStrategy {
  basex: number;
  basey: number;
  height:number;
  width: number;
  restoreMode:Boolean = false;

  constructor(geometry?, restoreMode?) {
    this.restoreMode = restoreMode == undefined ? false : restoreMode;
    // basic component
    if (geometry == undefined) {
      this.basex = 0;
      this.basey = 0;
      
    } else {
      this.basex = geometry.x;
      this.basey = geometry.y;
      this.width = geometry.width;
      this.height = geometry.height;
    }
  }

  abstract createComponent(graphStorage, component?:UIComponent, parent?:mxCell);
  // createLayoutComponent(selabEditor: SelabEditor, pageUICDL: PageUICDL);
  abstract createDataBinding(part: String, index?);
}
