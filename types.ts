export type Language = 'en' | 'zh';

export interface Question {
  id: number;
  group: string;
  text_en: string;
  text_zh: string;
}

export interface Answers {
  [questionId: number]: number; // 0-3
}

export interface AssessmentScores {
  depression: number;
  anger: number;
  mania: number;
  anxiety: number;
  suicidalIdeation: number;
  sleepProblems: number;
}

export interface Dictionary {
  title: string;
  subtitle: string;
  start: string;
  next: string;
  prev: string;
  submit: string;
  progress: string;
  question: string;
  options: {
    0: string;
    1: string;
    2: string;
    3: string;
  };
  eeg: {
    status: string;
    description: string;
  };
  result: {
    title: string;
    chartTitle: string;
    reportTitle: string;
    riskSummary: string;
    clinicalHints: string;
    treatment: string;
    eegNote: string;
    retake: string;
    export: string;
    clinicalPlaceholder: string;
    eegPlaceholder: string;
    dimensions: {
      depression: string;
      anger: string;
      mania: string;
      anxiety: string;
      suicidalIdeation: string;
      sleepProblems: string;
    };
    levels: {
      none: string;
      mild: string;
      moderate: string;
      severe: string;
    };
    advice: {
      self: string;
      selfDesc: string;
      pro: string;
      proDesc: string;
      emergency: string;
      emergencyDesc: string;
    };
    warning: string;
  };
}