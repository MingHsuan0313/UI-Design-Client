import { Action } from '@ngrx/store';
import { PageUICDL } from 'src/app/models/internalRepresentation/pageUICDL.model';
import { UIComponent } from 'src/app/models/ui-component-dependency';

export enum IRActionTypes {
    INSERT_PAGE_UICDL = "[InternalRepresentation] Insert PageUICDL",
    INSERT_PAGE_IMAGE = "[InternalRepresentation] Insert Page Image",
    INSERT_UI_COMPONENT = "[InternalRepresentation] Insert UI Component",    
    DELETE_PAGE_UICDL = "[InternalRepresentation] Delete PageUICDL",
    CLEAR_PAGE_UICDL = "[InternalRepresentation] Clear PageUICDL",
    RENAME_PAGE = "[InternalRepresentation] Rename Page",
    SYNC_WITH_ER = "[InternalRepresentation] Sync With External Representation",
    SET_PROJECT_NAME  = "[InternalRepresentation] Set Project Name",
    SET_LAYOUT = "[InternalRepresentation] Set Layout",
    INSERT_THEME = "[InternalRepresentation] Insert Theme",
    DELETE_THEME = "[InternalRepresentation] Delete Theme",
    RENAME_THEME = "[InternalRepresentation] Rename Theme",
    ADD_NDL_EDGE = "[InternalRepresentation] Add NDL Page Edge",
    CLEAR_NDL_EDGE = "[InternalRepresentation] Clear NDL Page Edge",
    //INITIAL_NDL = "[InternalRepresentation] Initial NDL",
    INSERT_NDL_PAGE = "[InternalRepresentation] Insert NDL Page",
    DELETE_NDL_PAGE = "[InternalRepresentation] Delete NDL Page",
    INSERT_SUMDL_SERVICE = "[InternalRepresentation] Insert SUMDL Service",
    INSERT_SUMDL_SERVICE_RETURN = "[InternalRepresentation] Insert SUMDL Service Return",
    DELETE_SUMDL_RETURN = "[InternalReprsenttaiton] Delete SUMDL Return",
    DELETE_ALL_DLs_THEMES = "[InternalRepresentation] Delete ALL Description Languages and Themes",
    LOAD_NDL_FROM_DB = "InternalRepresentation] Load NDL Data From DB",
    LOAD_SUMDL_FROM_DB = "InternalRepresentation] Load SUMDL Data From DB"
}

export class IRInsertSumdlServiceAction implements Action {
    public type = IRActionTypes['INSERT_SUMDL_SERVICE'];
    constructor(public pageId: string, public serviceName: string) {};
}
export class IRInsertSumdlServiceReturnAction implements Action {
    public type = IRActionTypes['INSERT_SUMDL_SERVICE_RETURN'];
    constructor(public pageId: string,public serviceName: string, public returnObject: {}) {}
}

export class  IRDeleteSumdlReturnAction implements Action {
    public type = IRActionTypes['DELETE_SUMDL_RETURN'];
    constructor(public pageId: string) {}

}

export class IRInsertPageImageAction implements Action {
    public type = IRActionTypes['INSERT_PAGE_IMAGE'];
    constructor(public id: string, public pageImage: string) {}
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
    constructor(public selectedThemeIndex: number,public pageUICDL: PageUICDL, public isMain: boolean) {}
}

export class IRClearPageUICDLAction implements Action {
    public type = IRActionTypes["CLEAR_PAGE_UICDL"];
    constructor(public id: string) {}
}

export class IRDeletePageUICDLAction implements Action {
    public type = IRActionTypes["DELETE_PAGE_UICDL"];
    constructor(public selectedThemeIndex: number, public pageIndex: number, public id: string) {}
}
export class IRAddNDLEdgeAction implements Action {
    public type = IRActionTypes["ADD_NDL_EDGE"];
    constructor(public pageName: string, public edgeInfo: {}) {}
}

export class IRClearNDLThemeEdgeAction implements Action {
    public type = IRActionTypes["CLEAR_NDL_EDGE"];
    constructor(public themeIndex: number) {}
}

export class IRInsertNDLPageAction implements Action {
    public type = IRActionTypes["INSERT_NDL_PAGE"];
    constructor(public pageUICDL: PageUICDL) {}
}

export class IRDeleteNDLPageAction implements Action {
    public type = IRActionTypes["DELETE_NDL_PAGE"];
    constructor(public page: string) {}
}

// export class IRInitialNDLAction implements Action {
//     public type = IRActionTypes["INITIAL_NDL"];
//     constructor() {}
// }

export class IRDeleteAllDLsAndThemes implements Action {
    public type = IRActionTypes["DELETE_ALL_DLs_THEMES"];
    constructor() {}
}

export class IROpenNDLFromDBAction implements Action {
    public type = IRActionTypes["LOAD_NDL_FROM_DB"];
    constructor(public pageID: string, public ndl: {}) {}
}

export class IROpenSUMDLFromDBAction implements Action {
    public type = IRActionTypes["LOAD_SUMDL_FROM_DB"];
    constructor(public sumdl: {}) {}
}
