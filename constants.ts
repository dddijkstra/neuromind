import { Question, Dictionary, Language } from './types';

export const QUESTIONS: Question[] = [
  { id: 1, group: "I", text_en: "Little interest or pleasure in doing things?", text_zh: "对事物缺乏兴趣或乐趣？" },
  { id: 2, group: "I", text_en: "Feeling down, depressed, or hopeless?", text_zh: "感到沮丧、抑郁或绝望？" },
  { id: 3, group: "II", text_en: "Feeling more irritated, grouchy, or angry than usual?", text_zh: "比平时更易怒、暴躁或愤怒？" },
  { id: 4, group: "III", text_en: "Sleeping less than usual, but still have a lot of energy?", text_zh: "睡眠时间少于平常，但精力充沛？" },
  { id: 5, group: "III", text_en: "Starting lots more projects than usual or doing more risky things than usual?", text_zh: "开始比平时更多的项目或做更多冒险的事情？" },
  { id: 6, group: "IV", text_en: "Feeling nervous, anxious, frightened, worried, or on edge?", text_zh: "感到紧张、焦虑、害怕、担忧或不安？" },
  { id: 7, group: "IV", text_en: "Feeling panic or being frightened?", text_zh: "感到恐慌或被吓到？" },
  { id: 8, group: "IV", text_en: "Avoiding situations that make you anxious?", text_zh: "避免让你感到焦虑的情况？" },
  { id: 9, group: "V", text_en: "Unexplained aches and pains (e.g., head, back, joints, abdomen, legs)?", text_zh: "无法解释的身体疼痛（如头痛、背痛、关节痛、腹痛、腿痛）？" },
  { id: 10, group: "V", text_en: "Feeling that your illnesses are not being taken seriously enough?", text_zh: "感觉自己的疾病没有得到足够的重视？" },
  { id: 11, group: "VI", text_en: "Thoughts of actually hurting yourself?", text_zh: "实际伤害自己的想法？" },
  { id: 12, group: "VII", text_en: "Hearing things other people couldn’t hear, such as voices even when no one was around?", text_zh: "听到别人听不到的声音，即使周围没有人？" },
  { id: 13, group: "VII", text_en: "Feeling that someone could hear your thoughts, or that you could hear what another person was thinking?", text_zh: "感觉有人能听到你的想法，或者你能听到别人的思维？" },
  { id: 14, group: "VIII", text_en: "Problems with sleep that affected your sleep quality over all?", text_zh: "睡眠问题影响了整体睡眠质量？" },
  { id: 15, group: "IX", text_en: "Problems with memory (e.g., learning new information) or with location (e.g., finding your way home)?", text_zh: "记忆问题（例如学习新信息）或定位问题（例如找不到回家的路）？" },
  { id: 16, group: "X", text_en: "Unpleasant thoughts, urges, or images that repeatedly enter your mind?", text_zh: "不愉快的想法、冲动或图像反复出现在脑海中？" },
  { id: 17, group: "X", text_en: "Feeling driven to perform certain behaviors or mental acts over and over again?", text_zh: "被迫重复某些行为或精神活动？" },
  { id: 18, group: "XI", text_en: "Feeling detached or distant from yourself, your body, your physical surroundings, or your memories?", text_zh: "感觉自己与自己、身体、物理环境或记忆疏远或分离？" },
  { id: 19, group: "XII", text_en: "Not knowing who you really are or what you want out of life?", text_zh: "不知道自己是谁或想要从生活中得到什么？" },
  { id: 20, group: "XII", text_en: "Not feeling close to other people or enjoying your relationships with them?", text_zh: "不觉得亲近他人或享受与他们的关系？" },
  { id: 21, group: "XIII", text_en: "Drinking at least 4 drinks of any kind of alcohol in a single day?", text_zh: "一天内至少喝四种酒精饮料？" },
  { id: 22, group: "XIII", text_en: "Smoking any cigarettes, a cigar, or pipe, or using snuff or chewing tobacco?", text_zh: "吸烟或使用鼻烟或嚼烟？" },
  { id: 23, group: "XIII", text_en: "Using any medicines ON YOUR OWN without a doctor’s prescription...?", text_zh: "未经医生处方自行服用任何药物...？" }
];

