import { Handle } from "reactflow";

export default function httpsNode() {
  return (
    <div className='relative p-2 border border-gray-400 rounded-lg w-24 bg-gray-100 flex flex-col items-center'>
      <Handle
        type='target'
        position='top'
        id='a'
        className='w-1 h-1 bg-gray-800 border-none rounded-full'
      />
      <p className='text-sm'>Https</p>
      <Handle
        type='source'
        position='bottom'
        id='b'
        className='w-1 h-1 bg-gray-800 border-none rounded-full'
      />
       <Handle
        type="target"
        position="left"
        id="c"
        className="w-1 h-1 bg-green-800 border-none rounded-full"
      />
      <Handle
        type="target"
        position="right"
        id="d"
        className="w-1 h-1 bg-red-800 border-none rounded-full"
      />
    </div>
  );
}
