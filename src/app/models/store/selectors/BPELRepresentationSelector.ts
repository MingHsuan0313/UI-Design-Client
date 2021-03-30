import { createSelector } from "@ngrx/store";
import { BPELRepresentation } from "../app.state";

export const bpelRepresentation = (state: {bpelRepresentation: BPELRepresentation}) => {
    return state.bpelRepresentation;
}

export const processSelector = () => createSelector(bpelRepresentation, (bpelRepresentation: BPELRepresentation) => {
    return bpelRepresentation.process;
})

export const filenameSelector = () => createSelector(bpelRepresentation, (bpelRepresentation: BPELRepresentation) => {
    return bpelRepresentation.filename;
})
