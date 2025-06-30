import React from 'react';
import { UploadedFile } from '../App';
import { Eye, Download, FileImage, Zap } from 'lucide-react';

interface ImagePreviewProps {
  file: UploadedFile;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ file }) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = file.preview;
    link.download = file.file.name;
    link.click();
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 transition-colors duration-300">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 dark:bg-blue-900/20 p-2 rounded-lg">
            <FileImage className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white">Clinical Medical Image</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">{file.file.name}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 rounded-full text-xs">
            <Zap className="w-3 h-3" />
            <span>Clinical Ready</span>
          </div>
          <button
            onClick={handleDownload}
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            title="Download image"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="relative group">
        <img
          src={file.preview}
          alt="Clinical medical scan"
          className="w-full h-auto rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200 rounded-xl flex items-center justify-center">
          <Eye className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
          <span className="text-slate-600 dark:text-slate-300">File Size:</span>
          <span className="ml-2 font-medium text-slate-900 dark:text-white">
            {(file.file.size / 1024 / 1024).toFixed(2)} MB
          </span>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
          <span className="text-slate-600 dark:text-slate-300">Format:</span>
          <span className="ml-2 font-medium text-slate-900 dark:text-white">
            {file.file.type.split('/')[1].toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
};