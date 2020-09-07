export class StyleStorage {
  name: string;
  // mxStyle
  style: Object;

  constructor(name, style) {
    this.name = name;
    this.style = style;
  }

  setStyle(style){
    this.style = style;
  }
  getStyle() {
    return this.style;
  }

  changeOpacity(newOpacity: String) {
    this.style['opacity'] = newOpacity;
  }

  changeFontSize(newFontSize: String) {
    this.style['fontSize'] = newFontSize;
  }

  changeFontColor(newFontColor: String) {
    this.style['fontColor'] = newFontColor;
  }

  changeFillColor(newFillColor: String) {
    this.style['fillColor'] = newFillColor;
  }

  // border color
  changeStrokeColor(newStrokeColor: String) {
    this.style['strokeColor'] = newStrokeColor;
  }

  changeRounded(rounded: String) {
    this.style['rounded'] = rounded;
  }

  changeShadow(shadow: String) {
    this.style['shadow'] = shadow;
  }
}
