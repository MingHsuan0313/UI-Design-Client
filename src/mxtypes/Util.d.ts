
/******************      Util      **************/

/** Common interfaces for Utils */
declare module Util {

  /** Common handler for addListener of EventSource */
  interface EventHandler {
    (sender: any, state: any);
  }

}

/**
 * The mxEventObject is a wrapper for all properties of a single event.  Additionally, it also offers functions
 * to consume the event and check if it was consumed as follows:
 */
declare class mxEventObject {
  constructor(name: string);

  /** Holds the name. */
  name: string;

  /** Holds the properties as an associative array. */
  properties: any;

  /** Returns name */
  getName: () => string;

  /** Returns the property for the given key. */
  getProperty: (key: string) => any;
}

/**
 * A wrapper class for an associative array with object keys.  Note: This implementation uses <mxObjectIdentitiy> to
 * turn object keys into strings.
 */
declare class mxDictionary {

  /** Stores the (key, value) pairs in this dictionary. */
  map: any;

  /**
   * Returns the value for the given key.
   * @param key
   */
  get: (key: any) => any;

  /**
   * Stores the value under the given key and returns the previous value for that key.
   * @param key
   * @param value
   */
  put: (key: any, value: any) => any;

  /** Returns all keys as an array. */
  getKeys: () => string[];
  /** Returns all values as an array. */
  getValues: () => string[];
}




/**
 * Base class for objects that dispatch named events.  To create a subclass that inherits from mxEventSource, the following code is used.
 */
declare class mxEventSource {

  /**
   * Binds the specified function to the given event name.  If no event name is given, then the listener
   * is registered for all events.
   * The parameters of the listener are the sender and an mxEventObject.
   */
  addListener(name: any, func: Util.EventHandler);

}

/**
 * Encapsulates the URL, width and height of an image.
 */
declare class mxImage {

  /** Encapsulates the URL, width and height of an image. */
  constructor(src: string, width: number, height: number);

}


/**
 * Cross-browser DOM event support
 */
declare class mxEvent {
  static ADD: any;
  static REMOVE: any;
  static DOUBLE_CLICK: any;
  static CLICK: any;
  static CHANGE: any;
  static RESIZE: any;
  static RESIZE_CELLS: any;
  static MOVE_CELLS: any;
  addListener(element,eventName,funct);
}

declare class mxMouseEvent {
  consumed;
  evt;
  graphX;
  graphY;
  state;
  getEvent();
  getSource();
  isSource(shape);
  getX();
  getY();
  getGraphX();
  getGraphY();
  getState();
  getCell();
  isPopupTrigger();
  isConsumed();
  consume(preventDefault);
}


declare class mxPoint {

  /** Constructs a new point for the optional x and y coordinates.  If no coordinates are given, then the default values for x and y are used. */
  constructor(x: number, y: number);

  x: number;
  y: number;

  /**
   * Returns true if the given object equals this point.
   * @param obj
   */
  equals(obj: any): boolean;

  clone();

}

declare class mxUtils{

  alert(obj:any);

  static clone(style);
  static load(filePath);
  static getXml(result: any);
  static makeDraggable(element, graphF, funct, dragElement);
  static parseXml(xml);
}

declare class mxClipboard{
  static copy(graph, cells?);
  static paste(graph);
}
declare class mxConnectionHandler {
  connectImage;
}

/******************      Util end      **************/
