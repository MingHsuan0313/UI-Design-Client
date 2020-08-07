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

  changeOpacity(newOpacity) {
    this.style['opacity'] = newOpacity;
  }

  changeFontSize(newFontSize) {
    this.style['fontSize'] = newFontSize;
  }

  changeFontColor(newFontColor) {
    this.style['fontColor'] = newFontColor;
  }

  changeFillColor(newFillColor) {
    this.style['fillColor'] = newFillColor;
  }

  // border color
  changeStrokeColor(newStrokeColor) {
    this.style['strokeColor'] = newStrokeColor;
  }

  changeRounded(rounded: Boolean) {
    this.style['rounded'] = rounded;
  }
}
