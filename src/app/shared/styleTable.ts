// mapping between css and MxGraph style
export const styleTable = {
    fontSize:"font-size",
    opacity:"opacity",
    fontColor:"color",
    fillColor:"background-color",
    rounded:"border-radius",
    strokeColor:"border-color" ,
    shadow:"box-shadow",
}

export class StyleConverter {

    public styleObj: Object;

    public converObject(plainMxStyleObject: Object) {
        this.styleObj = {};
        for(let key in plainMxStyleObject) {
            this.convertAtrribute(styleTable[key], plainMxStyleObject[key]);
        }
    }

    public convertAtrribute(styleAttribute: String,styleValue: any) {
        if(styleAttribute == styleTable["fontSize"]) {
            this.styleObj[styleTable["fontSize"]] = styleValue;

        } else if(styleAttribute == styleTable["opacity"]) {
            this.styleObj[styleTable["opacity"]] = styleValue;

        } else if(styleAttribute == styleTable["fontColor"]) {
            this.styleObj[styleTable["fontColor"]] = styleValue;

        } else if(styleAttribute == styleTable["rounded"]) {
            if(styleValue == "1")
                this.styleObj[styleTable["rounded"]] = "2px"

        } else if(styleAttribute == styleTable["strokeColor"]) {
            this.styleObj[styleTable["strokeColor"]] = styleValue;

        } else if(styleAttribute == styleTable["fillColor"]) {
            this.styleObj[styleTable["fillColor"]] = styleValue;

        } else if(styleAttribute == styleTable["shadow"]) {
            if(styleValue == "1")
                this.styleObj[styleTable["shadow"]] = "1px 1px";
        }
    }
}