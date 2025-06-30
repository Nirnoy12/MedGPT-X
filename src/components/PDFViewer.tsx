import React, { useState, useEffect } from 'react';
import { UploadedFile } from '../App';
import { FileText, Download, FileSearch, Microscope } from 'lucide-react';

interface PDFViewerProps {
  file: UploadedFile;
}

export const PDFViewer: React.FC<PDFViewerProps> = ({ file }) => {
  const [extractedText, setExtractedText] = useState<string>('');
  const [isExtracting, setIsExtracting] = useState(true);

  useEffect(() => {
    // Simulate clinical-grade PDF text extraction
    const extractText = async () => {
      setIsExtracting(true);
      
      // Mock clinical text extraction
      setTimeout(() => {
        const mockText = `
CLINICAL LABORATORY REPORT

Patient: John Doe
Date: ${new Date().toLocaleDateString()}
Report Type: Comprehensive Metabolic Panel & Complete Blood Count

COMPLETE BLOOD COUNT (CBC) WITH DIFFERENTIAL:
- White Blood Cells: 11.2 K/μL (Normal: 4.0-11.0) [SLIGHTLY ELEVATED]
- Red Blood Cells: 4.8 M/μL (Normal: 4.5-5.5) [NORMAL]
- Hemoglobin: 14.2 g/dL (Normal: 14.0-17.5) [NORMAL]
- Hematocrit: 42.1% (Normal: 41-50) [NORMAL]
- Platelets: 285 K/μL (Normal: 150-400) [NORMAL]
- Neutrophils: 68% (Normal: 50-70) [NORMAL]
- Lymphocytes: 25% (Normal: 20-40) [NORMAL]

COMPREHENSIVE METABOLIC PANEL (CMP):
- Glucose: 95 mg/dL (Normal: 70-100) [NORMAL]
- BUN: 18 mg/dL (Normal: 7-20) [NORMAL]
- Creatinine: 1.0 mg/dL (Normal: 0.7-1.3) [NORMAL]
- eGFR: >60 mL/min/1.73m² [NORMAL]
- Sodium: 140 mEq/L (Normal: 136-145) [NORMAL]
- Potassium: 4.2 mEq/L (Normal: 3.5-5.0) [NORMAL]
- Chloride: 102 mEq/L (Normal: 98-107) [NORMAL]
- CO2: 24 mEq/L (Normal: 22-28) [NORMAL]
- Total Protein: 7.2 g/dL (Normal: 6.0-8.3) [NORMAL]
- Albumin: 4.1 g/dL (Normal: 3.5-5.0) [NORMAL]
- Total Bilirubin: 0.8 mg/dL (Normal: 0.3-1.2) [NORMAL]
- ALT: 28 U/L (Normal: 7-56) [NORMAL]
- AST: 24 U/L (Normal: 10-40) [NORMAL]

LIPID PANEL:
- Total Cholesterol: 185 mg/dL (Normal: <200) [NORMAL]
- HDL Cholesterol: 52 mg/dL (Normal: >40) [NORMAL]
- LDL Cholesterol: 115 mg/dL (Normal: <100) [SLIGHTLY ELEVATED]
- Triglycerides: 90 mg/dL (Normal: <150) [NORMAL]

CLINICAL IMPRESSION:
Slightly elevated white blood cell count (11.2 K/μL) suggesting possible mild inflammatory 
process or early infection. LDL cholesterol mildly elevated at 115 mg/dL. All other 
laboratory values within normal limits.

CLINICAL RECOMMENDATIONS:
1. Monitor symptoms and consider repeat CBC in 1 week if symptoms persist
2. Consider antibiotic therapy if fever or other signs of infection develop
3. Dietary counseling for cholesterol management
4. Repeat lipid panel in 3 months
5. Follow up with primary care physician for clinical correlation

Reviewed by: Dr. Sarah Johnson, MD
Laboratory Director: Dr. Michael Chen, MD, PhD
        `;
        setExtractedText(mockText);
        setIsExtracting(false);
      }, 2500);
    };

    extractText();
  }, [file]);

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
          <div className="bg-red-100 dark:bg-red-900/20 p-2 rounded-lg">
            <FileText className="w-5 h-5 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white">Clinical PDF Report</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">{file.file.name}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 rounded-full text-xs">
            <Microscope className="w-3 h-3" />
            <span>Clinical NLP</span>
          </div>
          <button
            onClick={handleDownload}
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            title="Download PDF"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
        <div className="bg-slate-50 dark:bg-slate-800 p-3 border-b border-slate-200 dark:border-slate-700 flex items-center space-x-2">
          <FileSearch className="w-4 h-4 text-slate-600 dark:text-slate-300" />
          <span className="text-sm font-medium text-slate-900 dark:text-white">Clinical Text Extraction</span>
        </div>
        
        <div className="p-4 max-h-96 overflow-y-auto">
          {isExtracting ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 dark:border-blue-400"></div>
              <span className="ml-3 text-slate-600 dark:text-slate-300">Extracting clinical data...</span>
            </div>
          ) : (
            <pre className="text-sm text-slate-800 dark:text-slate-200 whitespace-pre-wrap font-mono leading-relaxed">
              {extractedText}
            </pre>
          )}
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
          <span className="text-slate-600 dark:text-slate-300">Processing:</span>
          <span className="ml-2 font-medium text-slate-900 dark:text-white">
            Clinical NLP
          </span>
        </div>
      </div>
    </div>
  );
};