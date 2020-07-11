export interface UIComponent{
  x:String;
  y:String;
  width:String;
  height:String;
  ID:String;
  selector:String;

  add(component:UIComponent):void;
  remove(component:UIComponent):void;
  getInfo():String;
}

export class Icon implements UIComponent{

}

export class Text implements UIComponent{

}

export class Button implements UIComponent{

}

export class Table implements UIComponent{

}

export class CardComposite implements UIComponent{

}

export class DropdownComposite implements UIComponent{

}

export class InputGroupComposite implements UIComponent{

}
