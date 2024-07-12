import Flow from "../nodes/Flow";
import { useDispatch, useSelector } from "react-redux";
import { setVariant, addNode, setEdges,setNodes } from "../redux/workFlow/FlowSlice";
import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Plus,
  CircleDot,
  Square,
  Download,
  FileUp,
} from "lucide-react";
import NodeForm from "../nodes/NodeForm";
import NodeResponse from "../nodes/NodeResponse";
import { Node } from "reactflow";
import ExportModal from "../nodes/ExportModal";
import ImportModal from "../nodes/ImportModal";
export default function SideBar() {
  const dispatch = useDispatch();
  const nodes = useSelector((state) => state.flow.nodes);
  const selectedNode = useSelector((state) => state.flow.selectedNode);
  const getResponseNode = useSelector((state) => state.flow.responseNodes);
  const [query, setQuery] = useState("");
  const addNodeToLocalStorage = (newNode: Node) => {
    const storedNodes = JSON.parse(localStorage.getItem("nodes") || "[]");
    storedNodes.push(newNode);
    localStorage.setItem("nodes", JSON.stringify(storedNodes));
  };

  const successNode = () => {
    const newNode: Node = {
      id: `node-${nodes.length + 1}`,
      type: "SuccessNode",
      position: { x: Math.random() * 600, y: Math.random() * 400 },
      data: { label: "Success" },
    };
    addNodeToLocalStorage(newNode);
    dispatch(addNode(newNode));
  };
  const errorNode = () => {
    const newNode: Node = {
      id: `node-${nodes.length + 1}`,
      type: "ErrorNode",
      position: { x: Math.random() * 600, y: Math.random() * 400 },
      data: { label: "Error" },
    };
    addNodeToLocalStorage(newNode);
    dispatch(addNode(newNode));
  };
  const addRunButton = () => {
    const newNode: Node = {
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
    const newNode: Node = {
      id: `nodeHtt-${nodes.length + 1}`,
      type: "httpsNode",
      position: { x: Math.random() * 600, y: Math.random() * 400 },
      data: { label: "Https" },
    };
    addNodeToLocalStorage(newNode);
    dispatch(addNode(newNode));
  };
  const addNewOutput = () => {
    const newNode: Node = {
      id: `nodeRes-${nodes.length + 1}`,
      type: "selectorNode",
      position: { x: Math.random() * 600, y: Math.random() * 400 },
      data: { label: "Response", outputPorts: [] },
    };
    addNodeToLocalStorage(newNode);
    dispatch(addNode(newNode));
  };
  const handleInputChange = (e: { target: { value: string } }) => {
    setQuery(e.target.value.trim());
  };
  const DisplayNodes = () => {
    if (query === "") {
      return <div></div>;
    } else if ("https".startsWith(query.toLowerCase())) {
      // Si la recherche correspond à 'run', afficher le bouton correspondant
      return (
        <center>
          <button
            type='button'
            className='w-full h-12 text-sm bg-white text-black lg:px-1 xl:px-4 py-2 rounded-md'
            onClick={addHttps}>
            Https
          </button>
        </center>
      );
    } else if ("run".startsWith(query.toLowerCase())) {
      // Si la recherche correspond à 'run', afficher le bouton correspondant
      return (
        <center>
          <button
            type='button'
            className='w-full h-12 text-sm bg-white text-black lg:px-1 xl:px-4 py-2 rounded-md'
            onClick={addRunButton}>
            Run
          </button>
        </center>
      );
    } else if ("status".startsWith(query.toLowerCase())) {
      // Si la recherche correspond à 'run', afficher le bouton correspondant
      return (
        <center>
          <button
            type='button'
            className='w-full h-12 text-sm bg-white text-black lg:px-1 xl:px-4 py-2 rounded-md'
            onClick={addNewOutput}>
            Status
          </button>
        </center>
      );
    } else if ("text".startsWith(query.toLowerCase())) {
      // Si la recherche correspond à 'run', afficher le bouton correspondant
      return (
        <center>
          <button
            type='button'
            className='w-full h-12 text-sm bg-white text-black lg:px-1 xl:px-4 py-2 rounded-md'
            onClick={successNode}>
            Add Text
          </button>
        </center>
      );
    }
  };

  const [isModalOpen, setModalOpen] = useState(false);
  const [exportData, setExportData] = useState(null);

  const handleExportClick = () => {
    const nodes = JSON.parse(localStorage.getItem("nodes")) || [];
    const edges = JSON.parse(localStorage.getItem("edges")) || [];
    setExportData({ nodes, edges });
    setModalOpen(true);
  };

  const [isImportModalOpen, setImportModalOpen] = useState(false);

  const handleImportClick = () => {
    setImportModalOpen(true);
  };
  const handleImportSubmit = (data: string) => {
    try {
      const parsedData = JSON.parse(data);
      if (parsedData.nodes) {
        localStorage.setItem("nodes", JSON.stringify(parsedData.nodes));
      }
      if (parsedData.edges) {
        localStorage.setItem("edges", JSON.stringify(parsedData.edges));
      }
      dispatch(setNodes(parsedData.nodes));
      dispatch(setEdges(parsedData.edges));
      setImportModalOpen(false);
    } catch (error) {
      console.error("Invalid JSON data", error);
    }
  };

  const [isOpenNetwork, setIsOpenNetwork] = useState(false);
  const toggleNetworkDropdown = () => setIsOpenNetwork(!isOpenNetwork);

  return (
    <div className='custom-class h-screen flex'>
      <br />
      <div className='flex flex-col bg-blue-200 p-4 text-white w-1/4'>
        <div className='space-x-2 flex justify-between'>
          <button
            className='px-2 text-sm bg-white text-black lg:px-1 xl:px- py-1 rounded-md'
            onClick={() => dispatch(setVariant("lines"))}>
            <Square size={24} color='black' />
          </button>
          <button
            className='px-2 text-sm bg-white text-black lg:px-1 xl:px-1 py-0.5 rounded-md'
            onClick={() => dispatch(setVariant("cross"))}>
            <Plus size={24} color='black' />
          </button>
          <button
            className='px-2 text-sm bg-white text-black lg:px-1 xl:px-1 py-1 rounded-md'
            onClick={() => dispatch(setVariant("dots"))}>
            <CircleDot size={24} color='black' />
          </button>
          <button
            className='flex items-center bg-white text-black text-sm px-1 py-1 rounded-md'
            onClick={handleImportClick}>
            <Download size={24} color='black' />
            <span className='ml-2'>
              <strong>Import</strong>
            </span>
          </button>
          <button
            className='flex items-center bg-white text-black text-sm px-2 py-2 rounded-md'
            onClick={handleExportClick}>
            <FileUp size={24} color='black' />
            <span className='ml-2'>
              <strong>Export</strong>{" "}
            </span>
          </button>
        </div>
        <br />
        <form className='w-full mx-auto'>
          <label
            htmlFor='default-search'
            className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'>
            Search
          </label>
          <div className='relative'>
            <div className='absolute inset-y-0 start-0 flex items-center pl-3 pointer-events-none'>
              <svg
                className='w-4 h-4 text-gray-500 dark:text-gray-400'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 20 20'>
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                />
              </svg>
            </div>
            <input
              type='search'
              id='Valeur'
              className='block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='Search The Node ...'
              required
              value={query}
              onChange={handleInputChange}
            />
          </div>
        </form>
        <br />
        <div>
          <DisplayNodes />
        </div>
        <br />
        <div>
          <div className='nodes'>
            <div
              onClick={toggleNetworkDropdown}
              className='flex items-center justify-between h-12 cursor-pointer bg-white rounded-lg px-4'>
              {/* Contenu à gauche (au milieu) */}
              <span className='text-black'>Nodes</span>

              {/* Chevrons à droite */}
              {isOpenNetwork ? (
                <ChevronUp className='ml-2 text-black' />
              ) : (
                <ChevronDown className='ml-2 text-black' />
              )}
            </div>
            {isOpenNetwork && (
              <ul className='bg-white flex flex-col items-center  rounded-md '>
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
                <li>
                  <button
                    className='bg-gray-400 text-white lg:px-14 px-6 py-2 mx-4 mb-4 rounded-md border-solid border-2 border-gray-300'
                    onClick={successNode}>
                    Success
                  </button>
                </li>
                <li>
                  <button
                    className='bg-gray-400 text-white lg:px-14 px-6 py-2 mx-4 mb-4 rounded-md border-solid border-2 border-gray-300'
                    onClick={errorNode}>
                    Error
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
        <br />
      </div>
      <div className='flex-grow flex'>
        <Flow />
        {selectedNode && (
          <div className='w-2/5 bg-gray-100 p-4 '>
            <NodeForm />
          </div>
        )}
        {getResponseNode.id && (
          <div className='w-2/5 bg-[#f0f0f0] p-4 '>
            <NodeResponse />
          </div>
        )}
        {exportData && (
          <ExportModal
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
            data={exportData}
          />
        )}
        <ImportModal
          isOpen={isImportModalOpen}
          onClose={() => setImportModalOpen(false)}
          onSubmit={handleImportSubmit}
        />
      </div>
    </div>
  );
}
