import { Action, createReducer } from "typed-reducer";
import { UIComponent } from "../../ui-component-dependency";
import { IRInsertUIComponentAction } from "../actions/internalRepresentationAction/internalRepresentation.action";
import { InternalRepresentation } from "../app.state";

class IRComponentListReducer {
    @Action
    public insertUIComponent(store: UIComponent[],action :IRInsertUIComponentAction): UIComponent[]{
        console.log("Hello IRComponent Reducer heree")
        console.log(store);
        store = [...store,action.uiComponent];
        return store; 
    }
}

export const irComponentListReducer = createReducer(IRComponentListReducer);