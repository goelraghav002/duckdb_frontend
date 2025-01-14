import React, { useCallback } from 'react';
import { uploadDataset, generateSQL, executeQuery } from '../lib/api';
import QuerySection from '../components/QuerySection';
import SQLPreview from '../components/SQLPreview';
import ResultsTable from '../components/ResultsTable';
import Navbar from '../components/Navbar'; 
import useFileStore from '../store/useFileStore';

const HomePage = () => {
  const { dataSource, setDataSource, tableName, setTableName, setUploadedFile } = useFileStore();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSQLLoading, setIsSQLLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [results, setResults] = React.useState(null);
  const [generatedSQL, setGeneratedSQL] = React.useState('');
  const [headings, setHeadings] = React.useState('');

  const handleFileSelect = useCallback(async (file) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await uploadDataset(file);
      console.log('CSV uploaded successfully:', data);
      setTableName(data.table);
      setUploadedFile(file);  // Persist the uploaded file in Zustand store
      setDataSource('csv');
    } catch (err) {
      setError(err?.response?.data?.error || 'An error occurred during file upload');
    } finally {
      setIsLoading(false);
    }
  }, [setTableName, setUploadedFile, setDataSource]);

  const handleQuery = useCallback(async (naturalQuery) => {
    setIsSQLLoading(true);
    setIsLoading(true);
    setError(null);

    try {
      const sqlQuery = await generateSQL(naturalQuery, tableName);
      setGeneratedSQL(sqlQuery);
      setIsSQLLoading(false);

      const queryResponse = await executeQuery(sqlQuery);
      setResults(queryResponse.data);
      setHeadings(queryResponse.columns);
    } catch (err) {
      setError(err?.response?.data?.error || 'An error occurred during query execution');
      setResults(null);
    } finally {
      setIsLoading(false);
      setIsSQLLoading(false);
    }
  }, [tableName]);

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="mt-4 text-4xl font-bold text-gray-900 tracking-tight">
              DuckDB Analytics Dashboard
            </h1>
            <p className="mt-3 text-lg text-gray-600">
              Analyze your data using natural language queries
            </p>
          </div>

          <QuerySection
            selectedSource={dataSource}
            onFileSelect={handleFileSelect}
            onQuerySubmit={handleQuery}
            isLoading={isLoading}
          />

          <SQLPreview sql={generatedSQL} isLoading={isSQLLoading} />

          <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-md">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            ) : (
              <ResultsTable data={results} error={error} headings={headings} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;