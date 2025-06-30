import React from 'react';
import { DiagnosisData } from '../App';
import { 
  Brain, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Stethoscope,
  Pill,
  TrendingUp,
  User,
  Eye,
  Heart,
  Scan,
  Activity,
  Zap,
  Target,
  Settings,
  Award,
  BarChart3,
  Microscope
} from 'lucide-react';

interface DiagnosisResultsProps {
  data: DiagnosisData;
}

export const DiagnosisResults: React.FC<DiagnosisResultsProps> = ({ data }) => {
  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      case 'medium': return 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800';
      case 'low': return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      default: return 'text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/20 border-slate-200 dark:border-slate-700';
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'high': return <AlertTriangle className="w-4 h-4" />;
      case 'medium': return <Clock className="w-4 h-4" />;
      case 'low': return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getImageTypeIcon = (imageType?: string) => {
    switch (imageType) {
      case 'brain-mri': return <Brain className="w-6 h-6 text-purple-600 dark:text-purple-400" />;
      case 'chest-xray': return <Heart className="w-6 h-6 text-blue-600 dark:text-blue-400" />;
      case 'ct-scan': 
      case 'abdominal-ct': return <Scan className="w-6 h-6 text-teal-600 dark:text-teal-400" />;
      case 'bone-xray': return <Activity className="w-6 h-6 text-orange-600 dark:text-orange-400" />;
      case 'ultrasound': return <Zap className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />;
      default: return <Eye className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />;
    }
  };

  const getImageTypeLabel = (imageType?: string) => {
    switch (imageType) {
      case 'brain-mri': return 'Clinical Brain MRI Analysis';
      case 'chest-xray': return 'CheXNet Chest X-Ray Analysis';
      case 'ct-scan': return 'Clinical CT Scan Analysis';
      case 'abdominal-ct': return 'Clinical Abdominal CT Analysis';
      case 'bone-xray': return 'Clinical Bone X-Ray Analysis';
      case 'ultrasound': return 'Clinical Ultrasound Analysis';
      case 'pdf-report': return 'Clinical Report Analysis';
      default: return 'Clinical Medical Analysis';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 85) return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20';
    if (confidence >= 70) return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20';
    return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20';
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 transition-colors duration-300">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900 p-2 rounded-lg">
            {getImageTypeIcon(data.imageType)}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
              {getImageTypeLabel(data.imageType)}
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm">Clinical-grade AI-powered medical interpretation</p>
          </div>
        </div>
        
        <div className={`px-3 py-2 rounded-lg ${getConfidenceColor(data.confidence)}`}>
          <div className="flex items-center space-x-2">
            <Award className="w-4 h-4" />
            <span className="font-semibold">{data.confidence}%</span>
          </div>
        </div>
      </div>

      {/* Clinical Pathology Findings */}
      {data.clinicalFindings && data.clinicalFindings.pathologies.length > 0 && (
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
          <div className="flex items-center space-x-2 mb-3">
            <Microscope className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h4 className="font-semibold text-blue-900 dark:text-blue-100">Clinical Pathology Detection</h4>
          </div>
          <div className="space-y-3">
            {data.clinicalFindings.pathologies.map((pathology, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-lg border border-blue-100 dark:border-blue-800">
                <div className="flex-1">
                  <p className="font-medium text-slate-900 dark:text-white">{pathology.condition}</p>
                  {pathology.location && (
                    <p className="text-sm text-slate-600 dark:text-slate-300">Location: {pathology.location}</p>
                  )}
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    pathology.severity === 'severe' ? 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200' :
                    pathology.severity === 'moderate' ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200' :
                    'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200'
                  }`}>
                    {pathology.severity}
                  </span>
                  <div className="flex items-center space-x-1">
                    <BarChart3 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="font-semibold text-blue-600 dark:text-blue-400">{pathology.probability}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Technical Details */}
      {data.technicalDetails && (
        <div className="mb-6 p-4 bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-blue-900/20 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="flex items-center space-x-2 mb-3">
            <Settings className="w-4 h-4 text-slate-600 dark:text-slate-300" />
            <h4 className="font-semibold text-slate-900 dark:text-white">Clinical Technical Analysis</h4>
            {data.technicalDetails.heatmapAvailable && (
              <span className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 text-xs rounded-full">
                Heatmap Available
              </span>
            )}
          </div>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-slate-600 dark:text-slate-300 mb-1">Imaging Modality:</p>
              <p className="font-medium text-slate-900 dark:text-white">{data.technicalDetails.imagingModality}</p>
            </div>
            <div>
              <p className="text-slate-600 dark:text-slate-300 mb-1">Anatomical Region:</p>
              <p className="font-medium text-slate-900 dark:text-white">{data.technicalDetails.anatomicalRegion}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-slate-600 dark:text-slate-300 mb-1">Clinical Quality Assessment:</p>
              <p className="font-medium text-slate-900 dark:text-white">{data.technicalDetails.qualityAssessment}</p>
            </div>
          </div>
          
          {data.technicalDetails.imageCharacteristics && (
            <div className="mt-3">
              <p className="text-slate-600 dark:text-slate-300 mb-2">Clinical Image Characteristics:</p>
              <div className="flex flex-wrap gap-2">
                {data.technicalDetails.imageCharacteristics.map((char, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 rounded-full text-xs">
                    {char}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Image Type Detection */}
      {data.imageType && data.subType && (
        <div className="mb-6 p-4 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-xl border border-indigo-100 dark:border-indigo-800">
          <div className="flex items-center space-x-2 mb-2">
            <Eye className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <h4 className="font-semibold text-indigo-900 dark:text-indigo-100">Clinical Detection Results</h4>
          </div>
          <p className="text-indigo-800 dark:text-indigo-200">
            <span className="font-medium">Type:</span> {data.imageType.replace('-', ' ').toUpperCase()} 
            {data.subType && <span className="ml-2">({data.subType})</span>}
          </p>
          <p className="text-indigo-700 dark:text-indigo-300 text-sm mt-1">
            Clinical-grade multi-modal AI analysis with {data.confidence}% confidence
          </p>
        </div>
      )}

      {/* Findings Section */}
      {data.findings && data.findings.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-4 h-4 bg-teal-600 dark:bg-teal-400 rounded-full"></div>
            <h4 className="font-semibold text-slate-900 dark:text-white">Clinical Findings</h4>
          </div>
          <div className="space-y-2">
            {data.findings.map((finding, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-teal-50 dark:bg-teal-900/20 rounded-lg border border-teal-100 dark:border-teal-800">
                <div className="bg-teal-600 dark:bg-teal-400 text-white dark:text-slate-900 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mt-0.5">
                  {index + 1}
                </div>
                <p className="text-slate-700 dark:text-slate-200 flex-1">{finding}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Diagnosis Section */}
      <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Stethoscope className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h4 className="font-semibold text-blue-900 dark:text-blue-100">Clinical Diagnosis</h4>
          </div>
          <div className={`px-3 py-1 rounded-full border text-sm font-medium flex items-center space-x-1 ${getUrgencyColor(data.urgency)}`}>
            {getUrgencyIcon(data.urgency)}
            <span className="capitalize">{data.urgency} Priority</span>
          </div>
        </div>
        <p className="text-slate-800 dark:text-slate-100 font-medium text-lg mb-2">{data.diagnosis}</p>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
            <span className="text-sm text-slate-600 dark:text-slate-300">
              Clinical Confidence: <span className="font-medium text-green-600 dark:text-green-400">{data.confidence}%</span>
            </span>
          </div>
          {data.technicalDetails && (
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm text-slate-600 dark:text-slate-300">
                Modality: <span className="font-medium text-blue-600 dark:text-blue-400">{data.technicalDetails.imagingModality.split(' ')[0]}</span>
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Clinical Assessment */}
      {data.clinicalFindings && (
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <Award className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <h4 className="font-semibold text-slate-900 dark:text-white">Clinical Assessment</h4>
          </div>
          <p className="text-slate-700 dark:text-slate-200 leading-relaxed bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-100 dark:border-purple-800">
            {data.clinicalFindings.overallAssessment}
          </p>
        </div>
      )}

      {/* Medical Explanation */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-3">
          <div className="w-4 h-4 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
          <h4 className="font-semibold text-slate-900 dark:text-white">Clinical Interpretation</h4>
        </div>
        <p className="text-slate-700 dark:text-slate-200 leading-relaxed bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
          {data.explanation}
        </p>
      </div>

      {/* Layman's Explanation */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-3">
          <User className="w-4 h-4 text-green-600 dark:text-green-400" />
          <h4 className="font-semibold text-slate-900 dark:text-white">Patient-Friendly Explanation</h4>
        </div>
        <p className="text-slate-700 dark:text-slate-200 leading-relaxed bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-100 dark:border-green-800">
          {data.laymanExplanation}
        </p>
      </div>

      {/* Clinical Recommendations */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-3">
          <Pill className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          <h4 className="font-semibold text-slate-900 dark:text-white">Clinical Recommendations</h4>
        </div>
        <div className="space-y-2">
          {data.treatments.map((treatment, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-100 dark:border-purple-800">
              <div className="bg-purple-600 dark:bg-purple-400 text-white dark:text-slate-900 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mt-0.5">
                {index + 1}
              </div>
              <p className="text-slate-700 dark:text-slate-200 flex-1">{treatment}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Actions */}
      {data.clinicalFindings && data.clinicalFindings.recommendedActions.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <Target className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            <h4 className="font-semibold text-slate-900 dark:text-white">Recommended Clinical Actions</h4>
          </div>
          <div className="space-y-2">
            {data.clinicalFindings.recommendedActions.map((action, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-100 dark:border-orange-800">
                <div className="bg-orange-600 dark:bg-orange-400 text-white dark:text-slate-900 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mt-0.5">
                  {index + 1}
                </div>
                <p className="text-slate-700 dark:text-slate-200 flex-1">{action}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="p-4 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
        <p className="text-yellow-800 dark:text-yellow-200 text-sm">
          <strong>Clinical Disclaimer:</strong> This clinical-grade AI analysis uses CheXNet-inspired algorithms and advanced 
          pathology detection for improved accuracy, but should complement, not replace, professional medical consultation. 
          Please discuss these findings with your healthcare provider for proper clinical correlation and treatment planning.
        </p>
      </div>
    </div>
  );
};