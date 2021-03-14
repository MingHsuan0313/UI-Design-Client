export class ReturnModel {
    datas: [];
    serviceType: string;
    name: string;
   

    constructor() {
        this.datas = [];
        this.serviceType = "Return";
        this.name = "";
    }
    
    setName(name: string) {
        this.name = name;
        return this;
    }
    
    setData(data: []) {
        this.datas = data;
        return this;
    }

    getInfo() {
        return {
            name: this.name,
            type: "Return"
        }
    }
}
