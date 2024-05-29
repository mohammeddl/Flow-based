import Flow from "../nodes/Flow";
import { useDispatch, useSelector } from "react-redux";
import { setVariant, addNode } from "../redux/workFlow/FlowSlice";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import NodeForm from "../nodes/NodeForm";
import NodeResponse from "../nodes/NodeResponse";
// import selectorNode from "../nodes/SelectorNode";

export default function SideBar() {
  const dispatch = useDispatch();
  const nodes = useSelector((state) => state.flow.nodes);
  const selectedNode = useSelector((state) => state.flow.selectedNode);
  const getResponseNode = useSelector((state) => state.flow.responseNodes);

  const addNodeToLocalStorage = (newNode) => {
    const storedNodes = JSON.parse(localStorage.getItem("nodes")) || [];
    storedNodes.push(newNode);
    localStorage.setItem("nodes", JSON.stringify(storedNodes));
  };

  const addNewText = () => {
    const newNode = {
      id: `node-${nodes.length + 1}`,
      type: "input",
      position: { x: Math.random() * 600, y: Math.random() * 400 },
      data: { label: "More" },
      style: {
        border: "1px solid #777",
        padding: 10,
        width: 200,
        backgroundColor: "#f0f0f0",
        borderRadius: 10,
      },
    };
    addNodeToLocalStorage(newNode);
    dispatch(addNode(newNode));
  };
  const addRunButton = () => {
    const newNode = {
      id: `node-${nodes.length + 1}`,
      type: "output",
      position: { x: Math.random() * 600, y: Math.random() * 400 },
      data: { label: "Run" },
      style: {
        border: "1px solid #777",
        padding: 10,
        width: 150,
        backgroundColor: "#f0f0f0",
        borderRadius: 10,
      },
    };
    addNodeToLocalStorage(newNode);
    dispatch(addNode(newNode));
  };
  
  const addHttps = () => {
    const newNode = {
      id: `nodeHtt-${nodes.length + 1}`,
      type: "httpsNode",
      position: { x: Math.random() * 600, y: Math.random() * 400 },
      data: { label: "Https" },
    };
    addNodeToLocalStorage(newNode);
    dispatch(addNode(newNode));
  };
  const addNewOutput = () => {
    const newNode = {
      id: `nodeRes-${nodes.length + 1}`,
      type: "selectorNode",
      position: { x: Math.random() * 600, y: Math.random() * 400 },
      data: { label: "Response", outputPorts: [] },
    };
    addNodeToLocalStorage(newNode);
    dispatch(addNode(newNode));
  };

  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const [isOpenNetwork, setIsOpenNetwork] = useState(false);
  const toggleNetworkDropdown = () => setIsOpenNetwork(!isOpenNetwork);

  return (
    <div className='h-screen flex'>
      <div className='flex flex-col bg-blue-500 p-4 text-white w-1/6'>
        <h2 className='text-2xl font-bold mb-1'>Variant:</h2>
        <div className='space-x-2 flex justify-between'>
          <button
            className='px-2 text-sm bg-white text-black lg:px-1 xl:px-4 py-2 rounded-md'
            onClick={() => dispatch(setVariant("dots"))}>
            Dots
          </button>
          <button
            className='px-2 text-sm bg-white text-black lg:px-1 xl:px-4 py-2 rounded-md'
            onClick={() => dispatch(setVariant("lines"))}>
            Lines
          </button>
          <button
            className='px-2 text-sm bg-white text-black lg:px-1 xl:px-4 py-2 rounded-md'
            onClick={() => dispatch(setVariant("cross"))}>
            Cross
          </button>
        </div>
        <div className='max-h-fit border-solid w-4/4 border-2 my-2 border-gray-600 flex flex-col'>
          <div className='dropdown'>
            <div
              onClick={toggleDropdown}
              className='flex items-center h-12  border-solid border-2 cursor-pointer border-gray-400 bg-white'>
              {isOpen ? (
                <ChevronUp className='text-black ml-2' />
              ) : (
                <ChevronDown className='text-black ml-2' />
              )}
              <button className='bg-white text-black py-2  rounded-md'>
                Nodes
              </button>
            </div>
            {isOpen && (
              <ul className='bg-white'>
                <li>
                  <button
                    className='bg-blue-400 text-white text-sm w-2/3 px-4 py-2 ml-4 mb-4 rounded-md border-solid border-2 border-gray-300'
                    onClick={addNewText}>
                    Add Text
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
        <div className='max-h-fit border-solid border-2 w-4/4 border-gray-600 flex flex-col'>
          <div className=''>
            <div
              onClick={toggleNetworkDropdown}
              className='flex items-center h-12 border-solid border-2 cursor-pointer border-gray-400 bg-white'>
              {isOpenNetwork ? (
                <ChevronUp className='text-black ml-2' />
              ) : (
                <ChevronDown className='text-black ml-2' />
              )}
              <button className='bg-white text-black py-2  rounded-md '>
                Network
              </button>
            </div>
            {isOpenNetwork && (
              <ul className='bg-white flex flex-col items-center '>
                <li>
                  <button
                    className='bg-red-500 text-white lg:px-12 px-5  py-2 m-4 rounded-md border-solid border-2 border-gray-300'
                    onClick={addHttps}>
                    Https
                  </button>
                </li>
                <li>
                  <button
                    className='bg-green-500 text-white lg:px-12 px-5 py-2 mx-4 mb-4 rounded-md border-solid border-2 border-gray-300'
                    onClick={addNewOutput}>
                    Status
                  </button>
                </li>

                <li>
                  <button
                    className='bg-blue-400 text-white lg:px-14 px-6 py-2 mx-4 mb-4 rounded-md border-solid border-2 border-gray-300'
                    onClick={addRunButton}>
                    Run
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className='flex-grow flex'>
        <Flow />
        {selectedNode && (
          <div className='w-2/5 bg-gray-100 p-4 '>
            <NodeForm />
          </div>
        )}
        {getResponseNode.length && (
          <div className='w-2/5 bg-[#f0f0f0] p-4 '>
            <NodeResponse />
          </div>
        )}
      </div>
    </div>
  );
}
