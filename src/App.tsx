import { useState } from 'react';
import {
  BookOpen,
  GraduationCap,
  LayoutDashboard,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
  ChevronRight,
  BookMarked,
  BrainCircuit,
  Settings2,
  MessageCircle
} from 'lucide-react';

// --- TIPOS DE DATOS ---
type Role = 'directiva' | 'supervision' | null;
type Area = 1 | 2 | 3 | null;

interface Option {
  id: string;
  text: string;
}

interface Question {
  id: number;
  area: Area;
  type: string;
  text: string;
  context?: string;
  options: Option[];
  correctId: string;
  explanation: string;
  hack: string;
}

// --- BASE DE DATOS DEMO (3 reactivos Premium - Área 1) ---
const demoQuestions: Question[] = [
  {
    id: 1,
    area: 1,
    type: 'Análisis de Casos (Ley General de Educación)',
    context:
      'Un docente se niega a adaptar sus materiales para un alumno indígena de nuevo ingreso que presenta una barrera de aprendizaje (espectro autista leve) y que tiene otra lengua materna. El docente argumenta frente al director que, por el principio de "igualdad", todos los niños deben ser tratados y evaluados exactamente de la misma forma para no discriminar al resto del grupo.',
    text: '¿Qué principio normativo está vulnerando el docente y qué acción fundamentada debe implementar el director?',
    options: [
      {
        id: 'A',
        text:
          'El principio de equidad; el director debe autorizar que el alumno sea evaluado con estándares de menor exigencia académica para evitar el rezago estadístico del grupo.'
      },
      {
        id: 'B',
        text:
          'El principio de inclusión y equidad sustantiva; el director debe instruir y asesorar al docente para realizar ajustes razonables, respetando la diversidad lingüística y cognitiva.'
      },
      {
        id: 'C',
        text:
          'El principio de interculturalidad; el director debe gestionar la transferencia inmediata del alumno a un plantel de Educación Indígena o a un CAM donde cuenten con especialistas.'
      }
    ],
    correctId: 'B',
    explanation:
      'La Ley General de Educación y el Art. 3 Constitucional establecen que la educación debe ser inclusiva, equitativa e intercultural. "Igualdad" no es enseñar lo mismo a todos, sino garantizar el acceso al aprendizaje mediante "Ajustes Razonables", sin segregar a los estudiantes de los planteles regulares.',
    hack:
      'Hack de Ruta de Ascenso IA: En reactivos de "Inclusión" y "Barreras para el Aprendizaje (BAP)", NUNCA elijas opciones que propongan bajar el nivel educativo (A) o transferir/segregar al alumno (C). La respuesta correcta siempre incluirá "Ajustes razonables" dentro del aula regular.'
  },
  {
    id: 2,
    area: 1,
    type: 'Cuestionamiento directo (Protocolos de Violencia 2025)',
    context:
      'Una alumna de secundaria acude a la dirección para relatar que un compañero de su salón le hizo tocamientos indebidos. La directora, buscando resolver el problema rápidamente, llama al alumno agresor y a los padres de ambos para "mediar" la situación, logrando que el alumno ofrezca una disculpa y firmen una carta de convivencia pacífica.',
    text:
      'De acuerdo con el Acuerdo 17/05/25 (Prevención y erradicación de la Violencia Sexual), ¿qué falta normativa grave cometió la directora?',
    options: [
      {
        id: 'A',
        text:
          'Omitió realizar una investigación exhaustiva y recabar testimonios escritos de los compañeros antes de citar a los padres del agresor.'
      },
      {
        id: 'B',
        text:
          'Faltó a la normativa al no suspender definitivamente y dar de baja al alumno agresor antes de informar a las autoridades.'
      },
      {
        id: 'C',
        text:
          'Revictimizó a la alumna al mediar el conflicto; debió brindar contención, separar preventivamente a los alumnos y notificar inmediatamente a la Procuraduría de Protección y Fiscalía.'
      }
    ],
    correctId: 'C',
    explanation:
      'El Acuerdo 17/05/25 prohíbe terminantemente la "mediación" o "conciliación" en casos de violencia sexual. La función de la escuela no es investigar el delito ni hacer careos, sino brindar contención, separar a los involucrados (medida cautelar) y hacer la Notificación y Canalización a las autoridades competentes.',
    hack:
      'Hack de Ruta de Ascenso IA: ¡Regla de oro de los Protocolos 2025! "La violencia sexual NO se media, se denuncia". Cualquier opción que sugiera llegar a acuerdos, mediar, o que la escuela "investigue" o "interrogue" en casos de abuso, es la TRAMPA. Busca siempre "Notificar a la autoridad competente".'
  },
  {
    id: 3,
    area: 1,
    type: 'Ordenamiento (Lineamientos CTE 2024)',
    context:
      'Durante la apertura de la sesión del Consejo Técnico Escolar (CTE), el supervisor instruye al colectivo docente a utilizar las 4 horas de la reunión exclusivamente para llenar unos formatos de estadística de zona, argumentando que el diseño del "Programa Analítico" lo pueden hacer los maestros individualmente en sus casas.',
    text:
      'Con base en los Lineamientos del CTE (Acuerdo 05/04/24), ¿cuál debe ser la postura del director ante esta instrucción?',
    options: [
      {
        id: 'A',
        text:
          'Dialogar con el supervisor para reorientar la sesión, recordando que el CTE es el órgano para la toma de decisiones pedagógicas y el codiseño, no para cubrir exigencias administrativas.'
      },
      {
        id: 'B',
        text:
          'Acatar la instrucción por principio de subordinación jerárquica hacia la supervisión, pero acordando que la próxima sesión sí se dedicará exclusivamente a lo pedagógico.'
      },
      {
        id: 'C',
        text:
          'Dividir al colectivo docente en dos equipos: uno dedicado a llenar la estadística administrativa y otro al diseño del Programa Analítico, optimizando los tiempos.'
      }
    ],
    correctId: 'A',
    explanation:
      'El Acuerdo 05/04/24 (Lineamientos del CTE) establece claramente que el CTE es el máximo órgano colegiado de decisión pedagógica. Las autoridades (incluyendo directores y supervisores) tienen prohibido usar este espacio para satisfacer requerimientos administrativos o carga burocrática, protegiendo así el tiempo para la reflexión y el codiseño.',
    hack:
      'Hack de Ruta de Ascenso IA: En el contexto de la Nueva Escuela Mexicana, el tiempo del CTE es sagrado. Descarta de inmediato cualquier opción que "negocie", "divida" o "justifique" el uso del CTE para llenar formatos o atender carga administrativa.'
  }
];

