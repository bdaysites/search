import React, { useState } from 'react';
import axios from 'axios';

interface UploadDocumentProps {
  setDocumentText: (text: string) => void;
}

const UploadDocument: React.FC<UploadDocumentProps> = ({ setDocumentText }) => {
  const [file, setFile] = useState<File | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setDocumentText(response.data.text);
      setPdfUrl(`http://localhost:5000${response.data.filePath}`);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="p-4">
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {pdfUrl && <iframe src={pdfUrl} width="100%" height="500px" />}
    </div>
  );
};

export default UploadDocument;
