import React from 'react';
import { Database, FileSpreadsheet } from 'lucide-react';
import PropTypes from 'prop-types';

function DataSourceSelector({ selectedSource, onSourceChange }) {
  return (
    <div className="flex space-x-4 mb-6">
      <button
        onClick={() => onSourceChange('sample')}
        className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
          selectedSource === 'sample'
            ? 'bg-gray-900 text-white'
            : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
        }`}
      >
        <Database className="w-5 h-5 mr-2" />
        Sample Database
      </button>
      <button
        onClick={() => onSourceChange('csv')}
        className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
          selectedSource === 'csv'
            ? 'bg-gray-900 text-white'
            : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
        }`}
      >
        <FileSpreadsheet className="w-5 h-5 mr-2" />
        CSV File
      </button>
    </div>
  );
}

DataSourceSelector.propTypes = {
  selectedSource: PropTypes.oneOf(['sample', 'csv']).isRequired,
  onSourceChange: PropTypes.func.isRequired,
};

export default DataSourceSelector;