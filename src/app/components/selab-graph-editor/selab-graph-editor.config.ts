import { st } from '@angular/core/src/render3';
import { EdgeInformationDialogComponent } from './edge-information-dialog/egde-information-dialog.component'

export class GraphConfiguration{
    graph: mxGraph;
    constructor(){
    }

    static configConnectionHadlerListener(graph, dialogService){

        function updateStyle(state, hover, previousStyle) {
            if(previousStyle!=null){
                state.style[mxConstants.STYLE_STROKECOLOR] = (hover) ? '#2b9cff' : previousStyle[mxConstants.STYLE_STROKECOLOR];
                if(previousStyle[mxConstants.STYLE_STROKEWIDTH] != undefined){
                    state.style[mxConstants.STYLE_STROKEWIDTH] = (hover) ? '6' : previousStyle[mxConstants.STYLE_STROKEWIDTH];
                }else{
                    state.style[mxConstants.STYLE_STROKEWIDTH] = (hover) ? '6' : '1';
                }
            }else{
                state.style[mxConstants.STYLE_STROKECOLOR] = (hover) ? '#2b9cff' : '#000000';
                state.style[mxConstants.STYLE_STROKEWIDTH] = (hover) ? '6' : '1';
            }
          };
        
          function updateToolTipStyle(state, hover, previousStyle) {
            if(previousStyle!=null){
                state.style[mxConstants.STYLE_STROKEWIDTH] = (hover) ? '8' : previousStyle[mxConstants.STYLE_STROKEWIDTH];
                state.style[mxConstants.STYLE_FONTSTYLE] = (hover) ? mxConstants.FONT_BOLD : previousStyle[mxConstants.STYLE_FONTSTYLE];
            }else{
                state.style[mxConstants.STYLE_STROKEWIDTH] = (hover) ? '8' : '6';
                state.style[mxConstants.STYLE_FONTSTYLE] = (hover) ? mxConstants.FONT_BOLD : '0';
            }
          };
        
          function updateStateStyle(lastState, currentState, previousStyle, updateLastStateFunction, updateCurrnetStateFunction) {
              console.log(previousStyle)
              //console.log(currentState.style)
              if(lastState!=null){
                lastState.style = mxUtils.clone(lastState.style);
                updateLastStateFunction(lastState, false, previousStyle);
                lastState.shape.apply(lastState);
                lastState.shape.reconfigure();
              }
              if(currentState!=null){
                currentState.style = mxUtils.clone(currentState.style);
                updateCurrnetStateFunction(currentState, true, previousStyle);
                currentState.shape.apply(currentState);
                currentState.shape.reconfigure();
              }
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
                  this.previousStyle = null;
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
                if (graph.isMouseDown || (tmp != null && ! graph.getModel().isVertex(tmp.cell) && ! graph.getModel().isEdge(tmp.cell))){
                    tmp = null;
                }
                if (tmp != this.currentState){
                    if(this.currentState != null && tmp!=null){
                        this.changeState(me.getEvent(), this.currentState, tmp);
                    }
                    else if(tmp == null){
                        updateStateStyle(this.currentState, tmp, this.previousStyle, updateStyle, updateStyle);
                        this.previousStyle = null;
                    }
                    this.currentState = tmp;
                }
            },
            changeState: function(evt, lastState, currentState){
                // current state is layout, last state is tool tip or vertex
                if(currentState.cell.hasOwnProperty("selector") && currentState.cell["selector"].includes("layout")){
                    console.log("tool tip or vertex -> layout ")

                    let temp = mxUtils.clone(currentState.style);
                    console.log(this.previousStyle)
                    updateStateStyle(lastState, currentState, this.previousStyle, updateStyle, updateStyle)
                    this.previousStyle = temp;

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
                    let temp = mxUtils.clone(currentState.style);

                    console.log(temp)
                    updateStateStyle(lastState, currentState, this.previousStyle, updateStyle, updateStyle)
                    this.previousStyle = temp;
                    
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
                    let temp = mxUtils.clone(currentState.style);
                    //console.log(temp)
                    updateStateStyle(lastState, currentState, this.previousStyle, updateStyle, updateToolTipStyle)
                    this.previousStyle = temp;
                }
                else if(currentState.cell.hasOwnProperty("connectToolTip") && !lastState.cell.hasOwnProperty("connectToolTip") && currentState.cell.parent.id != lastState.cell.id){
                    console.log(" other vertex -> tool tip ")
                    let temp = mxUtils.clone(currentState.style);
                    //console.log(temp)
                    updateStateStyle(lastState, currentState, this.previousStyle, updateStyle, updateToolTipStyle)

                    this.previousStyle = temp;
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
                    let temp = mxUtils.clone(currentState.style);
                    updateStateStyle(lastState, currentState, this.previousStyle, updateToolTipStyle, updateStyle)
                    this.previousStyle = temp;
                }
                else if(lastState.cell.hasOwnProperty("connectToolTip") && !currentState.cell.hasOwnProperty("connectToolTip")  && lastState.cell.parent.id != currentState.cell.id){
                    console.log("tool tip -> other vertex ")
                    // leave last state  
                    let temp = mxUtils.clone(currentState.style);
                    updateStateStyle(lastState, currentState, this.previousStyle, updateToolTipStyle, updateStyle)

                    this.previousStyle = temp;
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
            console.log(evt)
            let edgeCell = evt.properties.cell
            let sourceCell = evt.properties.cell.source
            let parentCell = evt.properties.cell.source.parent;
            let targetCell = evt.properties.cell.target;
            graph.removeCells([edgeCell], false);
            
            let style = "strokeColor=#2b9cff;strokeWidth=6;edgeStyle=orthogonalEdgeStyle;curved=1;rounded=0;orthogonalLoop=1;"
            let newEdgeCell = graph.insertEdge(parentCell, "", "", sourceCell, targetCell, style);

            console.log(parentCell)
            console.log(targetCell)



            const dialogRef = dialogService.open(EdgeInformationDialogComponent, {
                // width:'20%' ,
                // height: '25%',
                autoFocus: true,
              });
            
              dialogRef.afterClosed().subscribe(result => {

                if ((result as string).length != 0) {
                    console.log(result);
                    newEdgeCell.value = result;
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
                 }
            }
        ) 
        graph.connectionHandler.removeListener(graph.connectionHandler.eventListeners[connectionFunctionIndex+1])
     }

}

