import React from 'react'
import CustomHandle from './CustomHandle'
import { Position, useReactFlow } from 'reactflow'
import { IoMdClose } from "react-icons/io";

export default function MyNode({id}) {
    // console.log(label);
    const { setNodes,getNodes } = useReactFlow();
    // console.log(getNodes().filter((node)=>node.id===id)[0].data.label);
   

  return (
    <div className='flex relative gap-3 justify-center items-center bg-gray-400 group text-white font-bold p-2 rounded-lg  duration-200'>
        <div>{getNodes().filter((node)=>node.id===id)[0].data.label}</div>
        <div className='absolute -top-10 z-30 bg-red-500 text-xl justify-center items-center text-red-600 p-2 rounded-full
        '
        onClick={() =>
            setNodes((prevNodes) => prevNodes.filter((node) => node.id !== id))
           
          }
        >
            <IoMdClose />
        </div>
        <CustomHandle type="source" position={Position.Top} />
        <CustomHandle type="target" position={Position.Bottom} />
    </div>
  )
}
