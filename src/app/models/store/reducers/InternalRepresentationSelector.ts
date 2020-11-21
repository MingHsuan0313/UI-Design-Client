import { createSelector } from "@ngrx/store";
import { InternalRepresentation } from "../app.state";

export const internalRepresentation = (state: {internalRepresentation: InternalRepresentation}) => {
    return state.internalRepresentation;
}

export const pageUICDLSelector = () => createSelector(internalRepresentation,(internalRepresentation:InternalRepresentation) => {
    return internalRepresentation.pageUICDLs;
})