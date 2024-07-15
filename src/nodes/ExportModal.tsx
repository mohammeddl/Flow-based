interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
}

const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white p-6 rounded-md shadow-md w-3/4 max-w-2xl'>
        <h2 className='text-xl font-bold mb-4'>Exported Data</h2>
        <div className='max-h-96 overflow-auto bg-gray-100 p-4 rounded'>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
        <button className='mt-4 bg-[#2196F3] text-white px-4 py-2 rounded hover:bg-blue-400'
          onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ExportModal;
