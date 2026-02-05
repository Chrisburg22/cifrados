import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  Stack,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Divider
} from '@mui/material';
import {
  CheckCircle,
  Cancel,
  HelpOutline,
  ChevronRight,
  Refresh,
  EmojiEvents,
  MenuBook,
  Circle
} from '@mui/icons-material';
import Footer from './Footer';

const ALL_QUIZZES = [
  // QUIZ 1: Conceptos Básicos y Atmósfera
  [
    { question: "¿Cuál es la composición aproximada de nitrógeno en la atmósfera?", options: ["21%", "78%", "0.04%", "1%"], correct: 1 },
    { question: "¿Qué gas es el principal responsable del efecto invernadero natural?", options: ["Metano", "Vapor de agua", "Argón", "Ozono"], correct: 1 },
    { question: "¿Qué científico predijo en 1895 que quemar carbón causaría calentamiento?", options: ["Charles Keeling", "Svante Arrhenius", "Mario Molina", "Isaac Newton"], correct: 1 },
    { question: "¿Qué sucede con la energía solar infrarroja al chocar con GEI?", options: ["Se escapa al espacio", "Es absorbida y reemitida hacia la superficie", "Se convierte en oxígeno", "Desaparece"], correct: 1 },
    { question: "¿Cuál es la concentración actual aproximada de CO2 (partes por millón)?", options: ["280 ppm", "400-415 ppm", "1000 ppm", "50 ppm"], correct: 1 }
  ],
  // QUIZ 2: Evidencia Científica
  [
    { question: "¿Cómo se obtienen datos del clima de hace miles de años?", options: ["Satélites antiguos", "Burbujas de aire en núcleos de hielo", "Registros escritos", "Análisis de nubes"], correct: 1 },
    { question: "¿Qué indican las mediciones de la curva de Keeling?", options: ["Descenso de CO2", "Aumento constante de CO2 en la atmósfera", "Ciclos de lluvia", "Temperatura del mar"], correct: 1 },
    { question: "¿Qué porcentaje de la energía excedente absorben los océanos?", options: ["10%", "50%", "Más del 90%", "5%"], correct: 2 },
    { question: "¿En qué década empezaron a ser evidentes los cambios globales según el texto?", options: ["1850", "1920", "1970", "2010"], correct: 2 },
    { question: "¿Qué fenómeno demuestra el calentamiento global en los polos?", options: ["Aumento de icebergs", "Reducción del hielo marino ártico", "Crecimiento de pinos", "Nieve roja"], correct: 1 }
  ],
  // QUIZ 3: Causas Antropogénicas
  [
    { question: "¿Cuál es la fuente principal de emisión de CO2 humano?", options: ["Ganadería", "Quema de combustibles fósiles", "Respiración", "Volcanes"], correct: 1 },
    { question: "¿Qué gas se libera principalmente en los vertederos y por el ganado?", options: ["CO2", "Metano (CH4)", "Nitrógeno", "CFC"], correct: 1 },
    { question: "¿Cuál es la segunda causa principal de emisiones de CO2?", options: ["Deforestación y cambio de uso de suelo", "Transporte aéreo", "Industria textil", "Pesca"], correct: 0 },
    { question: "¿Qué sector consume la mayor parte de la energía fósil?", options: ["Hogares", "Industria y generación eléctrica", "Turismo", "Educación"], correct: 1 },
    { question: "¿Qué son los CFC mencionados en el texto?", options: ["Fertilizantes", "Gases refrigerantes que dañan el ozono", "Combustibles verdes", "Abono orgánico"], correct: 1 }
  ],
  // QUIZ 4: Impactos en la Naturaleza
  [
    { question: "¿Qué le sucede a los corales con el aumento de temperatura?", options: ["Crecen más rápido", "Blanqueamiento y muerte", "Se vuelven más verdes", "Migran al norte"], correct: 1 },
    { question: "¿Por qué se acidifican los océanos?", options: ["Por el vertido de químicos", "Por la absorción de CO2 atmosférico", "Por la sal", "Por el calor"], correct: 1 },
    { question: "¿Qué efecto tiene el cambio climático en la fenología?", options: ["No afecta", "Desfase entre floración y polinizadores", "Acelera la evolución", "Crea nuevas especies"], correct: 1 },
    { question: "¿Qué tipo de ecosistemas en México son más vulnerables?", options: ["Desiertos", "Bosques de niebla y selvas", "Ciudades", "Campos de cultivo"], correct: 1 },
    { question: "¿Qué ocurre con el nivel del mar?", options: ["Baja", "Sube por expansión térmica y deshielo", "Se mantiene igual", "Solo sube en el Ártico"], correct: 1 }
  ],
  // QUIZ 5: Eventos Extremos
  [
    { question: "¿Qué relación hay entre cambio climático y huracanes?", options: ["Hay menos huracanes", "Aumenta la intensidad y fuerza de los mismos", "No hay relación", "Los detiene"], correct: 1 },
    { question: "¿Qué tipo de desastres naturales se han vuelto más frecuentes?", options: ["Terremotos", "Sequías e inundaciones extremas", "Tsunamis", "Erupciones"], correct: 1 },
    { question: "¿Por qué el aire caliente provoca lluvias más intensas?", options: ["Es más pesado", "Retiene más humedad", "Tiene más oxígeno", "Empuja las nubes"], correct: 1 },
    { question: "¿Qué región del mundo es especialmente sensible al deshielo?", options: ["Amazonas", "Groenlandia y la Antártida", "Sahara", "Australia"], correct: 1 },
    { question: "¿Qué riesgo aumenta en los bosques debido al calor extremo?", options: ["Inundaciones", "Incendios forestales", "Nieve", "Plagas de osos"], correct: 1 }
  ],
  // QUIZ 6: Economía y Sociedad
  [
    { question: "¿Qué concluyó el Informe Stern sobre el costo del cambio climático?", options: ["Es barato ignorarlo", "Es más caro no actuar que invertir ahora en soluciones", "No afecta la economía", "Solo afecta a países pobres"], correct: 1 },
    { question: "¿Cuál es un impacto social directo del cambio climático?", options: ["Mejora de la salud", "Migraciones forzadas (refugiados climáticos)", "Aumento de empleos", "Paz global"], correct: 1 },
    { question: "¿Qué sector económico es muy vulnerable por la falta de agua?", options: ["Software", "Agricultura", "Banca", "Minería de oro"], correct: 1 },
    { question: "¿Cómo afecta el cambio climático a la salud humana?", options: ["Reduce alergias", "Propagación de enfermedades tropicales (Dengue/Zika)", "No afecta", "Mejora la piel"], correct: 1 },
    { question: "¿Quiénes son los más afectados por el cambio climático?", options: ["Países desarrollados", "Poblaciones más pobres y vulnerables", "Los científicos", "Las empresas tecnológicas"], correct: 1 }
  ],
  // QUIZ 7: Mitigación y Energía
  [
    { question: "¿Qué significa 'mitigación'?", options: ["Adaptarse al calor", "Reducir las emisiones de GEI", "Limpiar el océano", "Plantar flores"], correct: 1 },
    { question: "¿Cuál es una fuente de energía baja en carbono?", options: ["Carbón", "Gas Natural", "Energía Solar", "Petróleo"], correct: 2 },
    { question: "¿Qué ventaja tiene la eficiencia energética?", options: ["Gasta más dinero", "Reduce el consumo sin perder servicios", "Es solo para ricos", "No sirve para el CO2"], correct: 1 },
    { question: "¿Cuál es un ejemplo de captura de carbono natural?", options: ["Fábricas", "Reforestación y conservación de bosques", "Quema de basura", "Pavimentación"], correct: 1 },
    { question: "¿Qué papel juega la energía nuclear según algunos científicos del texto?", options: ["Es la única opción", "Opción de baja emisión que genera debate", "Es igual al carbón", "No existe"], correct: 1 }
  ],
  // QUIZ 8: Adaptación y Resiliencia
  [
    { question: "¿Qué significa 'adaptación'?", options: ["Dejar de usar coche", "Ajustarse a los efectos climáticos inevitables", "Vivir en Marte", "Ignorar el problema"], correct: 1 },
    { question: "¿Cuál es una medida de adaptación en ciudades?", options: ["Pintar casas de negro", "Mejorar sistemas de drenaje y alertas", "Prohibir bicicletas", "Cerrar parques"], correct: 1 },
    { question: "¿Qué son los 'servicios ambientales'?", options: ["Recibos de luz", "Beneficios que la naturaleza da al humano", "Impuestos", "Programas de TV"], correct: 1 },
    { question: "¿Cómo se protege la biodiversidad ante el cambio climático?", options: ["Creando corredores biológicos", "Encerrando animales", "Poniendo aire acondicionado en bosques", "No se puede"], correct: 0 },
    { question: "¿Por qué es importante la gestión del agua en la adaptación?", options: ["Para llenar piscinas", "Para enfrentar sequías más prolongadas", "Para hacer deporte", "Para lavar coches"], correct: 1 }
  ],
  // QUIZ 9: Acuerdos Internacionales
  [
    { question: "¿Qué es un 'punto de no retorno' (tipping point)?", options: ["Un lugar en el mapa", "Un umbral que causa cambios irreversibles", "El final de la carretera", "Un centro de reciclaje"], correct: 1 },
    { question: "¿Qué se necesita para una transición energética exitosa?", options: ["Seguir con el petróleo", "Innovación tecnológica y voluntad política", "No hacer nada", "Usar más leña"], correct: 1 },
    { question: "¿Cómo puede ayudar un ciudadano común?", options: ["Consumo responsable y ahorro de energía", "Comprando más cosas", "No informándose", "Tirando basura"], correct: 0 },
    { question: "¿Qué se dice sobre la educación ambiental en el texto?", options: ["Es irrelevante", "Es fundamental para el cambio de paradigma", "Solo para niños", "Es muy difícil"], correct: 1 },
    { question: "¿Cuál es el mensaje final de los autores?", options: ["Ya es tarde", "Todavía hay tiempo de actuar si se hace pronto y juntos", "No es nuestra culpa", "La tecnología nos salvará sin esfuerzo"], correct: 1 }
  ],
  // QUIZ 10: Desafíos y Futuro (Extra - Duplicate content but keeping structure from previous read)
  [
    { question: "¿Qué es el IPCC?", options: ["Un partido político", "Panel Intergubernamental de Expertos sobre Cambio Climático", "Una empresa de energía", "Un grupo de ONGs"], correct: 1 },
    { question: "¿Qué busca el Acuerdo de París?", options: ["Bajar el precio del pan", "Mantener el aumento de temperatura bajo los 2 °C", "Promover el uso del carbón", "Colonizar la Luna"], correct: 1 },
    { question: "¿Qué principio rige a los países en las negociaciones?", options: ["Sálvese quien pueda", "Responsabilidades comunes pero diferenciadas", "El que más tiene más gana", "No hay acuerdos"], correct: 1 },
    { question: "¿Qué fue el Protocolo de Kioto?", options: ["Un plan de paz", "Primer acuerdo internacional para reducir GEI", "Un tratado de libre comercio", "Un manual de pesca"], correct: 1 },
    { question: "¿Cada cuánto se reúnen los países en las COP?", options: ["Cada 50 años", "Cada año", "Nunca", "Cada mes"], correct: 1 }
  ]
];

