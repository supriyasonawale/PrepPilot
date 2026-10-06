
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useStudy } from "../context/StudyContext";
import questions from "../data/questions";

const TOTAL_QUESTIONS = 10;
const TOTAL_TIME = 15 * 60;

const Interview = () => {
  const { saveInterview } = useStudy();

  const recognitionRef = useRef(null);

  const [isListening, setIsListening] = useState(false);

  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);

  const [interviewQuestions, setInterviewQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [answers, setAnswers] = useState({});
  const [confidence, setConfidence] = useState({});
  const [submittedAnswers, setSubmittedAnswers] = useState({});

  const [result, setResult] = useState(null);

  const currentQuestion = interviewQuestions[currentIndex];

  // =========================
  // RANDOM QUESTIONS
  // =========================

  const generateQuestions = () => {
    const shuffled = [...questions].sort(
      () => Math.random() - 0.5
    );

    return shuffled.slice(
      0,
      Math.min(TOTAL_QUESTIONS, questions.length)
    );
  };

  // =========================
  // START INTERVIEW
  // =========================

  const startInterview = () => {
    recognitionRef.current?.stop();
    recognitionRef.current = null;
    setIsListening(false);

    const selectedQuestions = generateQuestions();

    setInterviewQuestions(selectedQuestions);
    setCurrentIndex(0);
    setAnswers({});
    setConfidence({});
    setSubmittedAnswers({});
    setTimeLeft(TOTAL_TIME);
    setFinished(false);
    setResult(null);
    setStarted(true);
  };

  // =========================
  // TIMER
  // =========================

  useEffect(() => {
    if (!started || finished) return;

    if (timeLeft <= 0) {
      finishInterview();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [started, finished, timeLeft]);

  // =========================
  // STOP VOICE WHEN QUESTION CHANGES
  // =========================

  useEffect(() => {
    if (!started) return;

    recognitionRef.current?.stop();
    recognitionRef.current = null;
    setIsListening(false);
  }, [currentIndex, started]);

  // =========================
  // CLEANUP
  // =========================

  useEffect(() => {
    return () => {
      recognitionRef.current?.stop();
      recognitionRef.current = null;
    };
  }, []);

  // =========================
  // FORMAT TIME
  // =========================

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      secs
    ).padStart(2, "0")}`;
  };

  // =========================
  // HANDLE ANSWER
  // =========================

  const handleAnswer = (value) => {
    if (!currentQuestion) return;

    if (submittedAnswers[currentQuestion.id]) return;

    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));
  };

  // =========================
  // HANDLE CONFIDENCE
  // =========================

  const handleConfidence = (value) => {
    if (!currentQuestion) return;

    if (submittedAnswers[currentQuestion.id]) return;

    setConfidence((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));
  };

  // =========================
  // VOICE INPUT
  // =========================

  const startVoiceInput = () => {
    if (!currentQuestion) return;

    if (submittedAnswers[currentQuestion.id]) return;

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "Voice input is not supported in this browser. Please use Google Chrome."
      );
      return;
    }

    // STOP MIC
    if (isListening) {
      recognitionRef.current?.stop();
      recognitionRef.current = null;
      setIsListening(false);
      return;
    }

    // Stop previous recognition if any
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      let transcript = "";

      for (
        let i = event.resultIndex;
        i < event.results.length;
        i++
      ) {
        transcript +=
          event.results[i][0].transcript;
      }

      transcript = transcript.trim();

      if (transcript) {
        setAnswers((prev) => ({
          ...prev,
          [currentQuestion.id]: transcript,
        }));
      }
    };

    recognition.onerror = (event) => {
      console.log(
        "Speech recognition error:",
        event.error
      );

      setIsListening(false);
      recognitionRef.current = null;

      if (event.error === "not-allowed") {
        alert(
          "Microphone permission is blocked. Please allow microphone access in Chrome."
        );
      }

      if (event.error === "no-speech") {
        console.log("No speech detected.");
      }
    };

    recognition.onend = () => {
      setIsListening(false);
      recognitionRef.current = null;
    };

    recognitionRef.current = recognition;

    try {
      recognition.start();
    } catch (error) {
      console.log(
        "Speech recognition could not start:",
        error
      );

      setIsListening(false);
      recognitionRef.current = null;
    }
  };

  // =========================
  // CHECK ANSWER
  // =========================

  const checkAnswer = () => {
    if (!currentQuestion) return;

    const userAnswer =
      answers[currentQuestion.id]
        ?.trim()
        .toLowerCase() || "";

    if (!userAnswer) return;

    // Stop microphone before checking
    recognitionRef.current?.stop();
    recognitionRef.current = null;
    setIsListening(false);

    setSubmittedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: true,
    }));
  };

  // =========================
  // CALCULATE RESULT
  // =========================

  const calculateResult = () => {
    let correct = 0;

    interviewQuestions.forEach((question) => {
      const userAnswer =
        answers[question.id]
          ?.trim()
          .toLowerCase() || "";

      const correctAnswer =
        question.answer
          ?.trim()
          .toLowerCase() || "";

      if (userAnswer === correctAnswer) {
        correct++;
      }
    });

    const total = interviewQuestions.length;

    const score = total
      ? Math.round((correct / total) * 100)
      : 0;

    const confidenceValues =
      Object.values(confidence);

    const averageConfidence =
      confidenceValues.length
        ? (
            confidenceValues.reduce(
              (sum, value) => sum + value,
              0
            ) / confidenceValues.length
          ).toFixed(1)
        : 0;

    return {
      correct,
      total,
      score,
      averageConfidence,
    };
  };

  // =========================
  // FINISH INTERVIEW
  // =========================

  const finishInterview = () => {
    if (
      finished ||
      !interviewQuestions.length
    ) {
      return;
    }

    recognitionRef.current?.stop();
    recognitionRef.current = null;
    setIsListening(false);

    const interviewResult =
      calculateResult();

    const topicResults =
      interviewQuestions.map((question) => {
        const userAnswer =
          answers[question.id]
            ?.trim()
            .toLowerCase() || "";

        const correctAnswer =
          question.answer
            ?.trim()
            .toLowerCase() || "";

        return {
          topic: question.category,
          technology: question.technology,
          correct:
            userAnswer === correctAnswer,
          score:
            userAnswer === correctAnswer
              ? 100
              : 0,
        };
      });

    const weakTopics = topicResults
      .filter((item) => !item.correct)
      .map((item) => item.topic);

    saveInterview({
      score: interviewResult.score,
      correct: interviewResult.correct,
      total: interviewResult.total,
      averageConfidence:
        interviewResult.averageConfidence,
      weakTopics,
      technologies: [
        ...new Set(
          interviewQuestions.map(
            (q) => q.technology
          )
        ),
      ],
      duration: TOTAL_TIME - timeLeft,
    });

    setResult(interviewResult);
    setFinished(true);
  };

  // =========================
  // ANSWERED COUNT
  // =========================

  const answeredCount = useMemo(() => {
    return Object.keys(submittedAnswers).length;
  }, [submittedAnswers]);

  // =========================
  // PROGRESS
  // =========================

  const progress = interviewQuestions.length
    ? Math.round(
        ((currentIndex + 1) /
          interviewQuestions.length) *
          100
      )
    : 0;

  const currentAnswer = currentQuestion
    ? answers[currentQuestion.id] || ""
    : "";

  const currentConfidence =
    currentQuestion
      ? confidence[currentQuestion.id] || 0
      : 0;

  // =========================
  // START SCREEN
  // =========================

  if (!started) {
    return (
      <div className="min-vh-100 bg-light py-5">
        <div className="container">

          <div
            className="card border-0 shadow-sm rounded-4 mx-auto"
            style={{ maxWidth: "850px" }}
          >
            <div className="card-body p-4 p-md-5 text-center">

              {/* VOICE BUTTON */}

              <div
                className="rounded-circle bg-primary-subtle text-primary d-flex align-items-center justify-content-center mx-auto mb-4"
                style={{
                  width: "80px",
                  height: "80px",
                  cursor: "pointer",
                }}
                onClick={() =>
                  (window.location.href =
                    "/voice-interview")
                }
                title="Start Voice Interview"
              >
                <i className="bi bi-mic fs-1"></i>
              </div>

              <span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-2">
                Interview Mode
              </span>

              <h1 className="fw-bold mt-3">
                Test Yourself Like a Real Interview
              </h1>

              <p className="text-muted mx-auto mb-5">
                Answer randomly selected technical
                questions, manage your time and see
                how interview-ready you are.
              </p>

              <div className="row g-3 mb-5">

                <div className="col-md-4">
                  <div className="bg-light rounded-4 p-4 h-100">
                    <i className="bi bi-question-circle text-primary fs-2"></i>

                    <h4 className="fw-bold mt-3 mb-1">
                      {TOTAL_QUESTIONS}
                    </h4>

                    <small className="text-muted">
                      Random Questions
                    </small>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="bg-light rounded-4 p-4 h-100">
                    <i className="bi bi-stopwatch text-warning fs-2"></i>

                    <h4 className="fw-bold mt-3 mb-1">
                      15 Min
                    </h4>

                    <small className="text-muted">
                      Time Limit
                    </small>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="bg-light rounded-4 p-4 h-100">
                    <i className="bi bi-graph-up-arrow text-success fs-2"></i>

                    <h4 className="fw-bold mt-3 mb-1">
                      Score
                    </h4>

                    <small className="text-muted">
                      Performance Tracking
                    </small>
                  </div>
                </div>

              </div>

              <div className="alert alert-info border-0 rounded-4 text-start">
                <i className="bi bi-lightbulb me-2"></i>
                Questions are selected randomly to make
                every interview different.
              </div>

              <button
                className="btn btn-primary btn-lg px-5 rounded-3"
                onClick={startInterview}
              >
                Start Interview
                <i className="bi bi-arrow-right ms-2"></i>
              </button>

            </div>
          </div>

        </div>
      </div>
    );
  }

  // =========================
  // RESULT SCREEN
  // =========================

  if (finished && result) {
    const getResultMessage = () => {
      if (result.score >= 80)
        return "Excellent! You are interview ready.";

      if (result.score >= 60)
        return "Good job! Keep improving your weak areas.";

      return "Keep practicing. Your performance can improve.";
    };

    return (
      <div className="min-vh-100 bg-light py-5">
        <div className="container">

          <div
            className="card border-0 shadow-sm rounded-4 mx-auto"
            style={{ maxWidth: "900px" }}
          >
            <div className="card-body p-4 p-md-5 text-center">

              <div
                className="rounded-circle bg-success-subtle text-success d-flex align-items-center justify-content-center mx-auto mb-3"
                style={{
                  width: "90px",
                  height: "90px",
                }}
              >
                <i className="bi bi-trophy fs-1"></i>
              </div>

              <h2 className="fw-bold">
                Interview Completed!
              </h2>

              <p className="text-muted mb-5">
                {getResultMessage()}
              </p>

              <div className="row g-3 mb-4">

                <div className="col-md-4">
                  <div className="bg-light rounded-4 p-4">
                    <small className="text-muted">
                      Final Score
                    </small>

                    <h1 className="fw-bold text-primary mt-2">
                      {result.score}%
                    </h1>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="bg-light rounded-4 p-4">
                    <small className="text-muted">
                      Correct Answers
                    </small>

                    <h1 className="fw-bold text-success mt-2">
                      {result.correct}/{result.total}
                    </h1>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="bg-light rounded-4 p-4">
                    <small className="text-muted">
                      Avg. Confidence
                    </small>

                    <h1 className="fw-bold text-warning mt-2">
                      {result.averageConfidence}/5
                    </h1>
                  </div>
                </div>

              </div>

              <div className="text-start mb-4">

                <div className="d-flex justify-content-between mb-2">
                  <strong>
                    Interview Performance
                  </strong>

                  <strong className="text-primary">
                    {result.score}%
                  </strong>
                </div>

                <div
                  className="progress"
                  style={{ height: "10px" }}
                >
                  <div
                    className="progress-bar"
                    style={{
                      width: `${result.score}%`,
                    }}
                  ></div>
                </div>

              </div>

              <div className="alert alert-success border-0 rounded-4 text-start">
                <i className="bi bi-check-circle me-2"></i>
                Your interview performance has been saved.
                You can view detailed analytics on the
                Progress page.
              </div>

              <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">

                <button
                  className="btn btn-primary px-4"
                  onClick={startInterview}
                >
                  <i className="bi bi-arrow-repeat me-2"></i>
                  Take Another Interview
                </button>

                <Link
                  to="/progress"
                  className="btn btn-outline-primary px-4"
                >
                  <i className="bi bi-graph-up me-2"></i>
                  View Progress
                </Link>

                <Link
                  to="/dashboard"
                  className="btn btn-outline-secondary px-4"
                >
                  <i className="bi bi-house me-2"></i>
                  Dashboard
                </Link>

              </div>

            </div>
          </div>

        </div>
      </div>
    );
  }

  // =========================
  // LOADING
  // =========================

  if (!currentQuestion) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="spinner-border text-primary"></div>
          <p className="mt-3">
            Loading questions...
          </p>
        </div>
      </div>
    );
  }

  // =========================
  // INTERVIEW SCREEN
  // =========================

  return (
    <div className="min-vh-100 bg-light py-4">

      <div className="container">

        {/* HEADER */}

        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">

          <div>

            <span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-2">
              <i className="bi bi-mic me-2"></i>
              Live Interview
            </span>

            <h3 className="fw-bold mt-2 mb-0">
              Technical Interview
            </h3>

          </div>

          <div
            className={`badge fs-6 px-4 py-3 rounded-3 ${
              timeLeft <= 60
                ? "bg-danger"
                : "bg-dark"
            }`}
          >
            <i className="bi bi-stopwatch me-2"></i>
            {formatTime(timeLeft)}
          </div>

        </div>

        {/* PROGRESS */}

        <div className="card border-0 shadow-sm rounded-4 mb-4">

          <div className="card-body p-3">

            <div className="d-flex justify-content-between mb-2">

              <small className="text-muted">
                Question {currentIndex + 1} of{" "}
                {interviewQuestions.length}
              </small>

              <small className="fw-semibold">
                {answeredCount} Answered
              </small>

            </div>

            <div
              className="progress"
              style={{ height: "7px" }}
            >
              <div
                className="progress-bar"
                style={{
                  width: `${progress}%`,
                }}
              ></div>
            </div>

          </div>

        </div>

        <div className="row g-4">

          {/* QUESTION */}

          <div className="col-lg-8">

            <div className="card border-0 shadow-sm rounded-4">

              <div className="card-body p-4 p-md-5">

                <div className="d-flex flex-wrap gap-2 mb-4">

                  <span className="badge bg-primary-subtle text-primary">
                    {currentQuestion.technology}
                  </span>

                  <span className="badge bg-secondary-subtle text-secondary">
                    {currentQuestion.category}
                  </span>

                  <span className="badge bg-warning-subtle text-warning-emphasis">
                    {currentQuestion.difficulty}
                  </span>

                  <span className="badge bg-light text-dark">
                    {currentQuestion.type}
                  </span>

                </div>

                <h4 className="fw-bold lh-base mb-4">
                  {currentQuestion.question}
                </h4>

                {/* MCQ */}

                {currentQuestion.options ? (

                  <div className="d-grid gap-3">

                    {currentQuestion.options.map(
                      (option, index) => {

                        const selected =
                          currentAnswer === option;

                        return (
                          <button
                            key={option}
                            type="button"
                            disabled={
                              submittedAnswers[
                                currentQuestion.id
                              ]
                            }
                            className={`btn text-start p-3 ${
                              selected
                                ? "btn-primary"
                                : "btn-outline-secondary"
                            }`}
                            onClick={() =>
                              handleAnswer(option)
                            }
                          >

                            <strong className="me-3">
                              {String.fromCharCode(
                                65 + index
                              )}
                            </strong>

                            {option}

                          </button>
                        );
                      }
                    )}

                  </div>

                ) : (

                  /* ================= TEXT + MIC ================= */

                  <div className="position-relative">

                    <textarea
                      className="form-control pe-5"
                      rows="6"
                      placeholder={
                        isListening
                          ? "Listening... speak your answer"
                          : "Type your answer or use the microphone..."
                      }
                      value={currentAnswer}
                      disabled={
                        submittedAnswers[
                          currentQuestion.id
                        ]
                      }
                      onChange={(e) =>
                        handleAnswer(e.target.value)
                      }
                    />

                    {/* MIC BUTTON */}

                    <button
                      type="button"
                      className={`btn ${
                        isListening
                          ? "btn-danger"
                          : "btn-primary"
                      } rounded-circle position-absolute`}
                      style={{
                        right: "12px",
                        bottom: "12px",
                        width: "48px",
                        height: "48px",
                        zIndex: 5,
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        startVoiceInput();
                      }}
                      disabled={
                        submittedAnswers[
                          currentQuestion.id
                        ]
                      }
                      title={
                        isListening
                          ? "Stop listening"
                          : "Speak your answer"
                      }
                    >

                      <i
                        className={`bi ${
                          isListening
                            ? "bi-mic-fill"
                            : "bi-mic"
                        }`}
                      ></i>

                    </button>

                  </div>
                )}

                {/* LISTENING STATUS */}

                {isListening && (
                  <div className="alert alert-danger border-0 rounded-3 mt-3 mb-0">
                    <i className="bi bi-record-circle me-2"></i>
                    <strong>Listening...</strong>{" "}
                    Speak your answer now.
                  </div>
                )}

                {/* CONFIDENCE */}

                <div className="mt-4">

                  <label className="fw-semibold mb-3 d-block">
                    How confident are you?
                  </label>

                  <div className="d-flex flex-wrap gap-2">

                    {[1, 2, 3, 4, 5].map(
                      (level) => (

                        <button
                          key={level}
                          type="button"
                          disabled={
                            submittedAnswers[
                              currentQuestion.id
                            ]
                          }
                          className={`btn ${
                            currentConfidence === level
                              ? "btn-primary"
                              : "btn-outline-primary"
                          }`}
                          onClick={() =>
                            handleConfidence(level)
                          }
                        >
                          {level}
                        </button>

                      )
                    )}

                  </div>

                  <small className="text-muted">
                    1 = Not confident • 5 = Very confident
                  </small>

                </div>

                {/* RESULT */}

                {submittedAnswers[
                  currentQuestion.id
                ] && (

                  <div
                    className={`alert ${
                      currentAnswer
                        .trim()
                        .toLowerCase() ===
                      currentQuestion.answer
                        ?.trim()
                        .toLowerCase()
                        ? "alert-success"
                        : "alert-danger"
                    } border-0 rounded-4 mt-4`}
                  >

                    {currentAnswer
                      .trim()
                      .toLowerCase() ===
                    currentQuestion.answer
                      ?.trim()
                      .toLowerCase() ? (

                      <>
                        <div className="fw-bold mb-1">
                          <i className="bi bi-check-circle-fill me-2"></i>
                          Correct Answer!
                        </div>

                        <small>
                          Your answer is correct.
                          Great job!
                        </small>
                      </>

                    ) : (

                      <>
                        <div className="fw-bold mb-2">
                          <i className="bi bi-x-circle-fill me-2"></i>
                          Incorrect Answer
                        </div>

                        <div className="mb-1">
                          <strong>
                            Your Answer:
                          </strong>
                        </div>

                        <div className="mb-3">
                          {currentAnswer}
                        </div>

                        <div className="mb-1">
                          <strong>
                            Correct Answer:
                          </strong>
                        </div>

                        <div>
                          {currentQuestion.answer}
                        </div>
                      </>
                    )}

                  </div>
                )}

                {/* NAVIGATION */}

                <div className="d-flex justify-content-between mt-5">

                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    disabled={currentIndex === 0}
                    onClick={() => {
                      recognitionRef.current?.stop();
                      setIsListening(false);

                      setCurrentIndex(
                        (prev) => prev - 1
                      );
                    }}
                  >
                    <i className="bi bi-arrow-left me-2"></i>
                    Previous
                  </button>

                  {!submittedAnswers[
                    currentQuestion.id
                  ] ? (

                    <button
                      type="button"
                      className="btn btn-primary"
                      disabled={
                        !currentAnswer.trim() ||
                        !currentConfidence
                      }
                      onClick={checkAnswer}
                    >
                      Submit Answer
                      <i className="bi bi-check-lg ms-2"></i>
                    </button>

                  ) : currentIndex <
                    interviewQuestions.length - 1 ? (

                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => {
                        recognitionRef.current?.stop();
                        setIsListening(false);

                        setCurrentIndex(
                          (prev) => prev + 1
                        );
                      }}
                    >
                      Next
                      <i className="bi bi-arrow-right ms-2"></i>
                    </button>

                  ) : (

                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={finishInterview}
                    >
                      Finish Interview
                      <i className="bi bi-flag ms-2"></i>
                    </button>

                  )}

                </div>

              </div>

            </div>

          </div>

          {/* QUESTION NAVIGATOR */}

          <div className="col-lg-4">

            <div className="card border-0 shadow-sm rounded-4">

              <div className="card-body p-4">

                <h5 className="fw-bold mb-3">
                  Question Navigator
                </h5>

                <div className="d-flex flex-wrap gap-2">

                  {interviewQuestions.map(
                    (question, index) => {

                      const answered =
                        submittedAnswers[
                          question.id
                        ];

                      return (
                        <button
                          key={question.id}
                          type="button"
                          className={`btn btn-sm ${
                            index === currentIndex
                              ? "btn-primary"
                              : answered
                              ? "btn-success"
                              : "btn-outline-secondary"
                          }`}
                          style={{
                            width: "42px",
                            height: "42px",
                          }}
                          onClick={() => {
                            recognitionRef.current?.stop();
                            setIsListening(false);

                            setCurrentIndex(index);
                          }}
                        >
                          {index + 1}
                        </button>
                      );
                    }
                  )}

                </div>

                <hr />

                <div className="small text-muted">

                  <div className="mb-2">
                    <span className="badge bg-primary me-2">
                      &nbsp;
                    </span>
                    Current
                  </div>

                  <div className="mb-2">
                    <span className="badge bg-success me-2">
                      &nbsp;
                    </span>
                    Answered
                  </div>

                  <div>
                    <span className="badge bg-light border me-2">
                      &nbsp;
                    </span>
                    Not Answered
                  </div>

                </div>

                <button
                  type="button"
                  className="btn btn-outline-danger w-100 mt-4"
                  onClick={finishInterview}
                >
                  <i className="bi bi-flag me-2"></i>
                  End Interview
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Interview;
