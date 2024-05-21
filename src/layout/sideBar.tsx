import Flow from "../nodes/Flow";
import { useDispatch } from 'react-redux';
import { setVariant } from '../redux/workFlow/Variant';

export default function SideBar() {

  const dispatch = useDispatch();


  return (
    <div className='h-screen flex'>
      <div className='flex flex-col  bg-blue-500 p-4 text-white'>
        <h2 className='text-2xl font-bold mb-4'>Variant:</h2>
        <div className='space-x-2'>
          <button
            className='bg-white text-black px-4 py-2 rounded-md'
            onClick={()=> dispatch(setVariant("dots"))}>
            Dots
          </button>
          <button
            className='bg-white text-black px-4 py-2 rounded-md'
            onClick={() => dispatch(setVariant("lines"))}>
            Lines
          </button>
          <button
            className='bg-white text-black px-4 py-2 rounded-md'
            onClick={() => dispatch(setVariant("cross"))}>
            Cross
          </button>
        </div>
        {/* <div className='max-h-fit border-solid border-2 my-2 border-gray-600 flex flex-col'>
          <button
            className='bg-white text-black px-4 py-2  m-4 rounded-md'
            onClick={addNewText}>
            Add Text
          </button>
          <button
            className='bg-white text-black px-4 py-2  m-4 rounded-md'
            onClick={addNewInput}>
            Add Input
          </button>
        </div> */}
      </div>
      <div className='flex-grow'>
        <Flow />
      </div>
    </div>
  );
}
