// src/App.tsx
import React, { useState } from 'react';
import UploadDocument from './components/UploadDocument';
import SearchPane from './components/SearchPane';

const App: React.FC = () => {
  const [dividerPosition, setDividerPosition] = useState<number | null>(null);
  const [documentText, setDocumentText] = useState<string>('');

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setDividerPosition(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (dividerPosition !== null) {
      const dx = e.clientX - dividerPosition;
      const newWidth = `${e.currentTarget.previousElementSibling!.clientWidth + dx}px`;
      e.currentTarget.previousElementSibling!.style.width = newWidth;
      setDividerPosition(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setDividerPosition(null);
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 flex-none border-r border-gray-200 relative">
        <UploadDocument setDocumentText={setDocumentText} />
        <div
          className="absolute top-0 bottom-0 right-0 w-1 h-full bg-gray-200 cursor-col-resize z-10"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        />
      </div>
      <div className="flex-1 p-4">
        <SearchPane documentText={documentText} />
      </div>
    </div>
  );
};

export default App;
