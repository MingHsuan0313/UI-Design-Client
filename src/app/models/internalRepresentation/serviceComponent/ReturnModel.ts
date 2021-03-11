export class ReturnModel {
    data: [];
    serviceType: string;
    name: string;

    constructor() {
        this.data = [];
        this.serviceType = "Return";
        this.name = "";
    }
    
    setName(name: string) {
        this.name = name;
        return this;
    }
    
    setData(data: []) {
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
