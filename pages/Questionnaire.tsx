import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { QUESTIONS } from '../constants';
import { Answers } from '../types';
import EegSimulator from '../components/EegSimulator';

const Questionnaire: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = QUESTIONS[currentQuestionIndex];
  const totalQuestions = QUESTIONS.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  
  const handleOptionSelect = (value: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call as requested
    // fetch('/api/analyze-dsm5', { method: 'POST', body: JSON.stringify({ answers, eegSnapshot: 'mock' }) })
    
    setTimeout(() => {
        setIsSubmitting(false);
        navigate('/result', { state: { answers } });
    }, 1500);
  };

  const isCurrentAnswered = answers[currentQuestion.id] !== undefined;
  const allAnswered = Object.keys(answers).length === totalQuestions;

  // Auto-advance logic (optional, but improves UX)
  useEffect(() => {
    // If we wanted to auto-advance, we could do it here, but manual is safer for medical contexts.
  }, [answers, currentQuestionIndex]);

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Questionnaire Area */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 flex flex-col relative overflow-hidden">
           {/* Progress Bar */}
           <div className="absolute top-0 left-0 w-full h-1.5 bg-gray-100">
             <div 
                className="h-full bg-primary transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
             ></div>
           </div>

           <div className="mt-4 mb-6 flex justify-between items-center text-sm text-gray-500 font-medium">
             <span>{t.progress} {currentQuestionIndex + 1} / {totalQuestions}</span>
             <span className="bg-blue-50 text-primary px-2 py-1 rounded">Group {currentQuestion.group}</span>
           </div>

           <div className="flex-1 flex flex-col justify-center min-h-[300px]">
             <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 leading-relaxed">
               {language === 'zh' ? currentQuestion.text_zh : currentQuestion.text_en}
             </h2>
             {/* Show secondary language in smaller text for reference */}
             <p className="text-gray-400 text-sm md:text-base mb-8">
               {language === 'zh' ? currentQuestion.text_en : currentQuestion.text_zh}
             </p>

             <div className="space-y-3">
               {[0, 1, 2, 3].map((val) => (
                 <button
                    key={val}
                    onClick={() => handleOptionSelect(val)}
                    className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group
                      ${answers[currentQuestion.id] === val 
                        ? 'border-primary bg-blue-50 text-primary shadow-sm' 
                        : 'border-gray-100 hover:border-blue-200 hover:bg-gray-50 text-gray-700'
                      }`}
                 >
                   <span className="font-medium text-lg">{t.options[val as 0|1|2|3]}</span>
                   <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
                      ${answers[currentQuestion.id] === val ? 'border-primary' : 'border-gray-300 group-hover:border-blue-300'}`}>
                      {answers[currentQuestion.id] === val && <div className="w-3 h-3 bg-primary rounded-full" />}
                   </div>
                 </button>
               ))}
             </div>
           </div>

           <div className="mt-8 flex justify-between items-center pt-6 border-t border-gray-100">
             <button
               onClick={handlePrev}
               disabled={currentQuestionIndex === 0}
               className={`px-6 py-2.5 rounded-lg font-medium transition-colors
                 ${currentQuestionIndex === 0 
                   ? 'text-gray-300 cursor-not-allowed' 
                   : 'text-gray-600 hover:bg-gray-100 hover:text-primary'}`}
             >
               {t.prev}
             </button>

             {currentQuestionIndex === totalQuestions - 1 ? (
               <button
                 onClick={handleSubmit}
                 disabled={!allAnswered || isSubmitting}
                 className={`px-8 py-2.5 rounded-lg font-bold text-white shadow-md transition-all
                   ${!allAnswered || isSubmitting
                     ? 'bg-gray-300 cursor-not-allowed' 
                     : 'bg-primary hover:bg-blue-700 hover:shadow-lg transform active:scale-95'}`}
               >
                 {isSubmitting ? '...' : t.submit}
               </button>
             ) : (
               <button
                 onClick={handleNext}
                 disabled={!isCurrentAnswered}
                 className={`px-8 py-2.5 rounded-lg font-bold text-white shadow-md transition-all
                   ${!isCurrentAnswered 
                     ? 'bg-gray-300 cursor-not-allowed' 
                     : 'bg-primary hover:bg-blue-700 hover:shadow-lg transform active:scale-95'}`}
               >
                 {t.next}
               </button>
             )}
           </div>
        </div>

        {/* Sidebar / EEG Section */}
        <div className="lg:col-span-1 space-y-6">
           <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-5 sticky top-6">
              <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
                 <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                 </svg>
                 Instructions
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-6">
                Please answer each question based on how you have felt over the last 2 weeks. There are no right or wrong answers.
              </p>
              
              <div className="mb-2 font-semibold text-gray-700 flex items-center gap-2">
                 <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                 </svg>
                 Neuro-Sync
              </div>
              <EegSimulator />
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-xs text-blue-800">
                  <span className="font-bold">Privacy Note:</span> Your data is processed locally. EEG simulation visualizes real-time physiological signal placeholders.
                </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;