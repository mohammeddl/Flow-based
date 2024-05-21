
import { useSelector } from "react-redux";

const NodeForm = () => {
  const selectedNode = useSelector((state) => state.flow.selectedNode);

  if (!selectedNode) {
    return <div>No node selected</div>;
  }

  return (
    <div className='p-4 bg-white border rounded shadow-md'>
      <h2 className='text-xl font-bold mb-4'>Node Details</h2>
      <form>
        <div className='mb-4'>
          <label className='block text-gray-700'>ID</label>
          <input
            type='text'
            value={selectedNode.id}
            readOnly
            className='w-full px-3 py-2 border rounded'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700'>Type</label>
          <input
            type='text'
            value={selectedNode.type}
            readOnly
            className='w-full px-3 py-2 border rounded'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700'>Data</label>
          <input
            type='text'
            value={JSON.stringify(selectedNode.data)}
            readOnly
            className='w-full px-3 py-2 border rounded'
          />
        </div>
        {/* Add more fields as needed */}
      </form>
    </div>
  );
};

export default NodeForm;
