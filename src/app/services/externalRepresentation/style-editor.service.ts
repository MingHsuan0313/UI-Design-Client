import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
// connect graph-editor and style-editor data binding
export default class StyleEditorService {
  styleObj: StyleModel;

  constructor() { }

  static convertStyleDescriptionToJsobObject(styleDescription: String) {
    let styleProperties = styleDescription.split(";");
    let styleModel = {};
    for (let index = 0; index < styleProperties.length; index++) {
      let property = styleProperties[index];
      let propertyKey = property.split("=")[0];
      let propertyValue = property.split("=")[1];
      styleModel[propertyKey] = propertyValue;
    }
    this.convertJsonObjectToStyleDescription(styleModel);
    return styleModel;
  }

  static convertJsonObjectToStyleDescription(styleObj: object):  string{
    let styleDescription = "";
    let styleKeys = Object.keys(styleObj);
    for (let index = 0; index < styleKeys.length; index++) {
      let key = styleKeys[index];
      if(styleObj[key] == undefined)
        continue
      if (index == styleKeys.length - 1)
        styleDescription = styleDescription + `${key}=${styleObj[key]};`
      else
        styleDescription = styleDescription + `${key}=${styleObj[key]};`
    }
    return styleDescription;
  }
}

class StyleModel {
  fillColor: String;

  fontSize: String;
  fontColor: String;
  fontStyle: number;

  border: String;

  shape: String;

  strokeWidth: number;
  strokeColor: String;

  opacity: String;
  shadow: String;
  rounded: String;
  rotation: number;

  constructor() {
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
}
