import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileImage, FileText, Loader2, Brain, Activity } from 'lucide-react';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  isAnalyzing: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload, isAnalyzing }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileUpload(acceptedFiles[0]);
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.bmp'],
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    disabled: isAnalyzing
  });

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 transition-colors duration-300">
      <div className="mb-4">
        <div className="flex items-center space-x-3 mb-2">
          <div className="bg-gradient-to-br from-blue-100 to-teal-100 dark:from-blue-900 dark:to-teal-900 p-2 rounded-lg">
            <Brain className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Clinical-Grade Medical Analysis</h2>
        </div>
        <p className="text-slate-600 dark:text-slate-300 text-sm">
          Upload X-rays, MRIs, CT scans, or PDF reports for CheXNet-level AI analysis
        </p>
      </div>
      
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200
          ${isDragActive 
            ? 'border-blue-400 dark:border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
            : 'border-slate-300 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-slate-50 dark:hover:bg-slate-800/50'
          }
          ${isAnalyzing ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <input {...getInputProps()} />
        
        {isAnalyzing ? (
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Loader2 className="w-12 h-12 text-blue-600 dark:text-blue-400 animate-spin" />
              <Activity className="w-6 h-6 text-teal-600 dark:text-teal-400 absolute top-3 left-3 animate-pulse" />
            </div>
            <div>
              <p className="text-lg font-medium text-slate-900 dark:text-white">Clinical Analysis in Progress...</p>
              <p className="text-slate-600 dark:text-slate-300 text-sm">CheXNet-level AI processing your medical file</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <div className="bg-gradient-to-br from-blue-100 to-teal-100 dark:from-blue-900 dark:to-teal-900 p-4 rounded-full">
              <Upload className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            
            <div>
              <p className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                {isDragActive ? 'Drop your medical file here' : 'Drag & drop or click to upload'}
              </p>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                Supports: JPEG, PNG, GIF, BMP, PDF • Max size: 10MB
              </p>
            </div>
            
            <div className="flex items-center space-x-6 mt-4">
              <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-300">
                <FileImage className="w-4 h-4" />
                <span>Medical Images</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-300">
                <FileText className="w-4 h-4" />
                <span>PDF Reports</span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-4 p-3 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
        <p className="text-amber-800 dark:text-amber-200 text-sm">
          <strong>Clinical Disclaimer:</strong> This AI provides clinical-grade analysis for educational and screening purposes. 
          Always consult qualified healthcare professionals for medical decisions and definitive diagnosis.
        </p>
      </div>
    </div>
  );
};