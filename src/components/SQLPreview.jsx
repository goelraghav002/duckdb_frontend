import React from "react";
import { Code, Loader } from "lucide-react";

const SQLPreview = ({ sql, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-gray-900 rounded-xl p-6 mb-8 overflow-x-auto flex justify-center items-center">
        <Loader className="animate-spin h-6 w-6 text-gray-100" />
        <span className="ml-3 text-gray-100 font-mono text-sm">Generating SQL...</span>
      </div>
    );
  }

  if (!sql) return null;

  return (
    <div className="bg-gray-900 rounded-xl p-6 mb-8 overflow-x-auto">
      <div className="flex items-center mb-2">
        <Code className="w-4 h-4 text-gray-400 mr-2" />
        <h2 className="text-gray-400 text-sm font-medium">Generated SQL Query</h2>
      </div>
      <pre className="text-gray-100 font-mono text-sm">{sql}</pre>
    </div>
  );
};

export default SQLPreview;