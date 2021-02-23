import { Action } from '@ngrx/store';
import { PageUICDL } from 'src/app/models/internalRepresentation/pageUICDL.model';
import { UIComponent } from 'src/app/models/ui-component-dependency';

export enum IRActionTypes {
    INSERT_PAGE_UICDL = "[InternalRepresentation] Insert PageUICDL",
    INSERT_UI_COMPONENT = "[InternalRepresentation] Insert UI Component",    
    DELETE_PAGE_UICDL = "[InternalRepresentation] Delete PageUICDL",
    CLEAR_PAGE_UICDL = "[InternalRepresentation] Clear PageUICDL",
    RENAME_PAGE = "[InternalRepresentation] Rename Page",
    SYNC_WITH_ER = "[InternalRepresentation] Sync With External Representation",
    SET_PROJECT_NAME  = "[InternalRepresentation] Set Project Name",
    SET_LAYOUT = "[InternalRepresentation] Set Layout",
    INSERT_THEME = "[InternalRepresentation] Insert Theme",
    DELETE_THEME = "[InternalRepresentation] Delete Theme",
    RENAME_THEME = "[InternalRepresentation] Rename Theme"
}

export class IRInsertThemeAction implements Action {
    public type = IRActionTypes["INSERT_THEME"];
    constructor(public id: string, public name: string) { }
}

export class IRDeleteThemeAction implements Action {
    public type = IRActionTypes["DELETE_THEME"];
    constructor(public index: number) {}
}

export class IRRenameThemeAction implements Action {
    public type = IRActionTypes["RENAME_THEME"];
    constructor(public index: number, public newName: string) {}
}
    
export class IRSetLayoutAction implements Action {
    public type = IRActionTypes["SET_LAYOUT"];
    constructor(public id: string, public layout: string) {

    }
}

export class IRInsertUIComponentAction implements Action {
    public type = IRActionTypes["INSERT_UI_COMPONENT"];
    constructor(public id: string,public uiComponent: UIComponent) {}
}

export class IRSyncWithERAction implements Action {
    public type = IRActionTypes["SYNC_WITH_ER"];
    constructor(public id: string, public graphModel: []) {
    }
}

export class IRSetProjectNameAction implements Action {
    public type = IRActionTypes["SET_PROJECT_NAME"];
    constructor(public projectName: string) {}
}

export class IRRenamePageAction implements Action {
    public type = IRActionTypes["RENAME_PAGE"];
    constructor(public id: string, public pageName: string, public themeIndex: number, public pageIndex: number) {}
}

export class IRInsertPageUICDLAction implements Action {
    public type = IRActionTypes["INSERT_PAGE_UICDL"];
    constructor(public selectedThemeIndex: number,public pageUICDL: PageUICDL, public imsMain: boolean) {}
}

export class IRClearPageUICDLAction implements Action {
    public type = IRActionTypes["CLEAR_PAGE_UICDL"];
    constructor(public id: string) {}
}

export class IRDeletePageUICDLAction implements Action {
    public type = IRActionTypes["DELETE_PAGE_UICDL"];
    constructor(public selectedThemeIndex: number, public pageIndex: number, public id: string) {}
}
