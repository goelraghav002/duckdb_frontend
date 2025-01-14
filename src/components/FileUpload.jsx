import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';
import PropTypes from 'prop-types';

function FileUpload({ onFileSelect }) {
  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file && file.type === 'text/csv') {
        onFileSelect(file);
      }
    },
    [onFileSelect]
  );

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors relative"
    >
      {/* Hidden file input */}
      <input
        type="file"
        accept=".csv"
        onChange={handleChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      
      {/* Icon */}
      <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
      
      {/* Text for instructions */}
      <span className="mt-2 block text-sm text-gray-600">
        Drop your CSV file here or click anywhere to upload
      </span>
    </div>
  );
}

FileUpload.propTypes = {
  onFileSelect: PropTypes.func.isRequired,
};

export default FileUpload;