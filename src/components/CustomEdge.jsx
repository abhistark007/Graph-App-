import React from 'react'
import {
    BezierEdge,
    EdgeLabelRenderer,
    getBezierPath,
    useReactFlow,
  } from "reactflow";
  import { IoMdClose } from "react-icons/io";

export default function CustomEdge(props) {
    const {
        id,
        sourceX,
        sourceY,
        targetX,
        targetY,
        sourcePosition,
        targetPosition,
      } = props;
    
      const { setEdges} = useReactFlow();
    
      const [edgePath, labelX, labelY] = getBezierPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
        sourcePosition,
        targetPosition,
      });
   

      const divStyle = {
        position: 'absolute',
        transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
        color:`red`,
        pointerEvents: 'all',
      };

      function handleClick(){
        console.log("BEGIN");
        setEdges((prevEdges) => prevEdges.filter((edge) => edge.id !== id));
        console.log("SSS");   
      }

      console.log(id);
  return (
    <> 
        <BezierEdge {...props} />
        <EdgeLabelRenderer>
            <div  
            style={divStyle}
            className=' cursor-pointer'
            onClick={handleClick}
            >
                <IoMdClose />
            </div>
       
      </EdgeLabelRenderer>
    </>
  )
}
