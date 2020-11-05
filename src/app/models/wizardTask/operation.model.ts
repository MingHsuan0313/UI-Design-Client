export class Operation {
   public name: string;
   public className: string;
   public serviceID: string; 
   public returnData: object;

    public getName(): string {
        return this.name;
    }

    public setName(name: string) {
        this.name = name;
        return this;
    }

    public getClassName(): string {
        return this.className;
    }

    public setClassName(className: string) {
        this.className = className;
        return this;
    }

    public getServiceID(): string {
        return this.serviceID;
    }

    public setServiceID(serviceID: string) {
        this.serviceID = serviceID;
        return this;
    }

    public getReturnData(): object {
        return this.returnData;
    }

    public setReturnData(returnData: object) {
        this.returnData = returnData;
        return this;
    }
}