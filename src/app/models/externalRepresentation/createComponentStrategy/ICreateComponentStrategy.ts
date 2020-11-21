import { GraphStorage , VertexStorage , StyleStorage } from "../../graph-dependency";
import { PageUICDL } from "../../internalRepresentation/pageUICDL.model";
import { UIComponent } from "../../ui-component-dependency";
import { SelabEditor } from "../selab-editor.model";

export interface ICreateComponentStrategy {
  createComponent(graphStorage, component?:UIComponent, parent?:mxCell);
  // createLayoutComponent(selabEditor: SelabEditor, pageUICDL: PageUICDL);
  createDataBinding(part: String, index?);
}
