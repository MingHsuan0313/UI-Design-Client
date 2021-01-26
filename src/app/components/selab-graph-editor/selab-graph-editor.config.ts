

export class GraphConfiguration{
    graph: mxGraph;
    constructor(graph){
        this.graph = graph;
    }


    
    static configConnectToolTipListener(graph){
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

        // Changes stroke color to blue on mouseover
        graph.addMouseListener({
            currentState: null,
            previousStyle: null,

            mouseDown: function(sender, me){
                if (this.currentState != null){
                    this.currentState = null;
                }


                var cell = me.state.cell; 
                if (cell != null && cell.hasOwnProperty("connectToolTip"))
                {
                  console.log(cell)
                  me.consume();
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
                if(currentState.cell.hasOwnProperty("selector") && currentState.cell["selector"].includes("layout")){
                    updateStateStyle(lastState, currentState, updateStyle, updateStyle)
                    if(lastState.cell.children!=null){
                        let toolTipVertex = lastState.cell.children.find(
                            childrenVertex => childrenVertex.hasOwnProperty("connectToolTip")
                        )
                        if(toolTipVertex != null){
                            graph.removeCells([toolTipVertex], true);
                        }
                    }
                    if(lastState.cell.hasOwnProperty("connectToolTip")){
                        graph.removeCells([lastState.cell], true);
                    }
                }
                else if(!lastState.cell.hasOwnProperty("connectToolTip") && !currentState.cell.hasOwnProperty("connectToolTip")){
                    updateStateStyle(lastState, currentState, updateStyle, updateStyle)

                    if(lastState.cell.children!=null){
                        let toolTipVertex = lastState.cell.children.find(
                            childrenVertex => childrenVertex.hasOwnProperty("connectToolTip")
                        )
                        if(toolTipVertex != null){
                            graph.removeCells([toolTipVertex], true);
                        }
                    }

                    let x = currentState.cell.geometry.width-12.5;
                    let y = currentState.cell.geometry.height/2-12.5;
                    let style = "shape=ellipse;rounded=0;strokeColor=#2b9cff;fillColor=#FFFFFF;strokeWidth=4"
                    let toolTipVertex = graph.insertVertex(currentState.cell, "", "", x, y, 25, 25, style, false);

                    graph.orderCells([toolTipVertex.parent], false)
                    toolTipVertex["connectToolTip"] = true;

                }
                else if(currentState.cell.hasOwnProperty("connectToolTip") && currentState.cell.parent.id == lastState.cell.id){
                    
                    updateStateStyle(lastState, currentState, updateStyle, updateToolTipStyle)

                }
                else if(lastState.cell.hasOwnProperty("connectToolTip") && lastState.cell.parent.id == currentState.cell.id){
                    
                    updateStateStyle(lastState, currentState, updateToolTipStyle, updateStyle)

                }
                else if(lastState.cell.hasOwnProperty("connectToolTip") && lastState.cell.parent.id != currentState.cell.id){
                    
                    // leave last state  
                    updateStateStyle(lastState, currentState, updateStyle, updateStyle)
                    graph.removeCells([lastState.cell], true);

                    let x = currentState.cell.geometry.width-12.5;
                    let y = currentState.cell.geometry.height/2-12.5;
                    let style = "shape=ellipse;rounded=0;strokeColor=#2b9cff;fillColor=#FFFFFF;strokeWidth=4"
                    let toolTipVertex = graph.insertVertex(currentState.cell, "", "", x, y, 25, 25, style, false);
                    graph.orderCells([toolTipVertex.parent], false)
                    toolTipVertex["connectToolTip"] = true;
                }
            },
            mouseUp: function(sender, me) { },

        });


        
    }

}

