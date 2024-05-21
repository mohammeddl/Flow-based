// components/SideBar.js
import Flow from '../nodes/Flow';
import { useDispatch, useSelector } from 'react-redux';
import { setVariant, addNode } from '../redux/workFlow/FlowSlice';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import NodeForm from '../nodes/NodeForm';

export default function SideBar() {
  const dispatch = useDispatch();
  const nodes = useSelector((state) => state.flow.nodes);
  const selectedNode = useSelector((state) => state.flow.selectedNode);

  const addNodeToLocalStorage = (newNode) => {
    const storedNodes = JSON.parse(localStorage.getItem('nodes')) || [];
    storedNodes.push(newNode);
    localStorage.setItem('nodes', JSON.stringify(storedNodes));
  };

  const addNewText = () => {
    const newNode = {
      id: `node-${nodes.length + 1}`,
      type: 'textUpdater',
      position: { x: Math.random() * 600, y: Math.random() * 400 },
      data: { value: Math.floor(Math.random() * 100) },
      style: {
        border: '1px solid #777',
        padding: 10,
        width: 200,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
      },
    };
    addNodeToLocalStorage(newNode);
    dispatch(addNode(newNode));
  };

  const addNewInput = () => {
    const newNode = {
      id: `node-${nodes.length + 1}`,
      type: 'input',
      position: { x: Math.random() * 600, y: Math.random() * 400 },
      data: { label: 'input node' },
    };
    addNodeToLocalStorage(newNode);
    dispatch(addNode(newNode));
  };

  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const [isOpenNetwork, setIsOpenNetwork] = useState(false);
  const toggleNetworkDropdown = () => setIsOpenNetwork(!isOpenNetwork);

  return (
    <div className="h-screen flex">
      <div className="flex flex-col bg-blue-500 p-4 text-white w-1/4">
        <h2 className="text-2xl font-bold mb-4">Variant:</h2>
        <div className="space-x-2">
          <button
            className="bg-white text-black px-4 py-2 rounded-md"
            onClick={() => dispatch(setVariant('dots'))}
          >
            Dots
          </button>
          <button
            className="bg-white text-black px-4 py-2 rounded-md"
            onClick={() => dispatch(setVariant('lines'))}
          >
            Lines
          </button>
          <button
            className="bg-white text-black px-4 py-2 rounded-md"
            onClick={() => dispatch(setVariant('cross'))}
          >
            Cross
          </button>
        </div>
        <div className="max-h-fit border-solid border-2 my-2 border-gray-600 flex flex-col">
          <div className="dropdown">
            <div className="flex items-center h-12 border-solid border-2 border-gray-400 bg-white">
              {isOpen ? <ChevronUp className="text-black ml-2" /> : <ChevronDown className="text-black ml-2" />}
              <button className="bg-white text-black py-2 my-4 rounded-md" onClick={toggleDropdown}>
                Input
              </button>
            </div>
            {isOpen && (
              <ul className="bg-white">
                <li>
                  <button className="bg-blue-400 text-black px-4 py-2 m-4 rounded-md" onClick={addNewInput}>
                    Add Input
                  </button>
                </li>
                <li>
                  <button className="bg-blue-400 text-black px-4 py-2 m-4 rounded-md" onClick={addNewText}>
                    Add Text
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
        <div className="max-h-fit border-solid border-2 border-gray-600 flex flex-col">
          <div className="">
            <div className="flex items-center h-12 border-solid border-2 border-gray-400 bg-white">
              {isOpenNetwork ? <ChevronUp className="text-black ml-2" /> : <ChevronDown className="text-black ml-2" />}
              <button className="bg-white text-black py-2 my-4 rounded-md" onClick={toggleNetworkDropdown}>
                Network
              </button>
            </div>
            {isOpenNetwork && (
              <ul className="bg-white">
                <li>
                  <button className="bg-blue-400 text-black px-4 py-2 m-4 rounded-md" onClick={addNewInput}>
                    Https
                  </button>
                </li>
                <li>
                  <button className="bg-blue-400 text-black px-4 py-2 m-4 rounded-md" onClick={addNewText}>
                    Add Text
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className="flex-grow flex">
        <Flow />
        {selectedNode && (
          <div className="w-1/4 bg-gray-100 p-4">
            <NodeForm />
          </div>
        )}
      </div>
    </div>
  );
}