const App = () => {
  const [currentStep, setCurrentStep] = useState('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [activeQuizQuestions, setActiveQuizQuestions] = useState([]);

  // Fisher-Yates shuffle algorithm
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const handleStart = () => {
    // 1. Select a random quiz from ALL_QUIZZES
    const randomQuizIndex = Math.floor(Math.random() * ALL_QUIZZES.length);
    const selectedQuiz = ALL_QUIZZES[randomQuizIndex];

    // 2. Shuffle the questions within that quiz
    const shuffledQuestions = shuffleArray(selectedQuiz);

    // 3. Set state
    setActiveQuizQuestions(shuffledQuestions);
    setCurrentStep('quiz');
    setCurrentQuestion(0);
    setScore(0);
    setAnswers([]);
    setSelectedAnswer(null);
  };

  const handleAnswer = (index) => {
    setSelectedAnswer(index);
  };

  const handleNext = () => {
    const isCorrect = selectedAnswer === activeQuizQuestions[currentQuestion].correct;
    const newAnswers = [...answers, { question: currentQuestion, selected: selectedAnswer, correct: isCorrect }];
    setAnswers(newAnswers);

    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion < activeQuizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setCurrentStep('result');
    }
  };

  const getResultMessage = () => {
    const percentage = (score / activeQuizQuestions.length) * 100;
    if (percentage >= 80) return { text: "¡Excelente! Dominas el tema", color: "success" };
    if (percentage >= 60) return { text: "¡Bien hecho! Buen conocimiento", color: "info" };
    if (percentage >= 40) return { text: "Puedes mejorar, sigue aprendiendo", color: "warning" };
    return { text: "Necesitas repasar el material", color: "error" };
  };

  const renderIntro = () => (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Stack spacing={6} alignItems="center">
        <Box textAlign="center">
          <Typography variant="h2" component="h1" fontWeight="bold" color="primary" gutterBottom>
            Cambio Climático
          </Typography>
          <Typography variant="h5" color="text.secondary">
            Evaluación de Conocimientos
          </Typography>
        </Box>

        <Card elevation={3} sx={{ width: '100%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
          <CardContent sx={{ p: 4 }}>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ color: 'white' }}>
              <HelpOutline sx={{ fontSize: 40 }} />
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  ¿Sabías que...?
                </Typography>
                <Typography variant="body1">
                  El cambio climático es uno de los mayores desafíos de nuestro tiempo. Este quiz te ayudará a evaluar tu conocimiento sobre el tema.
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        <Paper elevation={2} sx={{ p: 4, width: '100%' }}>
          <Typography variant="h6" gutterBottom fontWeight="bold" color="primary">
            Instrucciones
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <CheckCircle color="success" />
              </ListItemIcon>
              <ListItemText primary="5 preguntas de opción múltiple" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircle color="success" />
              </ListItemIcon>
              <ListItemText primary="Selecciona la respuesta que consideres correcta" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircle color="success" />
              </ListItemIcon>
              <ListItemText primary="Al finalizar verás tu puntuación y retroalimentación" />
            </ListItem>
          </List>
        </Paper>

        <Button
          variant="contained"
          size="large"
          endIcon={<ChevronRight />}
          onClick={handleStart}
          sx={{
            px: 6,
            py: 2,
            fontSize: '1.1rem',
            fontWeight: 'bold',
            borderRadius: 3,
            textTransform: 'none'
          }}
        >
          Comenzar Evaluación
        </Button>
      </Stack>
    </Container>
  );

  const renderQuiz = () => (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Stack spacing={4}>
        <Box>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" color="text.secondary">
              Pregunta {currentQuestion + 1} de {activeQuizQuestions.length}
            </Typography>
            <Chip
              icon={<Circle sx={{ fontSize: 12 }} />}
              label="Examen Activo"
              color="success"
              size="small"
            />
          </Stack>
          <LinearProgress
            variant="determinate"
            value={((currentQuestion + 1) / activeQuizQuestions.length) * 100}
            sx={{ height: 8, borderRadius: 4 }}
          />
        </Box>

        <Card elevation={4} sx={{ p: { xs: 3, sm: 6 } }}>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom fontWeight="bold" color="primary">
              {activeQuizQuestions[currentQuestion].question}
            </Typography>

            <Stack spacing={2} mt={4}>
              {activeQuizQuestions[currentQuestion].options.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedAnswer === index ? "contained" : "outlined"}
                  onClick={() => handleAnswer(index)}
                  sx={{
                    justifyContent: 'flex-start',
                    textAlign: 'left',
                    p: 2.5,
                    fontSize: '1rem',
                    textTransform: 'none',
                    borderRadius: 2,
                    transition: 'all 0.2s',
                    '&:hover': {
                      transform: 'translateX(8px)'
                    }
                  }}
                  fullWidth
                >
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Chip
                      label={String.fromCharCode(65 + index)}
                      size="small"
                      color={selectedAnswer === index ? "secondary" : "default"}
                    />
                    <Typography>{option}</Typography>
                  </Stack>
                </Button>
              ))}
            </Stack>

            <Box mt={4} display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                size="large"
                endIcon={<ChevronRight />}
                onClick={handleNext}
                disabled={selectedAnswer === null}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 'bold'
                }}
              >
                {currentQuestion < activeQuizQuestions.length - 1 ? 'Siguiente' : 'Finalizar'}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );

  const renderResult = () => {
    const result = getResultMessage();
    const percentage = (score / activeQuizQuestions.length) * 100;

    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Stack spacing={4} alignItems="center">
          <EmojiEvents sx={{ fontSize: 80, color: 'primary.main' }} />

          <Typography variant="h3" component="h1" fontWeight="bold" color="primary" textAlign="center">
            ¡Evaluación Completada!
          </Typography>

          <Alert severity={result.color} sx={{ width: '100%', fontSize: '1.1rem' }}>
            <Typography variant="h6" fontWeight="bold">
              {result.text}
            </Typography>
          </Alert>

          <Card elevation={3} sx={{ width: '100%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <CardContent sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h2" fontWeight="bold" sx={{ color: 'white', mb: 1 }}>
                {score} / {activeQuizQuestions.length}
              </Typography>
              <Typography variant="h6" sx={{ color: 'white' }}>
                {percentage.toFixed(0)}% de respuestas correctas
              </Typography>
            </CardContent>
          </Card>

          <Paper elevation={2} sx={{ p: 4, width: '100%' }}>
            <Typography variant="h6" gutterBottom fontWeight="bold" color="primary">
              Revisión de Respuestas
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <List>
              {answers.map((answer, index) => (
                <ListItem key={index} sx={{ py: 1.5 }}>
                  <ListItemIcon>
                    {answer.correct ? (
                      <CheckCircle color="success" />
                    ) : (
                      <Cancel color="error" />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={`Pregunta ${index + 1}`}
                    secondary={activeQuizQuestions[answer.question].question}
                    primaryTypographyProps={{ fontWeight: 'bold' }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} width="100%">
            <Button
              variant="outlined"
              size="large"
              startIcon={<MenuBook />}
              href="/ingenieria-en-energia/energia-renovable/cambio-climatico/recursos"
              sx={{ flex: 1, py: 1.5, borderRadius: 2, textTransform: 'none', fontWeight: 'bold' }}
            >
              Ver Recursos
            </Button>
            <Button
              variant="contained"
              size="large"
              startIcon={<Refresh />}
              onClick={handleStart}
              sx={{ flex: 1, py: 1.5, borderRadius: 2, textTransform: 'none', fontWeight: 'bold' }}
            >
              Reintentar
            </Button>
          </Stack>
        </Stack>
      </Container>
    );
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'linear-gradient(to bottom, #f0f9ff, #e0f2fe)' }}>
      <Box sx={{ flex: 1 }}>
        <Box
          component="header"
          sx={{
            py: 3,
            px: { xs: 3, sm: 6 },
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Typography variant="h6" fontWeight="bold" color="primary">
            Cambio Climático
          </Typography>
          {currentStep === 'quiz' && (
            <Chip
              icon={<Circle sx={{ fontSize: 10, animation: 'pulse 2s infinite' }} />}
              label="Examen Activo"
              color="success"
              size="small"
            />
          )}
        </Box>

        <Box component="main">
          {currentStep === 'intro' && renderIntro()}
          {currentStep === 'quiz' && renderQuiz()}
          {currentStep === 'result' && renderResult()}
        </Box>

        {/* Navigation Footer */}
        <Box
          component="footer"
          sx={{
            py: 6,
            px: { xs: 3, sm: 6 },
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
            borderTop: '1px solid rgba(0, 0, 0, 0.05)'
          }}
        >
          <Container maxWidth="lg">
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              justifyContent="space-between"
              alignItems="center"
              spacing={3}
            >
              <Stack direction="row" spacing={3}>
                <Button
                  href="/ingenieria-en-energia/energia-renovable/cambio-climatico/recursos"
                  size="small"
                  sx={{ textTransform: 'uppercase', letterSpacing: 2, fontSize: '0.7rem', fontWeight: 'bold' }}
                >
                  Recursos
                </Button>
                <Button
                  href="/ingenieria-en-energia/energia-renovable/cambio-climatico/glosario"
                  size="small"
                  sx={{ textTransform: 'uppercase', letterSpacing: 2, fontSize: '0.7rem', fontWeight: 'bold' }}
                >
                  Glosario
                </Button>
                <Button
                  href="/ingenieria-en-energia/energia-renovable/cambio-climatico/docs"
                  size="small"
                  sx={{ textTransform: 'uppercase', letterSpacing: 2, fontSize: '0.7rem', fontWeight: 'bold' }}
                >
                  Docs
                </Button>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    bgcolor: 'success.main',
                    borderRadius: '50%',
                    boxShadow: '0 0 10px rgba(76, 175, 80, 0.5)'
                  }}
                />
                <Typography variant="caption" fontWeight="bold" sx={{ textTransform: 'uppercase', letterSpacing: 2 }}>
                  Basado en Evidencia Científica
                </Typography>
              </Stack>
            </Stack>
          </Container>
        </Box>
      </Box>

      {/* Developer Footer */}
      <Footer />
    </Box>
  );
};

export default App;
