import React, { useState, useEffect } from 'react';
import { RefreshCw, ArrowRight, ArrowLeft, Check, X, BookText, Sparkles, Palette, PersonStanding, Clock, HelpCircle, Home } from 'lucide-react';

// --- 背景コンポーネント (和風デザイン) ---
const GeometricBackground = () => (
  <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, backgroundColor: '#f8fafc' }}>
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="asanoha" patternUnits="userSpaceOnUse" width="70" height="40.4" patternTransform="scale(1)">
          <path d="M17.5 0l17.5 10.1v20.2L17.5 40.4 0 30.3V10.1z" strokeWidth="1" stroke="rgba(0, 82, 155, 0.1)" fill="none"></path>
          <path d="M0 10.1h35v20.2H0z" strokeWidth="1" stroke="rgba(0, 82, 155, 0.1)" fill="none"></path>
          <path d="M17.5 0v40.4M0 20.2h70" strokeWidth="1" stroke="rgba(0, 82, 155, 0.05)" fill="none"></path>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#asanoha)" />
    </svg>
  </div>
);

// --- クイズデータ ---
const quizData = {
  noun: [
    { word: '学生', reading: 'がくせい', korean: '학생', conjugations: { present: '学生です', negative: '学生じゃありません', past: '学生でした', pastNegative: '学生じゃありませんでした' } },
    { word: '先生', reading: 'せんせい', korean: '선생님', conjugations: { present: '先生です', negative: '先生じゃありません', past: '先生でした', pastNegative: '先生じゃありませんでした' } },
    { word: '医者', reading: 'いしゃ', korean: '의사', conjugations: { present: '医者です', negative: '医者じゃありません', past: '医者でした', pastNegative: '医者じゃありませんでした' } },
    { word: '会社員', reading: 'かいしゃいん', korean: '회사원', conjugations: { present: '会社員です', negative: '会社員じゃありません', past: '会社員でした', pastNegative: '会社員じゃありませんでした' } },
    { word: '日本人', reading: 'にほんじん', korean: '일본인', conjugations: { present: '日本人です', negative: '日本人じゃありません', past: '日本人でした', pastNegative: '日本人じゃありませんでした' } },
  ],
  i_adjective: [
    { word: '大きい', reading: 'おおきい', korean: '크다', conjugations: { present: '大きいです', negative: '大きくありません', past: '大きかったです', pastNegative: '大きくありませんでした' } },
    { word: '小さい', reading: 'ちいさい', korean: '작다', conjugations: { present: '小さいです', negative: '小さくありません', past: '小さかったです', pastNegative: '小さくありませんでした' } },
    { word: '新しい', reading: 'あたらしい', korean: '새롭다', conjugations: { present: '新しいです', negative: '新しくありません', past: '新しかったです', pastNegative: '新しくありませんでした' } },
    { word: '古い', reading: 'ふるい', korean: '낡다', conjugations: { present: '古いです', negative: '古くありません', past: '古かったです', pastNegative: '古くありませんでした' } },
    { word: '良い', reading: 'いい', korean: '좋다', conjugations: { present: 'いいです', negative: 'よくありません', past: 'よかったです', pastNegative: 'よくありませんでした' } },
  ],
  na_adjective: [
    { word: 'きれい', reading: 'きれい', korean: '예쁘다/깨끗하다', conjugations: { present: 'きれいです', negative: 'きれいじゃありません', past: 'きれいでした', pastNegative: 'きれいじゃありませんでした' } },
    { word: '静か', reading: 'しずか', korean: '조용하다', conjugations: { present: '静かです', negative: '静かじゃありません', past: '静かでした', pastNegative: '静かじゃありませんでした' } },
    { word: '有名', reading: 'ゆうめい', korean: '유명하다', conjugations: { present: '有名です', negative: '有名じゃありません', past: '有名でした', pastNegative: '有名じゃありませんでした' } },
    { word: '親切', reading: 'しんせつ', korean: '친절하다', conjugations: { present: '親切です', negative: '親切じゃありません', past: '親切でした', pastNegative: '親切じゃありませんでした' } },
    { word: '元気', reading: 'げんき', korean: '건강하다/활기차다', conjugations: { present: '元気です', negative: '元気じゃありません', past: '元気でした', pastNegative: '元気じゃありませんでした' } },
  ],
  verb: [
    { word: '会う', reading: 'あう', korean: '만나다', conjugations: { present: '会います', negative: '会いません', past: '会いました', pastNegative: '会いませんでした' } },
    { word: '行く', reading: 'いく', korean: '가다', conjugations: { present: '行きます', negative: '行きません', past: '行きました', pastNegative: '行きませんでした' } },
    { word: '話す', reading: 'はなす', korean: '이야기하다', conjugations: { present: '話します', negative: '話しません', past: '話しました', pastNegative: '話しませんでした' } },
    { word: '飲む', reading: 'のむ', korean: '마시다', conjugations: { present: '飲みます', negative: '飲みません', past: '飲みました', pastNegative: '飲みませんでした' } },
    { word: '帰る', reading: 'かえる', korean: '돌아가다', conjugations: { present: '帰ります', negative: '帰りません', past: '帰りました', pastNegative: '帰りませんでした' } },
  ]
};

