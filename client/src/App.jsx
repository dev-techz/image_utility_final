import React, { useState, useCallback } from 'react';
import DropZone from './components/DropZone';
import ImageEditor from './components/ImageEditor';
import { Download, Scissors, RefreshCw, Upload } from 'lucide-react';

function App() {
  const [image, setImage] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleImageUpload = (file) => {
    setImage(file);
  };

  const handleClear = () => {
    setImage(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <header className="bg-white border-b border-gray-200 py-4 px-6 flex justify-between items-center shadow-sm">
        <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Scissors className="w-6 h-6 text-blue-500" />
          PixEdit
        </h1>
        {image && (
          <button 
            onClick={handleClear}
            className="text-sm text-gray-500 hover:text-red-500 flex items-center gap-1"
          >
            <RefreshCw className="w-4 h-4" /> Reset
          </button>
        )}
      </header>

      <main className="flex-1 p-6 max-w-5xl mx-auto w-full">
        {!image ? (
          <div className="mt-10">
            <DropZone onUpload={handleImageUpload} />
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-gray-600">
              <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                <Scissors className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                <h3 className="font-medium text-gray-900">Crop & Resize</h3>
                <p className="text-sm mt-1">Perfect framing for any platform.</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                <RefreshCw className="w-8 h-8 mx-auto mb-2 text-green-500" />
                <h3 className="font-medium text-gray-900">Convert Format</h3>
                <p className="text-sm mt-1">JPG, PNG, WEBP, GIF supported.</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                <Download className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                <h3 className="font-medium text-gray-900">Privacy First</h3>
                <p className="text-sm mt-1">Images process locally in your browser.</p>
              </div>
            </div>
          </div>
        ) : (
          <ImageEditor file={image} />
        )}
      </main>

      <footer className="py-4 text-center text-gray-400 text-sm">
        Built with React & Tailwind CSS v4
      </footer>
    </div>
  );
}

export default App;
