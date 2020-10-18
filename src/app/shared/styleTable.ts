// mapping between css and MxGraph style
export const StyleTable = {
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

    public convertObject(plainMxStyleObject: Object) {
        this.styleObj = {};
        for(let key in plainMxStyleObject) {
            this.convertAtrribute(StyleTable[key], plainMxStyleObject[key]);
        }
        return this.styleObj;
    }

    public convertAtrribute(styleAttribute: String,styleValue: any) {
        if(styleValue == undefined || styleValue == null)
            return;
        if(styleAttribute == StyleTable["fontSize"]) {
            this.styleObj[StyleTable["fontSize"]] = styleValue + "px";

        } else if(styleAttribute == StyleTable["opacity"]) {
            this.styleObj[StyleTable["opacity"]] = parseInt(styleValue);

        } else if(styleAttribute == StyleTable["fontColor"]) {
            this.styleObj[StyleTable["fontColor"]] = styleValue;

        } else if(styleAttribute == StyleTable["rounded"]) {
            if(styleValue == "1")
                this.styleObj[StyleTable["rounded"]] = "5px"

        } else if(styleAttribute == StyleTable["strokeColor"]) {
            this.styleObj[StyleTable["strokeColor"]] = styleValue;
            this.styleObj["border-style"] = "solid";

        } else if(styleAttribute == StyleTable["fillColor"]) {
            this.styleObj[StyleTable["fillColor"]] = styleValue;

        } else if(styleAttribute == StyleTable["shadow"]) {
            if(styleValue == "1")
                this.styleObj[StyleTable["shadow"]] = "1px 1px";
        }
    }
}