import { EdgeInformationDialogComponent } from './edge-information-dialog/egde-information-dialog.component'

export class GraphConfiguration{
    graph: mxGraph;
    constructor(){
    }

    static configConnectionHadlerListener(graph, dialogService){

        function updateStyle(state, hover) {
            state.style[mxConstants.STYLE_STROKEWIDTH] = (hover) ? '4' : '1';
            state.style[mxConstants.STYLE_STROKECOLOR] = (hover) ? '#2b9cff' : '#000000';
            state.style[mxConstants.STYLE_FONTSTYLE] = (hover) ? mxConstants.FONT_BOLD : '0';
          };
        
          function updateToolTipStyle(state, hover) {
            state.style[mxConstants.STYLE_STROKEWIDTH] = (hover) ? '6' : '4';
            state.style[mxConstants.STYLE_FONTSTYLE] = (hover) ? mxConstants.FONT_BOLD : '0';
          };
        
          function updateStateStyle(lastState, currentState, updateLastStateFunction, updateCurrnetStateFunction) {
              lastState.style = mxUtils.clone(lastState.style);
              updateLastStateFunction(lastState, false);
              lastState.shape.apply(lastState);
              lastState.shape.reconfigure();
        
             // this.previousStyle = currentState.style;
              currentState.style = mxUtils.clone(currentState.style);
              updateCurrnetStateFunction(currentState, true);
              currentState.shape.apply(currentState);
              currentState.shape.reconfigure();
          }

          function openDialog(dialogService){

            const dialogRef = dialogService.open(EdgeInformationDialogComponent, {
                // width:'20%' ,
                // height: '25%',
                autoFocus: true,
              });
          
              dialogRef.afterClosed().subscribe(result => {

                if ((result as string).length != 0) {
                    console.log(result);
                }
              });
          }

        graph.extendParentsOnAdd = false;
        graph.constrainChildren = false;
          
        graph.connectionHandler.marker.isEnabled = function()
        {
            return this.graph.connectionHandler.first != null;
        };



        // Changes stroke color to blue on mouseover
        graph.addMouseListener( {
            currentState: null,
            previousStyle: null,

            mouseDown: function(sender, event){
                if (this.currentState != null){
                    this.currentState = null;
                }
                var cell = event.state.cell; 
                if (cell != null && cell.hasOwnProperty("connectToolTip"))
                {
                  console.log(event)
                  console.log(cell)
                  graph.popupMenuHandler.hideMenu();
                  graph.stopEditing(false);
                  
                  var pt = mxUtils.convertPoint(graph.container,
                          mxEvent.getClientX(event.evt), mxEvent.getClientY(event.evt));

                  graph.connectionHandler.start(event.state, pt.x, pt.y);

                  graph.isMouseDown = true;
                  graph.isMouseTrigger = mxEvent.isMouseEvent(event.evt);
                  mxEvent.consume(event.evt);
                  //me.consume();
                }
            },
            mouseMove: function(sender, me){
                if (this.currentState != null && me.getState() == this.currentState){
                    return;
                }
                var tmp = graph.view.getState(me.getCell());

                // Ignores everything but vertices
                if (graph.isMouseDown || (tmp != null && !
                    graph.getModel().isVertex(tmp.cell))){
                    tmp = null;
                }
                if (tmp != this.currentState){
                    if(this.currentState != null && tmp!=null){
                    this.changeState(me.getEvent(), this.currentState, tmp);
                    }
                    this.currentState = tmp;
                }
            },
            changeState: function(evt, lastState, currentState){
                // current state is layout, last state is tool tip or vertex
                if(currentState.cell.hasOwnProperty("selector") && currentState.cell["selector"].includes("layout")){
                    console.log("tool tip or vertex -> layout ")

                    updateStateStyle(lastState, currentState, updateStyle, updateStyle)
                    if(lastState.cell.children!=null){
                        let toolTipVertex = lastState.cell.children.find(
                            childrenVertex => childrenVertex.hasOwnProperty("connectToolTip")
                        )
                        if(toolTipVertex != null ){
                            if(!toolTipVertex.hasOwnProperty("edges")){
                                graph.removeCells([toolTipVertex], false);
                            }
                        }
                    }
                    if(lastState.cell.hasOwnProperty("connectToolTip")){
                        if(!lastState.cell.hasOwnProperty("edges")){
                            graph.removeCells([lastState.cell], false);
                        }
                    }
                }
                // last state is a vertex, current state is other vertex
                else if(!lastState.cell.hasOwnProperty("connectToolTip") && !currentState.cell.hasOwnProperty("connectToolTip")){
                    updateStateStyle(lastState, currentState, updateStyle, updateStyle)
                    console.log("vertex -> vertex ")
                    if(lastState.cell.children!=null){
                        let toolTipVertex = lastState.cell.children.find(
                            childrenVertex => childrenVertex.hasOwnProperty("connectToolTip")
                        )
                        if(toolTipVertex != null ){
                            if(!toolTipVertex.hasOwnProperty("edges")){
                                graph.removeCells([toolTipVertex], false);
                            }
                        }
                    }

                    let size = 12/graph.zoomFactor;
                    let x = currentState.cell.geometry.width-size/2;
                    let y = currentState.cell.geometry.height/2-size/2;
                    let style = "shape=ellipse;rounded=0;strokeColor=#2b9cff;fillColor=#FFFFFF;strokeWidth=4"
                    let toolTipVertex = graph.insertVertex(currentState.cell, "", "", x, y, size, size, style, false);

                    graph.orderCells([toolTipVertex.parent], false)
                    toolTipVertex["connectToolTip"] = true;

                }
                else if(currentState.cell.hasOwnProperty("connectToolTip") && !lastState.cell.hasOwnProperty("connectToolTip") && currentState.cell.parent.id == lastState.cell.id){
                    console.log(" this vertex -> tool tip ")
                    updateStateStyle(lastState, currentState, updateStyle, updateToolTipStyle)
                }
                else if(currentState.cell.hasOwnProperty("connectToolTip") && !lastState.cell.hasOwnProperty("connectToolTip") && currentState.cell.parent.id != lastState.cell.id){
                    console.log(" other vertex -> tool tip ")
                    updateStateStyle(lastState, currentState, updateStyle, updateToolTipStyle)
                    if(lastState.cell.children!=null){
                        let toolTipVertex = lastState.cell.children.find(
                            childrenVertex => childrenVertex.hasOwnProperty("connectToolTip")
                        )
                        if(toolTipVertex != null ){
                            if(!toolTipVertex.hasOwnProperty("edges")){
                                graph.removeCells([toolTipVertex], false);
                            }
                        }
                    }
                }
                else if(lastState.cell.hasOwnProperty("connectToolTip") && !currentState.cell.hasOwnProperty("connectToolTip") && lastState.cell.parent.id == currentState.cell.id){
                    console.log("tool tip -> parent vertex ")
                    updateStateStyle(lastState, currentState, updateToolTipStyle, updateStyle)
                }
                else if(lastState.cell.hasOwnProperty("connectToolTip") && !currentState.cell.hasOwnProperty("connectToolTip")  && lastState.cell.parent.id != currentState.cell.id){
                    console.log("tool tip -> other vertex ")
                    // leave last state  
                    updateStateStyle(lastState, currentState, updateToolTipStyle, updateStyle)
                    if(!lastState.cell.hasOwnProperty("edges")){
                        graph.removeCells([lastState.cell], false);
                    }
                    let size = 12/graph.zoomFactor;
                    let x = currentState.cell.geometry.width-size/2;
                    let y = currentState.cell.geometry.height/2-size/2;
                    let style = "shape=ellipse;rounded=0;strokeColor=#2b9cff;fillColor=#FFFFFF;strokeWidth=4"
                    let toolTipVertex = graph.insertVertex(currentState.cell, "", "", x, y, size, size, style, false);
                    graph.orderCells([toolTipVertex.parent], false)
                    toolTipVertex["connectToolTip"] = true;
                }
            },
            mouseUp: function(sender, me) { },

        });
        
        graph.connectionHandler.addListener(mxEvent.CONNECT, function(sender, evt){
            Function.name = "edgePropertyEditor"
            let sourceCell = evt.properties.cell.source.parent;
            let targetCell = evt.properties.cell.target;
            console.log(sourceCell)
            console.log(targetCell)
            const dialogRef = dialogService.open(EdgeInformationDialogComponent, {
                // width:'20%' ,
                // height: '25%',
                autoFocus: true,
              });
            
              dialogRef.afterClosed().subscribe(result => {

                if ((result as string).length != 0) {
                    console.log(result);
                    evt.properties.cell.value = result;
                }
              });
        })   
        console.log(graph.connectionHandler)

    }

     static removeConnectionHandlerListener(graph){
        let connectionHandlerListener
        let connectionFunctionIndex
        graph.mouseListeners.forEach(
            funct => {
                if(funct.hasOwnProperty("changeState")){
                    connectionHandlerListener = funct;
                }
            }
        ) 
        graph.removeMouseListener(connectionHandlerListener)

        graph.connectionHandler.eventListeners.forEach(
            (object, index) => {
                 if(object == "connect"){
                    connectionFunctionIndex = index;
                     console.log("connect here")
                 }
            }
        ) 

        graph.connectionHandler.removeListener(graph.connectionHandler.eventListeners[connectionFunctionIndex+1])
        console.log(graph)
        console.log(graph.connectionHandler)
     }

}

