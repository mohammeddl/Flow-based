import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { setSelectedNode } from "../redux/workFlow/FlowSlice";
import { useForm, SubmitHandler } from "react-hook-form";

const NodeForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const dispatch = useDispatch();
  const selectedNode = useSelector((state) => state.flow.selectedNode);

  const [isOpen, setIsOpen] = useState(true);

  const toggleForm = () => {
    setIsOpen(!isOpen);
    dispatch(setSelectedNode(null));
  };

  if (!isOpen || !selectedNode) {
    return null;
  }

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  console.log(watch("https"));
  return (
    <div className='p-4 bg-blue-200 border rounded shadow-md '>
      <div className='flex justify-end'>
        <button onClick={toggleForm} className='text-gray-500'>
          X
        </button>
      </div>
      <h2 className='text-xl font-bold mb-4'>Node Details</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          <label className='block text-gray-700'>Data</label>
          <input
            type='text'
            value={JSON.stringify(selectedNode.data)}
            readOnly
            className='w-full px-3 py-2 border rounded'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700'>https</label>
          <input
            {...register("https", { required: true })}
            className='w-full px-3 py-2 border rounded'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700'>headers</label>
          <input type='text' className='w-full px-3 py-2 border rounded' />
        </div>
        <div>
          <button className='bg-white px-4 p-2 rounded-md font-semibold text-1xl hover:bg-green-400 hover:text-white'>
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default NodeForm;
