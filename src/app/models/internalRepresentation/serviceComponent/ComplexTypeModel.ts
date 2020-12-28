export class ComplexType {
   initUrl: string; // for constructor service
   args: ComplexTypeArg[];
   
   constructor() {
       this.initUrl = "";
       this.args = [];
   }
   
   addArg(arg: ComplexTypeArg) {
       this.args.push(arg);
       return this;
   }
   
   setUrl(url: string) {
       this.initUrl = url;
       return this;
   }
}

export class ComplexTypeArg {
    name: string;
    setterUrl: string;
    type: string;
    
    constructor() {
        this.name = "";
        this.setterUrl = "" ;
        this.type = "";
    }
    
    setName(name: string) {
        this.name = name;
        return this;
    }
    
    setType(type: string) {
        this.type = type;
        return this;
    }
    
    setSetterUrl(url: string) {
        this.setterUrl = url;
        return this;
    }
}
