import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { useLanguage } from '../context/LanguageContext';
import { Answers, AssessmentScores } from '../types';
import EegSimulator from '../components/EegSimulator';

const Result: React.FC = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [scores, setScores] = useState<AssessmentScores | null>(null);

  useEffect(() => {
    if (!location.state?.answers) {
      navigate('/');
      return;
    }

    const answers = location.state.answers as Answers;
    
    // Logic provided in prompt
    // Defaulting to 0 if undefined for safety
    const getVal = (id: number) => answers[id] || 0;

    const calculatedScores: AssessmentScores = {
      depression: (getVal(1) + getVal(2)) / 2,
      anger: getVal(3),
      mania: (getVal(4) + getVal(5)) / 2,
      anxiety: (getVal(6) + getVal(7) + getVal(8)) / 3,
      suicidalIdeation: getVal(11),
      sleepProblems: getVal(14)
    };

    setScores(calculatedScores);
  }, [location.state, navigate]);

  if (!scores) return null;

  const chartData = [
    { subject: t.result.dimensions.depression, A: scores.depression, fullMark: 3 },
    { subject: t.result.dimensions.anger, A: scores.anger, fullMark: 3 },
    { subject: t.result.dimensions.mania, A: scores.mania, fullMark: 3 },
    { subject: t.result.dimensions.anxiety, A: scores.anxiety, fullMark: 3 },
    { subject: t.result.dimensions.suicidalIdeation, A: scores.suicidalIdeation, fullMark: 3 },
    { subject: t.result.dimensions.sleepProblems, A: scores.sleepProblems, fullMark: 3 },
  ];

  const getSeverity = (score: number) => {
    if (score < 1) return { text: t.result.levels.none, color: "text-gray-500", bg: "bg-gray-100" };
    if (score < 2) return { text: t.result.levels.mild, color: "text-green-600", bg: "bg-green-100" };
    if (score < 2.5) return { text: t.result.levels.moderate, color: "text-yellow-600", bg: "bg-yellow-100" };
    return { text: t.result.levels.severe, color: "text-red-600", bg: "bg-red-100" };
  };

  const isEmergency = scores.suicidalIdeation >= 2;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         
         {/* Left Column: Chart */}
         <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8 flex flex-col">
            <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">{t.result.chartTitle}</h2>
            
            <div className="flex-1 min-h-[400px] flex items-center justify-center relative">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#4b5563', fontSize: 12, fontWeight: 600 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 3]} tickCount={4} stroke="#9ca3af" />
                  <Radar
                    name="Assessment"
                    dataKey="A"
                    stroke="#4A6FA7"
                    strokeWidth={3}
                    fill="#4A6FA7"
                    fillOpacity={0.4}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  />
                </RadarChart>
              </ResponsiveContainer>
              
              {/* Overlay Badges for high risks */}
              {isEmergency && (
                 <div className="absolute top-4 right-4 animate-pulse">
                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold border border-red-200">
                      High Risk Detected
                    </span>
                 </div>
              )}
            </div>

            <div className="mt-8">
              <h3 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
                 <span className="w-2 h-6 bg-primary rounded-full"></span>
                 {t.eeg.description}
              </h3>
              <EegSimulator compact />
              <p className="mt-3 text-sm text-gray-600 italic border-l-4 border-gray-200 pl-3">
                 "{t.result.eegPlaceholder}"
              </p>
            </div>
         </div>

         {/* Right Column: Report */}
         <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8 flex flex-col h-full">
            <div className="border-b border-gray-100 pb-4 mb-6 flex justify-between items-center">
               <h2 className="text-2xl font-bold text-gray-800">{t.result.reportTitle}</h2>
               <span className="text-sm text-gray-400 font-mono">{new Date().toLocaleDateString()}</span>
            </div>

            {/* Risk Summary */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-700 mb-4">{t.result.riskSummary}</h3>
              <div className="space-y-3">
                 {chartData.map((item) => {
                    const severity = getSeverity(item.A);
                    const isAlert = item.subject === t.result.dimensions.suicidalIdeation && item.A >= 2;
                    
                    return (
                       <div key={item.subject} className={`flex justify-between items-center p-3 rounded-lg border ${isAlert ? 'border-red-200 bg-red-50' : 'border-gray-50 bg-gray-50/50'}`}>
                          <span className={`font-medium ${isAlert ? 'text-red-700' : 'text-gray-700'}`}>{item.subject}</span>
                          <div className="flex items-center gap-3">
                             <span className="text-sm text-gray-500 font-mono">({item.A.toFixed(1)}/3)</span>
                             <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${severity.bg} ${severity.color}`}>
                                {severity.text}
                             </span>
                          </div>
                       </div>
                    );
                 })}
              </div>
            </div>

            {/* Clinical Hints */}
            <div className="mb-8">
               <h3 className="text-lg font-bold text-gray-700 mb-3">{t.result.clinicalHints}</h3>
               <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl text-blue-900 text-sm leading-relaxed">
                  {t.result.clinicalPlaceholder}
               </div>
            </div>

            {/* Recommendations */}
            <div className="flex-1">
               <h3 className="text-lg font-bold text-gray-700 mb-4">{t.result.treatment}</h3>
               <div className="space-y-4">
                  
                  {/* Emergency - Conditional */}
                  {isEmergency && (
                    <div className="flex items-start gap-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
                       <div className="text-2xl">⚠️</div>
                       <div>
                          <h4 className="font-bold text-red-700">{t.result.advice.emergency}</h4>
                          <p className="text-sm text-red-600 mt-1">{t.result.advice.emergencyDesc}</p>
                       </div>
                    </div>
                  )}

                  <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                     <div className="text-2xl">🩺</div>
                     <div>
                        <h4 className="font-bold text-gray-800">{t.result.advice.pro}</h4>
                        <p className="text-sm text-gray-600 mt-1">{t.result.advice.proDesc}</p>
                     </div>
                  </div>

                  <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                     <div className="text-2xl">✅</div>
                     <div>
                        <h4 className="font-bold text-gray-800">{t.result.advice.self}</h4>
                        <p className="text-sm text-gray-600 mt-1">{t.result.advice.selfDesc}</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Actions */}
            <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row gap-4">
               <button 
                 onClick={() => navigate('/')}
                 className="flex-1 px-6 py-3 bg-white border-2 border-primary text-primary font-bold rounded-xl hover:bg-blue-50 transition-colors"
               >
                 {t.result.retake}
               </button>
               <button 
                 className="flex-1 px-6 py-3 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all"
               >
                 {t.result.export}
               </button>
            </div>
         </div>
       </div>
    </div>
  );
};

export default Result;