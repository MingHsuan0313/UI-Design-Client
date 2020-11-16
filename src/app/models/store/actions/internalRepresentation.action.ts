import { Action } from '@ngrx/store';
import { PageUICDL } from 'src/app/models/internalRepresentation/pageUICDL.model';
import { UIComponent } from 'src/app/models/ui-component-dependency';

export enum IRActionTypes {
    INITIALIZATION = "[InternalRepresentation] Initialize PageUICDL",
    INSERT_UI_COMPONENT = "[InternalRepresentation] Insert UI Component",    
}
    
export class IRInsertUIComponentAction implements Action {
    public type = IRActionTypes["INSERT_UI_COMPONENT"];
    constructor(public uiComponent: UIComponent) {}
}

export class IRInitializePageUICDLAction implements Action {
    public type = IRActionTypes["INITIALIZATION"];
    constructor(public pageUICDL: PageUICDL) {}
}
