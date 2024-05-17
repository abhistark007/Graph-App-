import './App.css'
import React, { useState, useRef, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background
} from 'reactflow';
import 'reactflow/dist/style.css';
import MyNode from './components/MyNode';
import CustomEdge from './components/CustomEdge';




// Initial Nodes
const initialNodes = [{
  id: 'mynode_0',
  type: 'myNode',
  data: { label: `My Node` },
  position: { x: 250, y: 5 }
},];

let id = 0;
const getId = () => `mynode_${id++}`;

const nodeTypes = {
  myNode: MyNode,
};
const edgeTypes = {
  customEdge: CustomEdge,
};




function App() {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  // background
  const [variant, setVariant] = useState('Lines');

  // Update Node
  const [isEditing,setIsEditing]=useState(false);
  const [editValue, setEditValue] = useState(nodes.data);
  const [id, setId] = useState();


  // Edit Function
  const onNodeClick = (e, val) => {
    setEditValue(val.data.label);
    setId(val.id);
    setIsEditing(true);
  }

  // handleChange
  const handleChange = (e) => {
    e.preventDefault();
    setEditValue(e.target.value);
  }

  // handle Edit
  const handleEdit = () => {
    const res = nodes.map((item) => {
      if (item.id === id) {
        item.data = {
          ...item.data,
          label: editValue
        }
      }
      return item
    })
    setNodes(res);
    setEditValue('');
    setIsEditing(false);
  }


  // const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [])
  const onConnect = useCallback(
    (connection) => {
      const edge = {
        ...connection,
        animated: true,
        id: `${edges.length}+1`,
        type: "customEdge",
      };
      setEdges((prevEdges) => addEdge(edge, prevEdges));
    },
    [edges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  function createNewNode(){
    const location = Math.random() * 200;
    setNodes((prevNodes) => [
      ...prevNodes,
      {
          id: getId(),
          data: { label: 'My Node' },
          type: "myNode",
          position: { x: location, y: location },
      },
  ]);
  }

  function createDefaultNode(){
    const location = Math.random() * 200;
    setNodes((prevNodes) => [
      ...prevNodes,
      {
          id: getId(),
          data: { label: 'default node' },
          type: "default",
          position: { x: location, y: location },
      },
  ]);
  }

  function createOutputNode(){
    const location = Math.random() * 200;
    setNodes((prevNodes) => [
      ...prevNodes,
      {
          id: getId(),
          data: { label: 'output node' },
          type: "output",
          position: { x: location, y: location },
      },
  ]);
  }



  return (
    <div className='w-screen h-screen relative'>
      {
        isEditing && <>
        {/* Update Mechanism */}
      <div className="flex flex-col fixed right-0 top-0 bottom-0 w-[300px] p-2 bg-purple-600 text-white z-10">
        <label>Label:</label><br />
        <input type="text" value={editValue} onChange={handleChange} className='text-black'/> <br />
        <button onClick={handleEdit} className="btn bg-teal-400 text-black p-1 rounded-lg">Update</button>
      </div>
      </>
      }

      {/* Create Mechanism */}
      <div
        onClick={createNewNode}
        className='text-white fixed top-5 left-5 p-3 rounded-lg bg-purple-600 text-xl z-20 cursor-pointer hover:scale-105 duration-200'>
        Create Input Node
      </div>
      {/* <div
        onClick={createDefaultNode}
        className='text-white fixed top-28 left-5 p-3 rounded-lg bg-purple-600 text-xl z-20 cursor-pointer hover:scale-105 duration-200'>
        Create Default Node
      </div>
      <div
        onClick={createOutputNode}
        className='text-white fixed top-56 left-5 p-3 rounded-lg bg-purple-600 text-xl z-20 cursor-pointer hover:scale-105 duration-200'>
        Create Output Node
      </div> */}

      <ReactFlowProvider>
        <div className="w-full h-full" ref={reactFlowWrapper}>
          <ReactFlow
          
            nodes={nodes}
            edges={edges}
            onNodeClick={(e, val) => onNodeClick(e, val)}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            fitView
          >
              <Background color="#99b3ec" variant={variant} />
            <Controls />
          </ReactFlow>
        </div>
      </ReactFlowProvider>


    </div>
  )
}

export default App
