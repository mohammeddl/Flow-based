import React, { useState } from "react";

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: string) => void;
}

const ImportModal: React.FC<ImportModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [inputData, setInputData] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputData(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit(inputData);
    setInputData("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white p-6 rounded-md shadow-md w-3/4 max-w-2xl'>
        <h2 className='text-xl font-bold mb-4'>Import Data</h2>
        <textarea
          className='w-full h-48 p-4 border border-gray-300 rounded mb-4'
          value={inputData}
          onChange={handleInputChange}
          placeholder='Paste your data here...'
        />
        <button
          className='mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
          onClick={handleSubmit}>
          Submit
        </button>
        <button
          className='mt-4 ml-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'
          onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ImportModal;
