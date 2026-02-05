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

const quizData = [
  {
    question: "¿Cuál es el principal gas de efecto invernadero emitido por actividades humanas?",
    options: ["Oxígeno", "Dióxido de Carbono (CO₂)", "Nitrógeno", "Helio"],
    correct: 1
  },
  {
    question: "¿Qué porcentaje aproximado del calentamiento global es atribuible a la actividad humana?",
    options: ["10%", "50%", "95%", "100%"],
    correct: 2
  },
  {
    question: "¿Cuál de las siguientes NO es una fuente de energía renovable?",
    options: ["Solar", "Eólica", "Carbón", "Hidroeléctrica"],
    correct: 2
  },
  {
    question: "¿Qué acuerdo internacional busca limitar el aumento de la temperatura global?",
    options: ["Protocolo de Kioto", "Acuerdo de París", "Convención de Viena", "Tratado de Montreal"],
    correct: 1
  },
  {
    question: "¿Cuál es el objetivo principal de la mitigación del cambio climático?",
    options: [
      "Adaptarse a los cambios",
      "Reducir las emisiones de gases de efecto invernadero",
      "Aumentar la producción de energía",
      "Construir más infraestructura"
    ],
    correct: 1
  }
];

const App = () => {
  const [currentStep, setCurrentStep] = useState('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleStart = () => {
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
    const isCorrect = selectedAnswer === quizData[currentQuestion].correct;
    const newAnswers = [...answers, { question: currentQuestion, selected: selectedAnswer, correct: isCorrect }];
    setAnswers(newAnswers);

    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setCurrentStep('result');
    }
  };

  const getResultMessage = () => {
    const percentage = (score / quizData.length) * 100;
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
              Pregunta {currentQuestion + 1} de {quizData.length}
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
            value={((currentQuestion + 1) / quizData.length) * 100}
            sx={{ height: 8, borderRadius: 4 }}
          />
        </Box>

        <Card elevation={4} sx={{ p: { xs: 3, sm: 6 } }}>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom fontWeight="bold" color="primary">
              {quizData[currentQuestion].question}
            </Typography>

            <Stack spacing={2} mt={4}>
              {quizData[currentQuestion].options.map((option, index) => (
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
                {currentQuestion < quizData.length - 1 ? 'Siguiente' : 'Finalizar'}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );

  const renderResult = () => {
    const result = getResultMessage();
    const percentage = (score / quizData.length) * 100;

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
                {score} / {quizData.length}
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
                    secondary={quizData[answer.question].question}
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
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #f0f9ff, #e0f2fe)' }}>
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
  );
};

export default App;
