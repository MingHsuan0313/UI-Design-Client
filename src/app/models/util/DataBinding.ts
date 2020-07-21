export class DataBinding {
    hasDataBinding: Boolean;
    dataBindingName: string;
    // -1 not list
    // others means index
    isList: number;

    constructor(hasDataBinding,dataBindingName,isList) {
        this.hasDataBinding = hasDataBinding;
        this.dataBindingName = dataBindingName;
        this.isList = isList;
    }
}


