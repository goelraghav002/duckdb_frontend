import {create} from 'zustand';

const useFileStore = create((set) => ({
  dataSource: localStorage.getItem('dataSource') || 'sample',
  tableName: localStorage.getItem('tableName') || '',
  uploadedFile: localStorage.getItem('uploadedFile') ? JSON.parse(localStorage.getItem('uploadedFile')) : null,
  setDataSource: (source) => {
    console.log("Setting dataSource to", source);
    localStorage.setItem('dataSource', source); // Persist to localStorage
    set({ dataSource: source });
  },
  setTableName: (tableName) => {
    console.log("Setting tableName to", tableName);
    localStorage.setItem('tableName', tableName); // Persist to localStorage
    set({ tableName });
  },
  setUploadedFile: (file) => {
    const fileMetadata = {
      name: file.name,
      type: file.type,
      size: file.size,
    };
    console.log("Persisting uploaded file metadata", fileMetadata);
    localStorage.setItem('uploadedFile', JSON.stringify(fileMetadata)); // Store metadata
    set({ uploadedFile: fileMetadata });
  },
}));

export default useFileStore;