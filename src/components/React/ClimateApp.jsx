import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  ChevronRight,
  RotateCcw,
  Trophy,
  BookOpen,
  HelpCircle
} from 'lucide-react';

const App = () => {
  // Datos del Quiz (Basados en el documento de Molina, Sarukhán y Carabias)
  const quizData = {
    title: "Evaluación Crítica: Cambio Climático",
    questions: [
      {
        questionNumber: 1,
        question: "¿Cuál es el principal gas de efecto invernadero (GEI) que ha aumentado drásticamente debido a la quema de combustibles fósiles, según el consenso científico?",
        answerOptions: [
          { text: "Dióxido de Carbono (CO₂)", rationale: "El CO₂ es el principal motor del calentamiento global antropogénico debido a su larga permanencia en la atmósfera y el volumen de emisiones por combustibles fósiles.", isCorrect: true },
          { text: "Nitrógeno (N₂)", rationale: "El Nitrógeno compone el 78% de la atmósfera pero no tiene propiedades de gas de efecto invernadero.", isCorrect: false },
          { text: "Argón (Ar)", rationale: "El Argón es un gas noble inerte que no interactúa con la radiación infrarroja de la Tierra.", isCorrect: false },
          { text: "Oxígeno (O₂)", rationale: "El Oxígeno es vital para la vida pero sus moléculas diatómicas no absorben radiación térmica significativamente.", isCorrect: false }
        ],
        hint: "Es el producto directo de la combustión de carbón, petróleo y gas natural."
      },
      {
        questionNumber: 2,
        question: "De acuerdo con la dinámica del clima global, ¿qué porcentaje de la radiación solar entrante es aproximadamente absorbido por la superficie terrestre?",
        answerOptions: [
          { text: "Cerca del 50%", rationale: "Aproximadamente la mitad de la energía solar atraviesa la atmósfera y es absorbida por océanos y continentes.", isCorrect: true },
          { text: "El 100%", rationale: "Parte de la radiación es reflejada por las nubes (albedo) y absorbida por la propia atmósfera antes de llegar al suelo.", isCorrect: false },
          { text: "Menos del 5%", rationale: "Si solo se absorbiera el 5%, la Tierra sería un bloque de hielo incapaz de sustentar vida.", isCorrect: false },
          { text: "Exactamente el 75%", rationale: "El albedo terrestre y la absorción atmosférica impiden que una fracción tan alta llegue directamente a la superficie.", isCorrect: false }
        ],
        hint: "Piensa en el balance energético: una parte se refleja y otra se absorbe en el aire."
      },
      {
        questionNumber: 3,
        question: "¿Cuál es la función principal del Instituto Nacional de Ecología y Cambio Climático (INECC) en México?",
        answerOptions: [
          { text: "Generar investigación científica y técnica para la toma de decisiones climáticas.", rationale: "El INECC es el brazo científico que provee la evidencia necesaria para las políticas públicas ambientales en México.", isCorrect: true },
          { text: "Sancionar a empresas que contaminen el aire.", rationale: "La labor de vigilancia y sanción corresponde a la PROFEPA, no al INECC.", isCorrect: false },
          { text: "Construir parques de energía eólica directamente.", rationale: "La construcción de infraestructura es competencia de la CFE o el sector privado.", isCorrect: false },
          { text: "Administrar el presupuesto de los programas sociales.", rationale: "El INECC es un organismo técnico especializado en medio ambiente.", isCorrect: false }
        ],
        hint: "Se enfoca en la base científica de las políticas nacionales como la ENCC."
      },
      {
        questionNumber: 4,
        question: "En el contexto de la Estrategia Nacional de Cambio Climático (ENCC), ¿qué significa la 'Visión 10-20-40'?",
        answerOptions: [
          { text: "Un esquema de planeación a 10, 20 y 40 años para metas de mitigación y adaptación.", rationale: "La ENCC define horizontes temporales claros para guiar la política climática de México a corto, mediano y largo plazo.", isCorrect: true },
          { text: "La reducción del 10%, 20% y 40% del precio de la gasolina.", rationale: "La ENCC no se enfoca en el control de precios, sino en la reducción de emisiones.", isCorrect: false },
          { text: "Un código de seguridad para huracanes.", rationale: "Se refiere específicamente a la temporalidad de la planeación estratégica.", isCorrect: false },
          { text: "La cantidad de especies que México busca clonar.", rationale: "La estrategia se centra en la conservación de ecosistemas y mitigación de gases.", isCorrect: false }
        ],
        hint: "Tiene que ver con la temporalidad del compromiso de México."
      },
      {
        questionNumber: 5,
        question: "¿Qué fenómeno describe el 'Albedo' terrestre y por qué es relevante?",
        answerOptions: [
          { text: "La capacidad de reflexión de la radiación solar por superficies blancas como el hielo.", rationale: "Al derretirse el hielo, el albedo disminuye, la Tierra absorbe más calor y se acelera el calentamiento.", isCorrect: true },
          { text: "La velocidad a la que crecen los árboles.", rationale: "Eso es productividad primaria neta, no tiene relación con el término albedo.", isCorrect: false },
          { text: "El proceso de acidificación de los océanos.", rationale: "La acidificación es un cambio químico; el albedo es un fenómeno físico de reflexión.", isCorrect: false },
          { text: "La rotación de la Tierra sobre su eje.", rationale: "La rotación causa el ciclo día-noche; el albedo depende de la superficie.", isCorrect: false }
        ],
        hint: "Piensa en por qué una camiseta blanca es más fresca que una negra bajo el sol."
      }
    ]
  };

  // Estados
  const [currentStep, setCurrentStep] = useState('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);

  // Función para barajar las opciones
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Efecto para barajar opciones cuando cambia la pregunta
  useEffect(() => {
    if (currentStep === 'quiz') {
      const currentOptions = quizData.questions[currentQuestionIndex].answerOptions;
      setShuffledOptions(shuffleArray(currentOptions));
    }
  }, [currentQuestionIndex, currentStep]);

  const handleStart = () => setCurrentStep('quiz');

  const handleOptionSelect = (index) => {
    if (isAnswered) return;
    setSelectedOption(index);
  };

  const handleSubmit = () => {
    const correct = shuffledOptions[selectedOption].isCorrect;
    if (correct) setScore(score + 1);

    setUserAnswers([...userAnswers, {
      questionIndex: currentQuestionIndex,
      selectedOptionIndex: selectedOption,
      isCorrect: correct
    }]);

    setIsAnswered(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex + 1 < quizData.questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setShowHint(false);
    } else {
      setCurrentStep('result');
    }
  };

  const handleRestart = () => {
    setCurrentStep('intro');
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setUserAnswers([]);
    setShowHint(false);
  };

  const renderIntro = () => (
    <div className="text-center space-y-12 sm:space-y-16 animate-fade-in duration-500 w-full max-w-4xl mx-auto px-6 sm:px-12">
      <div className="space-y-8 sm:space-y-10">
        <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-emerald-100 to-emerald-50 text-emerald-600 rounded-3xl sm:rounded-full flex items-center justify-center mx-auto shadow-2xl ring-8 ring-white transform hover:rotate-3 transition-transform duration-500">
          <BookOpen className="w-12 h-12 sm:w-16 sm:h-16" strokeWidth={1.5} />
        </div>
        <div className="space-y-6">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight">
            {quizData.title}
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Pon a prueba tus conocimientos sobre la ciencia del cambio climático y las políticas públicas en México. ¡Ahora con opciones aleatorias para un mayor desafío!
          </p>
        </div>
      </div>

      <div className="bg-white/70 backdrop-blur-xl p-8 sm:p-12 rounded-[2.5rem] text-blue-700 flex flex-col sm:flex-row items-center sm:items-start gap-6 mx-auto text-left border border-white shadow-2xl shadow-blue-500/10 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-2 h-full bg-blue-500/50"></div>
        <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0">
          <AlertCircle className="text-blue-500" size={32} />
        </div>
        <div className="space-y-3 text-center sm:text-left">
          <p className="font-black text-slate-900 text-lg sm:text-xl uppercase tracking-tighter">Información de la Evaluación</p>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Esta evaluación consta de <strong className="text-blue-600 font-black">{quizData.questions.length} preguntas técnicas</strong>. Necesitas un <strong className="text-blue-600 font-black">80% de precisión</strong> para considerarte experto en el tema.
          </p>
        </div>
      </div>

      <div className="pt-8">
        <button
          onClick={handleStart}
          className="group relative inline-flex items-center justify-center bg-slate-900 text-white px-12 py-6 rounded-3xl font-black text-xl transition-all shadow-2xl hover:shadow-emerald-500/40 overflow-hidden active:scale-95"
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-emerald-600 to-emerald-400 opacity-100 group-hover:opacity-90 transition-opacity"></span>
          <span className="relative flex items-center gap-3">
            Comenzar Evaluación <ChevronRight className="group-hover:translate-x-2 transition-transform duration-300" size={24} />
          </span>
        </button>
      </div>
    </div>
  );

  const renderQuiz = () => {
    const q = quizData.questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / quizData.questions.length) * 100;

    return (
      <div className="w-full max-w-5xl animate-slide-in-from-right duration-500 px-6 sm:px-12">
        <div className="mb-12 sm:mb-20">
          <div className="flex justify-between items-end gap-3 mb-6 px-2">
            <div className="space-y-2">
              <span className="block text-xs font-black text-slate-400 uppercase tracking-[0.4em]">Progreso de Evaluación</span>
              <span className="text-2xl sm:text-4xl font-black text-slate-900 flex items-center gap-2">
                Pregunta {currentQuestionIndex + 1}
                <span className="text-slate-300 font-light">/</span>
                <span className="text-slate-400">{quizData.questions.length}</span>
              </span>
            </div>
            <div className="bg-emerald-500 text-white text-sm font-black px-4 py-2 rounded-2xl shadow-lg shadow-emerald-500/20">
              {Math.round(progress)}%
            </div>
          </div>
          <div className="w-full bg-slate-100 h-4 sm:h-5 rounded-full overflow-hidden shadow-inner border-4 border-white">
            <div className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-400 h-full transition-all duration-1000 ease-out rounded-full relative" style={{ width: `${progress}%` }}>
              <div className="absolute top-0 right-0 h-full w-8 bg-white/20 blur-sm"></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[3rem] p-8 sm:p-16 mb-12 shadow-2xl shadow-slate-200/60 border border-slate-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-50/50 rounded-full -mr-48 -mt-48 blur-[100px]"></div>

          <div className="relative z-10 space-y-12">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.2] tracking-tighter">
              {q.question}
            </h2>

            <div className="grid gap-5">
              {shuffledOptions.map((opt, idx) => {
                let style = "border-slate-100 bg-slate-50/30 hover:border-emerald-200 hover:bg-emerald-50/30 hover:shadow-2xl hover:shadow-emerald-500/5";
                if (selectedOption === idx) style = "border-emerald-500 bg-emerald-50/50 ring-8 ring-emerald-500/5 shadow-xl";
                if (isAnswered) {
                  if (opt.isCorrect) style = "border-emerald-500 bg-emerald-50/50 ring-8 ring-emerald-500/5 shadow-xl";
                  else if (selectedOption === idx) style = "border-red-500 bg-red-50/50 ring-8 ring-red-500/5 shadow-xl";
                  else style = "border-slate-50 opacity-30 bg-slate-50 grayscale pointer-events-none";
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleOptionSelect(idx)}
                    className={`w-full text-left p-6 sm:p-8 rounded-[2rem] border-2 transition-all duration-500 flex items-center justify-between gap-6 cursor-pointer group/opt ${style}`}
                  >
                    <div className="flex items-center gap-6">
                      <span className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center font-black text-base sm:text-lg transition-all duration-500 ${selectedOption === idx ? 'bg-emerald-600 text-white scale-110' : 'bg-white border-2 border-slate-100 text-slate-400 group-hover/opt:border-emerald-200 group-hover/opt:text-emerald-600 shadow-sm'}`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="text-lg sm:text-xl font-bold text-slate-700 leading-snug">{opt.text}</span>
                    </div>
                    {isAnswered && opt.isCorrect && <div className="bg-emerald-500 p-2 rounded-2xl shadow-lg shadow-emerald-500/30"><CheckCircle2 className="text-white shrink-0" size={24} /></div>}
                    {isAnswered && selectedOption === idx && !opt.isCorrect && <div className="bg-red-500 p-2 rounded-2xl shadow-lg shadow-red-500/30"><XCircle className="text-white shrink-0" size={24} /></div>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {isAnswered && (
          <div className="p-8 sm:p-14 bg-slate-900 text-white rounded-[3rem] border border-slate-800 animate-fade-in duration-700 mb-12 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full -mr-24 -mt-24 blur-3xl group-hover:bg-emerald-500/20 transition-colors duration-1000"></div>
            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                <p className="text-[10px] font-black uppercase tracking-[0.4em]">Fundamento Técnico</p>
              </div>
              <p className="text-lg sm:text-2xl text-slate-200 leading-relaxed font-medium italic">"{shuffledOptions[selectedOption].rationale}"</p>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row justify-between items-center gap-10 mt-16 px-4">
          <button
            onClick={() => setShowHint(!showHint)}
            className="flex items-center gap-4 text-xs font-black text-slate-400 hover:text-blue-600 transition-all uppercase tracking-widest group"
          >
            <div className="w-14 h-14 rounded-3xl border-4 border-slate-100 flex items-center justify-center group-hover:border-blue-100 group-hover:bg-blue-50 transition-all duration-300">
              <HelpCircle size={24} />
            </div>
            <div className="flex flex-col items-start translate-y-1">
              <span>¿Necesitas ayuda?</span>
              <span className="text-slate-300 group-hover:text-blue-400 uppercase tracking-[0.2em]">{showHint ? "Ocultar pista" : "Ver pista técnica"}</span>
            </div>
          </button>

          <div className="flex items-center gap-6 w-full lg:w-auto">
            {!isAnswered ? (
              <button
                disabled={selectedOption === null}
                onClick={handleSubmit}
                className="w-full lg:w-auto bg-slate-900 hover:bg-slate-800 disabled:opacity-20 disabled:cursor-not-allowed text-white px-12 py-6 rounded-[2rem] font-black transition-all text-xl shadow-2xl hover:shadow-slate-500/30 active:scale-95 border-b-8 border-slate-950"
              >
                Confirmar Selección
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="w-full lg:w-auto bg-emerald-600 hover:bg-emerald-500 text-white px-12 py-6 rounded-[2rem] font-black flex items-center justify-center gap-3 transition-all text-xl shadow-2xl shadow-emerald-500/30 active:scale-95 border-b-8 border-emerald-800"
              >
                {currentQuestionIndex + 1 === quizData.questions.length ? "Finalizar Evaluación" : "Continuar"} <ChevronRight className="group-hover:translate-x-1" size={28} />
              </button>
            )}
          </div>
        </div>

        {showHint && !isAnswered && (
          <div className="mt-12 p-8 sm:p-12 bg-blue-50/50 backdrop-blur-xl text-blue-900 rounded-[3rem] border-4 border-white italic shadow-2xl animate-fade-in relative">
            <div className="absolute -top-4 left-12 bg-blue-600 text-white text-[10px] font-black px-5 py-2 rounded-2xl uppercase tracking-widest shadow-xl shadow-blue-600/20">Sugerencia</div>
            <p className="text-xl sm:text-2xl leading-relaxed font-bold">"{q.hint}"</p>
          </div>
        )}
      </div>
    );
  };

  const renderResult = () => {
    const finalScore = (score / quizData.questions.length) * 100;
    const isPass = finalScore >= 80;

    return (
      <div className="text-center space-y-16 animate-fade-in duration-1000 w-full max-w-5xl mx-auto px-8">
        <div className="relative inline-block mt-8">
          <div className="absolute inset-0 bg-yellow-400 blur-[120px] opacity-30 rounded-full animate-pulse"></div>
          <div className="relative w-48 h-48 sm:w-72 sm:h-72 mx-auto bg-white rounded-[4rem] shadow-2xl border-8 border-white flex items-center justify-center ring-1 ring-slate-100">
            <Trophy size={160} className={isPass ? "text-yellow-500" : "text-slate-100"} strokeWidth={1} />
            <div className="absolute -bottom-6 -right-6 bg-emerald-600 text-white text-4xl sm:text-5xl font-black w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center rounded-[2.5rem] shadow-2xl ring-[12px] ring-white animate-bounce-slow">
              {score}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <h2 className="text-5xl sm:text-8xl font-black text-slate-900 leading-none tracking-tighter">
            {isPass ? "¡Éxito Total!" : "Buen Intento"}
          </h2>
          <p className="text-xl sm:text-3xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
            Completaste el análisis técnico con una precisión del <span className="text-emerald-600 font-black">{finalScore.toFixed(0)}%</span>
          </p>
          {isPass ? (
            <div className="flex items-center justify-center gap-3 bg-emerald-50 text-emerald-600 px-8 py-4 rounded-3xl border-2 border-emerald-100 w-fit mx-auto font-black text-sm tracking-widest uppercase shadow-xl shadow-emerald-500/5">
              Certificación de Nivel Experto Otorgada 🎓
            </div>
          ) : (
            <div className="flex items-center justify-center gap-3 bg-slate-100 text-slate-500 px-8 py-4 rounded-3xl border-2 border-slate-200 w-fit mx-auto font-black text-sm tracking-widest uppercase">
              Continúa Investigando 📚
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto pt-8">
          <div className="bg-white p-10 sm:p-14 rounded-[3.5rem] border border-slate-50 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500"></div>
            <p className="text-7xl font-black text-emerald-600 mb-4 group-hover:scale-110 transition-transform duration-500">{score}</p>
            <p className="text-xs text-slate-400 uppercase font-black tracking-[0.4em]">Respuestas Correctas</p>
          </div>
          <div className="bg-white p-10 sm:p-14 rounded-[3.5rem] border border-slate-50 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-2 bg-red-500"></div>
            <p className="text-7xl font-black text-red-500 mb-4 group-hover:scale-110 transition-transform duration-500">{quizData.questions.length - score}</p>
            <p className="text-xs text-slate-400 uppercase font-black tracking-[0.4em]">Puntos de Revisión</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-12">
          <button
            onClick={handleRestart}
            className="w-full sm:w-auto flex items-center justify-center gap-4 bg-slate-900 hover:bg-slate-800 text-white px-12 py-7 rounded-[2.5rem] font-black transition-all text-xl shadow-2xl active:scale-95 border-b-8 border-slate-950"
          >
            <RotateCcw size={24} /> Nueva Evaluación
          </button>
        </div>

        <div className="pt-20 border-t border-slate-100 max-w-2xl mx-auto pb-10">
          <p className="text-[10px] text-slate-300 uppercase font-black tracking-[0.4em] mb-6">Métrica de Rendimiento Final</p>
          <p className="text-base sm:text-xl text-slate-500 leading-relaxed font-medium italic">
            {isPass
              ? "Tu análisis sobre el forzamiento radiativo y los horizontes de la ENCC demuestra una comprensión sobresaliente de la crisis climática."
              : "Te sugerimos profundizar en el balance térmico de la superficie y la visión temporal de las estrategias nacionales en México."}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col items-center justify-center relative overflow-x-hidden font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-[800px] bg-gradient-to-b from-slate-50 to-transparent"></div>
      <div className="absolute -top-60 -left-60 w-[600px] h-[600px] bg-emerald-100/30 rounded-full blur-[160px]"></div>
      <div className="absolute top-1/2 -right-60 w-[500px] h-[500px] bg-blue-100/20 rounded-full blur-[160px]"></div>

      <header className="fixed top-4 left-4 right-4 sm:top-8 sm:left-12 sm:right-12 h-20 sm:h-24 flex justify-between items-center bg-white/60 backdrop-blur-3xl z-50 px-8 rounded-[2.5rem] border border-white shadow-2xl shadow-slate-200/40">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 bg-slate-900 rounded-[1.25rem] flex items-center justify-center text-white font-black text-2xl shadow-2xl shadow-slate-900/30 transform hover:scale-110 transition-transform">
            E
          </div>
          <div className="flex flex-col">
            <span className="font-black text-slate-900 tracking-tighter text-2xl leading-none italic">ECOEVALUA</span>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-1.5 opacity-60">Science & Policy</span>
          </div>
        </div>

        {currentStep === 'quiz' && (
          <div className="flex items-center gap-3 bg-emerald-500 text-white px-6 py-3 rounded-[1.5rem] shadow-2xl shadow-emerald-500/40 border border-emerald-400 group">
            <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse shadow-sm"></div>
            <span className="text-xs font-black uppercase tracking-[0.2em]">Examen Activo</span>
          </div>
        )}
      </header>

      <main className="w-full flex items-center justify-center py-40 px-4 sm:px-12 relative z-10 flex-1">
        {currentStep === 'intro' && renderIntro()}
        {currentStep === 'quiz' && renderQuiz()}
        {currentStep === 'result' && renderResult()}
      </main>

      <footer className="w-full py-12 bg-white/80 backdrop-blur-md border-t border-slate-50">
        <div className="max-w-6xl mx-auto px-12 flex flex-col sm:flex-row justify-between items-center gap-8">
          <div className="flex gap-10">
            <a href="/ingenieria-en-energia/energia-renovable/cambio-climatico/recursos" className="text-[12px] font-black text-slate-300 hover:text-slate-900 transition-all uppercase tracking-[0.3em]">Recursos</a>
            <a href="/ingenieria-en-energia/energia-renovable/cambio-climatico/glosario" className="text-[12px] font-black text-slate-300 hover:text-slate-900 transition-all uppercase tracking-[0.3em]">Glosario</a>
            <a href="/ingenieria-en-energia/energia-renovable/cambio-climatico/docs" className="text-[12px] font-black text-slate-300 hover:text-slate-900 transition-all uppercase tracking-[0.3em]">Docs</a>
          </div>
          <p className="text-[10px] font-black text-slate-900 uppercase tracking-[0.4em] flex items-center gap-3">
            <span className="w-2 h-2 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/50"></span>
            Basado en Evidencia Científica
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