const posMap = { 
  noun: { label: '명사', icon: BookText, color: 'sky' }, 
  i_adjective: { label: 'い형용사', icon: Sparkles, color: 'amber' }, 
  na_adjective: { label: '나형용사', icon: Palette, color: 'violet' }, 
  verb: { label: '동사', icon: PersonStanding, color: 'rose' } 
};

const tenseOptions = [
  { key: 'present', label: '현재형' },
  { key: 'negative', label: '부정형' },
  { key: 'past', label: '과거형' },
  { key: 'pastNegative', label: '과거 부정형' },
  { key: 'random', label: '랜덤' }
];

const tenseMapKorean = { 
  present: '현재형', negative: '부정형', past: '과거형', pastNegative: '과거 부정형', random: '랜덤'
};

const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

export default function App() {
  const [step, setStep] = useState('pos_select');
  const [posType, setPosType] = useState(null);
  const [tenseType, setTenseType] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [answerHistory, setAnswerHistory] = useState([]);
  const [timer, setTimer] = useState(10);

  useEffect(() => {
    if (step === 'quiz' && !isAnswered) {
      const id = setInterval(() => setTimer(prev => (prev > 0 ? prev - 1 : 0)), 1000);
      return () => clearInterval(id);
    }
  }, [step, isAnswered, currentIndex]);

  useEffect(() => {
    if (timer === 0 && !isAnswered) {
      setIsAnswered(true);
      setSelectedAnswer(null);
    }
  }, [timer]);

  const handlePosSelect = (pos) => {
    setPosType(pos);
    setStep('tense_select');
  };

  const handleTenseSelect = (tense) => {
    setTenseType(tense);
    setupQuiz(posType, tense);
    setStep('quiz');
  };

  const setupQuiz = (pos, tense) => {
    const wordBank = quizData[pos];
    const shuffledWords = shuffleArray(wordBank);
    const availableTenses = ['present', 'negative', 'past', 'pastNegative'];

    const quizQuestions = shuffledWords.map(wordData => {
      const currentTense = tense === 'random' 
        ? availableTenses[Math.floor(Math.random() * availableTenses.length)] 
        : tense;
      
      const correctAnswer = wordData.conjugations[currentTense];
      // 誤答の選択肢を生成
      const otherForms = Object.values(wordData.conjugations).filter(f => f !== correctAnswer);
      const options = shuffleArray([correctAnswer, ...otherForms.slice(0, 2)]);
      
      return { 
        ...wordData, 
        correctAnswer, 
        options,
        targetTenseLabel: tenseMapKorean[currentTense]
      };
    }).slice(0, 10);
    
    setQuestions(quizQuestions);
    setCurrentIndex(0);
    setScore(0);
    setIsAnswered(false);
    setAnswerHistory([]);
    setTimer(10);
  };

  const handleAnswerSelect = (answer) => {
    if (isAnswered) return;
    setSelectedAnswer(answer);
    setIsAnswered(true);
    if (answer === questions[currentIndex].correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsAnswered(false);
      setSelectedAnswer(null);
      setTimer(10);
    } else {
      setStep('result');
    }
  };

  return (
    <div style={{ fontFamily: "'BIZ UDPGothic', sans-serif" }} className="min-h-screen flex items-center justify-center p-4">
      <GeometricBackground />
      
      <div className="w-full max-w-lg bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-gray-100">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-900">품사별 시제 퀴즈</h1>
          <p className="text-gray-400 text-xs mt-1 uppercase tracking-widest">Japanese Conjugation Quiz</p>
        </header>

        {step === 'pos_select' && (
          <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {Object.entries(posMap).map(([key, config]) => {
              const Icon = config.icon;
              return (
                <button key={key} onClick={() => handlePosSelect(key)} className="flex flex-col items-center p-6 bg-white border-2 border-gray-100 rounded-2xl hover:border-blue-400 hover:bg-blue-50 transition-all group">
                  <Icon className="text-blue-500 mb-2 group-hover:scale-110 transition-transform" size={32} />
                  <span className="font-bold text-gray-800">{config.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {step === 'tense_select' && (
          <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <button onClick={() => setStep('pos_select')} className="text-sm text-gray-500 mb-2 flex items-center gap-1 hover:text-blue-600 transition-colors">
              <ArrowLeft size={14}/> 품사 선택으로 돌아가기
            </button>
            {tenseOptions.map(opt => (
              <button key={opt.key} onClick={() => handleTenseSelect(opt.key)} className="py-4 bg-white border-2 border-gray-100 rounded-xl font-bold text-gray-700 hover:border-blue-500 hover:bg-blue-50 transition-all shadow-sm">
                {opt.label}
              </button>
            ))}
          </div>
        )}

        {step === 'quiz' && questions[currentIndex] && (
          <div className="animate-in fade-in duration-500">
            <div className="flex justify-between items-center mb-6">
              <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-bold">Q {currentIndex + 1} / {questions.length}</span>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-inner ${timer > 3 ? 'bg-green-500' : 'bg-red-500'}`}>
                {timer}
              </div>
            </div>
            
            <div className="text-center p-8 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 mb-8 relative overflow-hidden">
              <h2 className="text-4xl font-bold text-gray-800 mb-2">{questions[currentIndex].word}</h2>
              <p className="text-gray-500 mb-4">{questions[currentIndex].reading} ({questions[currentIndex].korean})</p>
              <div className="inline-block px-4 py-1 bg-blue-600 text-white rounded-lg font-bold shadow-md">
                「{questions[currentIndex].targetTenseLabel}」 은/는?
              </div>
            </div>

            <div className="grid gap-3">
              {questions[currentIndex].options.map((opt, i) => (
                <button 
                  key={i} 
                  disabled={isAnswered}
                  onClick={() => handleAnswerSelect(opt)}
                  className={`py-4 px-6 rounded-xl font-bold text-lg border-2 transition-all text-left flex justify-between items-center ${
                    isAnswered 
                      ? opt === questions[currentIndex].correctAnswer 
                        ? 'bg-green-50 border-green-500 text-green-700' 
                        : opt === selectedAnswer ? 'bg-red-50 border-red-500 text-red-700' : 'bg-white opacity-50'
                      : 'bg-white border-gray-100 hover:border-blue-400 hover:bg-blue-50'
                  }`}
                >
                  {opt}
                  {isAnswered && opt === questions[currentIndex].correctAnswer && <Check size={20} className="text-green-600" />}
                  {isAnswered && opt === selectedAnswer && opt !== questions[currentIndex].correctAnswer && <X size={20} className="text-red-600" />}
                </button>
              ))}
            </div>

            {isAnswered && (
              <button onClick={handleNext} className="w-full mt-8 py-4 bg-blue-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 shadow-lg active:scale-95 transition-transform">
                {currentIndex === questions.length - 1 ? '결과 보기' : '다음 문제'} <ArrowRight size={20}/>
              </button>
            )}
          </div>
        )}

        {step === 'result' && (
          <div className="text-center animate-in zoom-in duration-500">
            <div className="text-6xl mb-4">🏆</div>
            <h2 className="text-2xl font-bold mb-2">학습 완료!</h2>
            <p className="text-gray-500 mb-8">당신의 점수는 <span className="text-4xl font-bold text-blue-600">{score}</span> / {questions.length} 입니다.</p>
            
            <div className="flex flex-col gap-3">
              <button onClick={() => setupQuiz(posType, tenseType)} className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-md">
                같은 설정으로 다시 도전
              </button>
              <button onClick={resetQuiz} className="w-full py-4 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200">
                처음으로
              </button>
            </div>
          </div>
        )}
      </div>
      
      <footer className="fixed bottom-4 text-gray-400 text-xs text-center w-full">
        © 2026 Japanese Conjugation Quiz App
      </footer>
    </div>
  );
}