export default function App() {
  const [role, setRole] = useState<Role>(null);
  const [area, setArea] = useState<Area>(null);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [isDemoFinished, setIsDemoFinished] = useState(false);

  // Usamos la base de datos Demo
  const activeQuestions = demoQuestions;
  const currentQuestion = activeQuestions[currentQuestionIndex];

  // DATOS DE CONTACTO PARA VENTA
  // Cambia este número por el número real de WhatsApp.
  const numeroWhatsapp = '526182233152';
  const mensajeVenta =
    'Hola! Acabo de hacer el Demo de Ruta de Ascenso IA y me interesa adquirir la versión completa PRO con simulador ilimitado.';

  const handleRoleSelect = (selectedRole: Role) => {
    setRole(selectedRole);
  };

  const handleAreaSelect = (selectedArea: Area) => {
    setArea(selectedArea);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
    setIsDemoFinished(false);
  };

  const handleAnswer = (optionId: string) => {
    if (showFeedback || !currentQuestion) return;

    setSelectedAnswer(optionId);
    setShowFeedback(true);

    if (optionId === currentQuestion.correctId) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex === activeQuestions.length - 1) {
      setIsDemoFinished(true);
    } else {
      setSelectedAnswer(null);
      setShowFeedback(false);
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const resetTutor = () => {
    setRole(null);
    setArea(null);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
    setIsDemoFinished(false);
  };

  // --- PANTALLAS CONDICIONALES ---

  if (!role) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 font-sans text-slate-800">
        <div className="max-w-3xl w-full relative">
          <div className="absolute top-0 right-0 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
            VERSIÓN DEMO
          </div>

          <div className="text-center mb-12 mt-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 mb-6 shadow-sm">
              <BrainCircuit size={32} />
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-slate-900">
              Ruta de <span className="text-emerald-600">Ascenso</span> IA
            </h1>

            <p className="text-lg text-slate-500 max-w-xl mx-auto">
              Descubre la plataforma de preparación estratégica para procesos de promoción vertical 2026-2027.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <button
              onClick={() => handleRoleSelect('directiva')}
              className="group flex flex-col items-start p-8 bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-emerald-500 hover:shadow-[0_8px_30px_rgb(16,185,129,0.12)] transition-all duration-300 text-left relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-[100px] -z-10 transition-transform group-hover:scale-110"></div>

              <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center mb-6 transition-colors">
                <LayoutDashboard className="text-emerald-600" />
              </div>

              <h2 className="text-2xl font-bold mb-2">Función Directiva</h2>

              <p className="text-slate-500 mb-6 flex-grow">
                Gestión escolar, liderazgo pedagógico, normatividad y vinculación. Demo disponible.
              </p>

              <div className="flex items-center text-sm font-semibold text-emerald-600 mt-auto">
                Iniciar Demo{' '}
                <ArrowRight
                  size={16}
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                />
              </div>
            </button>

            <button
              type="button"
              className="group flex flex-col items-start p-8 bg-slate-50 rounded-[2rem] border border-slate-200 text-left opacity-75 cursor-not-allowed"
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-200 flex items-center justify-center mb-6">
                <GraduationCap className="text-slate-400" />
              </div>

              <h2 className="text-2xl font-bold mb-2 text-slate-400">
                Función Supervisión
              </h2>

              <p className="text-slate-400 mb-6 flex-grow">
                Exclusivo de la versión PRO. Desbloquea esta función adquiriendo el sistema completo.
              </p>

              <div className="flex items-center text-sm font-semibold text-slate-400 mt-auto">
                Bloqueado <LockIcon className="ml-2" size={16} />
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!area) {
    return (
      <div className="min-h-screen bg-slate-50 p-6 lg:p-12 font-sans text-slate-800 flex flex-col items-center">
        <div className="w-full max-w-5xl">
          <button
            onClick={resetTutor}
            className="flex items-center text-slate-400 hover:text-slate-700 mb-8 font-medium transition-colors"
          >
            <ChevronRight className="rotate-180 mr-1" size={20} /> Volver
          </button>

          <div className="mb-10">
            <h2 className="text-sm font-bold tracking-widest text-emerald-600 uppercase mb-2">
              Aspirante a Directivo
            </h2>

            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
              Selecciona el módulo Demo
            </h1>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <button
              onClick={() => handleAreaSelect(1)}
              className="group p-8 bg-white rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-emerald-400 hover:shadow-[0_8px_30px_rgb(16,185,129,0.08)] transition-all duration-300 text-left flex flex-col h-full"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center mb-5">
                <BookMarked className="text-emerald-600" size={20} />
              </div>

              <h3 className="text-xl font-bold mb-3">
                Área 1:
                <br />
                Aspectos Normativos
              </h3>

              <p className="text-slate-500 text-sm mb-6 flex-grow">
                Constitución, LGE, Protocolos 2025 y Acuerdos de convivencia.
              </p>

              <div className="flex items-center justify-between w-full mt-auto">
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                  3 Reactivos Premium
                </span>

                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ArrowRight size={16} />
                </div>
              </div>
            </button>

            {[
              {
                id: 2,
                title: 'Gestión Escolar',
                desc: 'Supervisión (Zorrilla), CTE, Mejora Continua y Liderazgo.',
                icon: Settings2
              },
              {
                id: 3,
                title: 'Vínculo con la Comunidad',
                desc: 'Entornos Seguros, Vida Saludable Comunitaria y Cultura de Paz.',
                icon: BookOpen
              }
            ].map(item => (
              <button
                key={item.id}
                type="button"
                className="group p-8 bg-slate-50 rounded-[2rem] border border-slate-200 text-left flex flex-col h-full opacity-70 cursor-not-allowed"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-200 flex items-center justify-center mb-5">
                  <item.icon className="text-slate-400" size={20} />
                </div>

                <h3 className="text-xl font-bold mb-3 text-slate-400">
                  Área {item.id}:
                  <br />
                  {item.title}
                </h3>

                <p className="text-slate-400 text-sm mb-6 flex-grow">
                  {item.desc}
                </p>

                <div className="flex items-center text-xs font-bold text-slate-400 bg-slate-200 px-2 py-1 rounded mt-auto w-fit">
                  <LockIcon size={12} className="mr-1" /> Versión PRO
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isDemoFinished) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 font-sans">
        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl text-center max-w-2xl w-full border border-slate-100">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6">
            <Sparkles size={40} />
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            ¡Demo Completada!
          </h2>

          <p className="text-lg text-slate-500 mb-8">
            Has experimentado la metodología basada en hacks, casos prácticos y retroalimentación estratégica.
          </p>

          <div className="bg-slate-50 rounded-3xl p-6 mb-8 border border-slate-200">
            <div className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-2">
              Tu resultado del Demo
            </div>

            <div className="text-5xl font-black text-emerald-600">
              {score}/3
            </div>
          </div>

          <div className="bg-emerald-50 rounded-3xl p-8 mb-8 border border-emerald-100 text-left">
            <h3 className="font-bold text-emerald-900 mb-3 text-lg">
              ¿Listo para seguir preparándote?
            </h3>

            <ul className="space-y-3 text-emerald-800 text-sm mb-6">
              <li className="flex items-start">
                <CheckCircle2
                  size={18}
                  className="mr-2 text-emerald-600 shrink-0"
                />
                <span>
                  Simulador <strong>ilimitado</strong> impulsado por Inteligencia Artificial.
                </span>
              </li>

              <li className="flex items-start">
                <CheckCircle2
                  size={18}
                  className="mr-2 text-emerald-600 shrink-0"
                />
                <span>
                  Desbloqueo de las <strong>3 áreas</strong>: Normativa, Gestión y Comunidad.
                </span>
              </li>

              <li className="flex items-start">
                <CheckCircle2
                  size={18}
                  className="mr-2 text-emerald-600 shrink-0"
                />
                <span>
                  Funciones Directivas y de Supervisión completas.
                </span>
              </li>

              <li className="flex items-start">
                <CheckCircle2
                  size={18}
                  className="mr-2 text-emerald-600 shrink-0"
                />
                <span>
                  Bibliografía actualizada a <strong>2026-2027</strong>.
                </span>
              </li>
            </ul>

            <p className="font-semibold text-center text-slate-700 mb-6">
              Pide informes y adquiere tu acceso:
            </p>

            <div className="flex justify-center">
              <a
                href={`https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(
                  mensajeVenta
                )}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center py-4 px-10 bg-[#25D366] hover:bg-[#1ebd5a] text-white rounded-2xl font-bold transition-transform hover:scale-105 shadow-xl shadow-green-200/50 text-lg w-full sm:w-auto"
              >
                <MessageCircle className="mr-3" size={24} /> Enviar WhatsApp
              </a>
            </div>
          </div>

          <button
            onClick={resetTutor}
            className="text-slate-400 hover:text-slate-600 text-sm font-medium transition-colors"
          >
            Volver al inicio del Demo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-800 flex justify-center">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white p-6 rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setArea(null)}
                className="flex items-center text-sm font-semibold text-slate-400 hover:text-emerald-600 transition-colors"
              >
                <ChevronRight className="rotate-180 mr-1" size={16} /> Salir
              </button>

              <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide">
                Demo
              </span>
            </div>

            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider rounded-lg">
                Área {currentQuestion.area}
              </span>
            </div>

            <h3 className="text-xl font-bold text-slate-900">
              Aspectos Normativos
            </h3>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <div className="flex justify-between text-sm font-medium mb-2">
                <span className="text-slate-500">Reactivos Demo</span>
                <span className="text-emerald-600">
                  {currentQuestionIndex + 1} de {activeQuestions.length}
                </span>
              </div>

              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 transition-all duration-500 ease-out"
                  style={{
                    width: `${((currentQuestionIndex + 1) / activeQuestions.length) * 100}%`
                  }}
                ></div>
              </div>
            </div>
          </div>

          <div
            className={`bg-slate-900 rounded-[2rem] p-6 text-white shadow-xl transition-all duration-500 ${
              showFeedback ? 'opacity-100 translate-y-0' : 'opacity-50 grayscale'
            }`}
          >
            <div className="flex items-center mb-4">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                  showFeedback ? 'bg-emerald-500' : 'bg-slate-700'
                }`}
              >
                <BrainCircuit size={20} className="text-white" />
              </div>

              <div>
                <h4 className="font-bold text-sm">Ruta de Ascenso IA</h4>
                <p className="text-xs text-slate-400">
                  {showFeedback ? 'Análisis completado' : 'Esperando tu respuesta...'}
                </p>
              </div>
            </div>

            {showFeedback ? (
              <div className="space-y-4 animate-fade-in">
                <p className="text-sm text-slate-200 leading-relaxed bg-slate-800/50 p-4 rounded-2xl">
                  <strong className="text-white block mb-1">
                    Fundamento Legal:
                  </strong>
                  <br />
                  {currentQuestion.explanation}
                </p>

                <div className="bg-emerald-900/40 border border-emerald-500/30 p-4 rounded-2xl">
                  <strong className="text-emerald-400 flex items-center mb-2 text-sm">
                    <Sparkles size={14} className="mr-1" /> Hack para el examen:
                  </strong>

                  <p className="text-sm text-emerald-50 leading-relaxed">
                    {currentQuestion.hack}
                  </p>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center text-slate-500 text-sm border border-dashed border-slate-700 rounded-2xl">
                Selecciona una respuesta para desbloquear el hack estratégico de este reactivo.
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-8">
          <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 min-h-full flex flex-col relative">
            <div className="mb-8">
              <span className="inline-block px-3 py-1 bg-slate-100 text-slate-500 text-xs font-bold rounded-lg mb-4">
                Formato: {currentQuestion.type}
              </span>

              {currentQuestion.context && (
                <div className="bg-slate-50 p-6 rounded-2xl mb-6 text-slate-700 leading-relaxed border-l-4 border-emerald-500">
                  {currentQuestion.context}
                </div>
              )}

              <h2 className="text-xl md:text-2xl font-semibold text-slate-900 leading-snug whitespace-pre-line">
                {currentQuestion.text}
              </h2>
            </div>

            <div className="space-y-4 mb-8 flex-grow">
              {currentQuestion.options.map(option => {
                const isSelected = selectedAnswer === option.id;
                const isCorrect = option.id === currentQuestion.correctId;

                let buttonStyle =
                  'border-slate-200 bg-white hover:border-emerald-400 hover:bg-emerald-50/30 text-slate-700';
                let icon = null;

                if (showFeedback) {
                  if (isCorrect) {
                    buttonStyle =
                      'border-emerald-500 bg-emerald-50 text-emerald-900 shadow-[0_0_0_1px_#10b981]';
                    icon = (
                      <CheckCircle2
                        className="text-emerald-500 ml-auto shrink-0"
                        size={24}
                      />
                    );
                  } else if (isSelected && !isCorrect) {
                    buttonStyle = 'border-red-300 bg-red-50 text-red-900';
                    icon = (
                      <XCircle
                        className="text-red-400 ml-auto shrink-0"
                        size={24}
                      />
                    );
                  } else {
                    buttonStyle =
                      'border-slate-100 bg-slate-50/50 text-slate-400 opacity-60';
                  }
                } else if (isSelected) {
                  buttonStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900';
                }

                return (
                  <button
                    key={option.id}
                    onClick={() => handleAnswer(option.id)}
                    disabled={showFeedback}
                    className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-300 flex items-center group ${buttonStyle}`}
                  >
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4 shrink-0 transition-colors ${
                        showFeedback && isCorrect
                          ? 'bg-emerald-200 text-emerald-800'
                          : showFeedback && isSelected && !isCorrect
                            ? 'bg-red-200 text-red-800'
                            : isSelected
                              ? 'bg-emerald-500 text-white'
                              : 'bg-slate-100 text-slate-500 group-hover:bg-emerald-100 group-hover:text-emerald-700'
                      }`}
                    >
                      {option.id}
                    </span>

                    <span className="text-base font-medium pr-4 leading-relaxed">
                      {option.text}
                    </span>

                    {icon}
                  </button>
                );
              })}
            </div>

            {showFeedback && (
              <div className="pt-6 border-t border-slate-100 flex justify-end animate-fade-in">
                <button
                  onClick={nextQuestion}
                  className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl flex items-center shadow-lg shadow-emerald-200 transition-all active:scale-95"
                >
                  {currentQuestionIndex === activeQuestions.length - 1
                    ? 'Finalizar Demo'
                    : 'Siguiente Reactivo'}

                  <ArrowRight className="ml-2" size={20} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Icono candado simple para el UI bloqueado
function LockIcon(props: { size?: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
  );
}