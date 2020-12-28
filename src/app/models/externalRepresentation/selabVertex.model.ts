import { DataBinding } from "./util/DataBinding";

export class SelabVertex {
    private id: string;
    private value: string;
    private uiComponentID: string;
    private dataBinding: DataBinding;
    private isPrimary: boolean;
    private parentID: string;

    constructor(id?:string,
        componentID?:string,
        parentID?:string,
        value?:string,
        dataBinding?:DataBinding,
        isPrimary?:boolean) {
        this.id = id;
        this.uiComponentID = componentID;
        this.parentID = parentID;
        this.value = value;
        this.dataBinding = dataBinding;
        this.isPrimary = isPrimary;
    }
    
    getDataBinding(): DataBinding {
        return this.dataBinding;
    }
    
    getIsPrimary(): boolean {
        return this.isPrimary;
    }
    
    getID(): string {
        return this.id;
    }
    
    getValue(): string {
        return this.value;
    }
    
    getParentID(): string {
        return this.parentID;
    }

    getUIComponentID(): string {
        return this.uiComponentID;
    }
  
    setDataBinding(dataBinding: DataBinding): SelabVertex {
        return new SelabVertex(this.id,this.uiComponentID,this.parentID,this.value,dataBinding,this.isPrimary);
    }

    setValue(value: string): SelabVertex {
        return new SelabVertex(this.id,this.uiComponentID,this.parentID,value,this.dataBinding,this.isPrimary);
    }
    
    setUIComponentID(uiComponentID: string): SelabVertex {
        return new SelabVertex(this.id,uiComponentID,this.parentID,this.value,this.dataBinding,this.isPrimary);
    }
    
    setIsPrimary(isPrimary: boolean): SelabVertex {
        return new SelabVertex(this.id,this.uiComponentID,this.parentID,this.value,this.dataBinding,isPrimary);
    }
    
    setParentID(parentID:string) {
        return new SelabVertex(this.id,this.uiComponentID,parentID,this.value,this.dataBinding,this.isPrimary);
    }

    setID(id:string) {
        return new SelabVertex(id,this.uiComponentID,this.parentID,this.value,this.dataBinding,this.isPrimary);
    }

}