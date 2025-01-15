import React, { useState } from "react";
import FileUpload from "./FileUpload";
import QueryInput from "./QueryInput";
import PropTypes from "prop-types";
import useFileStore from "../store/useFileStore"; // Import Zustand store

const QuerySection = ({ onFileSelect, onQuerySubmit, isLoading }) => {
  // Get the uploaded file from the Zustand store
  const { uploadedFile } = useFileStore();
  
  const handleFileChange = (file) => {
    onFileSelect(file);
  };

  const handleUpdateFile = () => {
    // Reset the file name to allow file re-selection
    onFileSelect(null);
  };

  return (
    <div className="border border-gray-200 rounded-xl p-6 mb-8">
      {uploadedFile ? (
        <div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600">
              Uploaded File: <span className="font-bold text-gray-900">{uploadedFile.name}</span>
            </p>
            <button
              onClick={handleUpdateFile}
              className="text-sm text-blue-600 underline hover:text-blue-800"
              disabled={isLoading}
            >
              Update CSV
            </button>
          </div>
          {/* Query input field */}
          <QueryInput onSubmit={onQuerySubmit} isLoading={isLoading} />
        </div>
      ) : (
        <FileUpload onFileSelect={handleFileChange} isLoading={isLoading} />
      )}
    </div>
  );
};

QuerySection.propTypes = {
  onFileSelect: PropTypes.func.isRequired,
  onQuerySubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default QuerySection;