import { createSelector } from "@ngrx/store";
import { InternalRepresentation } from "../app.state";

export const internalRepresentation = (state: {internalRepresentation: InternalRepresentation}) => {
    return state.internalRepresentation;
}

export const pageUICDLSelector = () => createSelector(internalRepresentation,(internalRepresentation:InternalRepresentation) => {
    return internalRepresentation.pageUICDLs;
})

export const uiComponentSelector = (pageID: string,componentID: string) => createSelector(internalRepresentation,(internalRepresentation: InternalRepresentation) => {
    let componentList =internalRepresentation.pageUICDLs[pageID].body.componentList;
    for(let index = 0;index < componentList.length;index++) {
        let uiComponent = componentList[index];
        console.log(uiComponent.getId())
        if(uiComponent.getId() == componentID)
            return uiComponent;
    }
})