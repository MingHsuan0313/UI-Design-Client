export class ReturnModel {
    type: string = "";
    schemaType: string = "";
    schemaValues: string[] = [];
    returnValues: string[] = [];

    // return data example 
    // {
    //     "type": "complex",
    //     "schema(ntu.csie.selab.inventorysystem.model.Department )": [
    //         "id", "name", "code", "description", "code", "tag"
    //     ],
    //     "return value": {}
    // }
    constructor(returnObject: object) {
        if(returnObject == undefined || Object.keys(returnObject).length == 0)
            return;
        this.type = returnObject['type'];
        let schemaKey = this.getSchemaKey(returnObject);
        this.schemaValues = returnObject[schemaKey];
        this.schemaType = schemaKey.split("(")[1].substr(0, schemaKey.length - 2);
        if(this.type.includes("Map")) {
            this.returnValues = returnObject["return value"]["0"];
        }
        console.log("return model createde");
        console.log(this);
        console.log(this.getReturnDatas());
    }

    getReturnDatas(): {} {  
        if (this.type == "Map") {
            return {
                isList: false,
                datas: this.returnValues,
                type: this.type
            }
        }

        else if (this.type == "List<Map>") {
            return {
                isList : true,
                datas: this.returnValues,
                type: this.type
            }
        }

        else if (this.type == "complex") {
            return {
                isList: false,
                datas: this.schemaValues,
                type: this.type
            }
        }

        else if (this.type == "primitive") {
            return {
                isList: false,
                datas: ["string"],
                type: this.type
            }
        }
    }

    isList(): boolean {
        if (this.type.startsWith("List"))
            return true;
        else
            return false;
    }

    getSchemaKey(returnObject: object): string {
        for(let key in returnObject) {
            if(key.startsWith("schema"))
                return key;
        }
    }
}