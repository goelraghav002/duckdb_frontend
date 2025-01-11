import React, { useState } from "react";
import FileUpload from "./FileUpload";
import QueryInput from "./QueryInput";
import PropTypes from "prop-types";

const QuerySection = ({ onFileSelect, onQuerySubmit, isLoading }) => {
  const [uploadedFileName, setUploadedFileName] = useState("");

  const handleFileChange = (file) => {
    onFileSelect(file);
    setUploadedFileName(file.name); // Save the uploaded file's name
  };

  const handleUpdateFile = () => {
    setUploadedFileName(""); // Reset the file name to allow file re-selection
  };

  return (
    <div className="border border-gray-200 rounded-xl p-6 mb-8">
      {uploadedFileName ? (
        <div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600">
              Uploaded File: <span className="font-bold text-gray-900">{uploadedFileName}</span>
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