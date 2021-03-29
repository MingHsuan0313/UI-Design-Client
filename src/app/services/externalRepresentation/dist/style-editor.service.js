"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var StyleEditorService = /** @class */ (function () {
    function StyleEditorService() {
    }
    StyleEditorService.prototype.convertStyleDescriptionToJsobObject = function (styleDescription) {
        // console.log("style description here")
        // console.log(styleDescription);
        var styleProperties = styleDescription.split(";");
        var styleModel = {};
        for (var index = 0; index < styleProperties.length; index++) {
            var property = styleProperties[index];
            var propertyKey = property.split("=")[0];
            var propertyValue = property.split("=")[1];
            styleModel[propertyKey] = propertyValue;
        }
        this.convertJsonObjectToStyleDescription(styleModel);
        return styleModel;
    };
    //
    StyleEditorService.prototype.convertJsonObjectToStyleDescription = function (styleObj) {
        var styleDescription = "";
        var styleKeys = Object.keys(styleObj);
        for (var index = 0; index < styleKeys.length; index++) {
            var key = styleKeys[index];
            if (styleObj[key] == undefined)
                continue;
            if (index == styleKeys.length - 1)
                styleDescription = styleDescription + (key + "=" + styleObj[key] + ";");
            else
                styleDescription = styleDescription + (key + "=" + styleObj[key] + ";");
        }
        return styleDescription;
    };
    StyleEditorService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
        // connect graph-editor and style-editor data binding
    ], StyleEditorService);
    return StyleEditorService;
}());
exports["default"] = StyleEditorService;
var StyleModel = /** @class */ (function () {
    function StyleModel() {
        this.fillColor = undefined;
        this.fontSize = undefined;
        this.fontColor = undefined;
        this.fontStyle = undefined;
        this.border = undefined;
        this.shape = undefined;
        this.strokeColor = undefined;
        this.strokeWidth = undefined;
        this.opacity = undefined;
        this.shadow = undefined;
        this.rounded = undefined;
        this.rotation = undefined;
    }
    return StyleModel;
}());