export const DICTIONARY: Record<Language, Dictionary> = {
  en: {
    title: "NeuroMind Assessment",
    subtitle: "DSM-5-TR Mental Health Screening",
    start: "Start Assessment",
    next: "Next",
    prev: "Previous",
    submit: "Submit Assessment",
    progress: "Question",
    question: "Question",
    options: {
      0: "Not at all",
      1: "Rarely",
      2: "Several days",
      3: "Nearly every day"
    },
    eeg: {
      status: "EEG data collection in progress (simulation)",
      description: "The system synchronizes brainwave activity to assist in emotional state analysis."
    },
    result: {
      title: "Assessment Result",
      chartTitle: "Psychological Health Dimension Assessment (Based on DSM-5-TR and EEG Assistance)",
      reportTitle: "Comprehensive Assessment Report",
      riskSummary: "Risk Summary",
      clinicalHints: "Clinical Indications",
      treatment: "Recommendations",
      eegNote: "EEG Analysis",
      retake: "Retake Test",
      export: "Export Report (PDF)",
      clinicalPlaceholder: "Your depression and mania symptoms are borderline. It is recommended to consult a psychiatrist for further evaluation of bipolar disorder.",
      eegPlaceholder: "EEG data shows enhanced theta waves in the prefrontal cortex, consistent with difficulties in emotional regulation.",
      dimensions: {
        depression: "Depression",
        anger: "Anger",
        mania: "Mania",
        anxiety: "Anxiety",
        suicidalIdeation: "Suicidal Ideation",
        sleepProblems: "Sleep Problems"
      },
      levels: {
        none: "None",
        mild: "Mild",
        moderate: "Moderate",
        severe: "Severe"
      },
      advice: {
        self: "Self-regulation",
        selfDesc: "Regular routines, mindfulness practice",
        pro: "Professional intervention",
        proDesc: "Recommend psychotherapy (CBT)",
        emergency: "Emergency",
        emergencyDesc: "Please contact the psychological crisis hotline immediately: XXX-XXXX"
      },
      warning: "Immediate Attention Required"
    }
  },
  zh: {
    title: "NeuroMind 心理评估",
    subtitle: "DSM-5-TR 心理健康筛查",
    start: "开始评估",
    next: "下一题",
    prev: "上一题",
    submit: "提交评估",
    progress: "题目",
    question: "问题",
    options: {
      0: "完全没有",
      1: "很少",
      2: "好几天",
      3: "几乎每天"
    },
    eeg: {
      status: "EEG 数据采集中（模拟）",
      description: "系统同步记录脑电活动以辅助情绪状态分析。"
    },
    result: {
      title: "评估结果",
      chartTitle: "心理健康维度评估（基于 DSM-5-TR 与 EEG 辅助）",
      reportTitle: "综合评估报告",
      riskSummary: "风险摘要",
      clinicalHints: "临床提示",
      treatment: "治疗建议",
      eegNote: "脑电辅助说明",
      retake: "重新测试",
      export: "导出报告（PDF）",
      clinicalPlaceholder: "您的抑郁和躁狂症状处于临界水平，建议进一步由精神科医生评估双相情感障碍可能性。",
      eegPlaceholder: "脑电数据显示前额叶 theta 波增强，与情绪调节困难一致。",
      dimensions: {
        depression: "抑郁",
        anger: "愤怒",
        mania: "躁狂",
        anxiety: "焦虑",
        suicidalIdeation: "自杀意念",
        sleepProblems: "睡眠问题"
      },
      levels: {
        none: "无",
        mild: "轻度",
        moderate: "中度",
        severe: "重度"
      },
      advice: {
        self: "自我调节",
        selfDesc: "规律作息、正念练习",
        pro: "专业干预",
        proDesc: "建议心理咨询（CBT）",
        emergency: "紧急情况",
        emergencyDesc: "请立即联系心理危机热线：XXX-XXXX"
      },
      warning: "需立即关注"
    }
  }
};