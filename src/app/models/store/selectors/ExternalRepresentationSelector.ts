import { createSelector } from "@ngrx/store";
import { ExternalRepresentation } from "../app.state";
export const externalRepresentation = (state: {externalRepresentation: ExternalRepresentation}) => {
    return state.externalRepresentation;
}

export const vertexsSelector = (id) => createSelector(externalRepresentation,(externalRepresentation: ExternalRepresentation) => {
    return externalRepresentation.graphStorages.get(id).vertexStorages;
})

export const vertexSelector = (graphID,vertexID) => createSelector(externalRepresentation,(externalRepresentation: ExternalRepresentation) => {
   let graph = externalRepresentation.graphStorages[graphID];
   let vertexs = graph.vertexStorages;
   let keys = Object.keys(vertexs);
   for(let index = 0;index < keys.length;index++) {
    if(vertexs[keys[index]].id == vertexID)
        return vertexs[keys[index]]
   }
//    vertexs.forEach((vertex,value) => {
//     if(value == vertexID)
//         return vertex;
//    })
})