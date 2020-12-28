export class ReturnModel {
    data: Object;
    serviceType: string;
    name: string;

    constructor() {
        this.data = {};
        this.serviceType = "Return";
        this.name = "";
    }
    
    setName(name: string) {
        this.name = name;
        return this;
    }
    
    setData(data: Object) {
        this.data = data;
        return this;
    }

    getInfo() {
        return {
            name: this.name,
            type: "Return"
        }
    }
}
