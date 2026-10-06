
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useStudy } from "../context/StudyContext";
import questions from "../data/questions";

const TOTAL_QUESTIONS = 10;
const THINKING_TIME = 10;

const VoiceInterview = () => {
  const { saveInterview } = useStudy();

  const recognitionRef = useRef(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const currentIndexRef = useRef(0);
  const questionsRef = useRef([]);
  const answersRef = useRef([]);

  const [step, setStep] = useState("setup");

  const [technology, setTechnology] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const [cameraOn, setCameraOn] = useState(false);
  const [cameraError, setCameraError] = useState("");

  const [interviewQuestions, setInterviewQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [answer, setAnswer] = useState("");

  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [thinkingTime, setThinkingTime] =
    useState(THINKING_TIME);

  const [answers, setAnswers] = useState([]);

  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);

  /* ================= TECHNOLOGIES ================= */

  const technologies = [
    ...new Set(
      questions
        .map((q) => q.technology)
        .filter(Boolean)
    ),
  ];

  /* ================= FILTER QUESTIONS ================= */

  const filteredQuestions = questions.filter(
    (q) =>
      q.technology === technology &&
      (difficulty === "All" ||
        q.difficulty === difficulty)
  );

  /* ================= CAMERA ================= */

  const openCamera = async () => {
    setCameraError("");

    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraError(
        "Camera is not supported in this browser."
      );
      return;
    }

    try {
      const stream =
        await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });

      streamRef.current = stream;

      setCameraOn(true);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
    } catch (error) {
      console.log("Camera error:", error);

      setCameraOn(false);

      setCameraError(
        "Camera permission is required to start the interview."
      );
    }
  };

  /* ================= CAMERA ATTACH ================= */

  useEffect(() => {
    if (videoRef.current && streamRef.current) {
      videoRef.current.srcObject =
        streamRef.current;

      videoRef.current.play().catch(() => {});
    }
  }, [cameraOn, step]);

  /* ================= SPEAK ================= */

  const speak = (text, callback) => {
    if (!window.speechSynthesis) {
      callback?.();
      return;
    }

    window.speechSynthesis.cancel();

    const speech =
      new SpeechSynthesisUtterance(text);

    speech.lang = "en-US";
    speech.rate = 0.9;
    speech.pitch = 1;

    speech.onstart = () => {
      setIsSpeaking(true);
    };

    speech.onend = () => {
      setIsSpeaking(false);

      if (callback) {
        setTimeout(callback, 300);
      }
    };

    window.speechSynthesis.speak(speech);
  };

  /* ================= START THINKING ================= */

  const startThinkingTime = () => {
    setThinkingTime(THINKING_TIME);
    setIsListening(false);
    setIsProcessing(false);

    let time = THINKING_TIME;

    const interval = setInterval(() => {
      time--;

      setThinkingTime(time);

      if (time <= 0) {
        clearInterval(interval);

        setThinkingTime(0);

        setTimeout(() => {
          startListening();
        }, 300);
      }
    }, 1000);
  };

  /* ================= START LISTENING ================= */

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "Voice recognition is not supported. Please use Google Chrome."
      );
      return;
    }

    if (isListening || isProcessing) return;

    try {
      recognitionRef.current?.stop();
    } catch {}

    const recognition =
      new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      setIsProcessing(false);
    };

    recognition.onresult = (event) => {
      const transcript =
        event.results[0][0].transcript.trim();

      if (!transcript) return;

      setAnswer(transcript);

      setIsListening(false);
      setIsProcessing(true);

      handleVoiceAnswer(transcript);
    };

    recognition.onerror = (event) => {
      console.log(
        "Speech recognition error:",
        event.error
      );

      setIsListening(false);
      setIsProcessing(false);
      recognitionRef.current = null;
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
        "Speech recognition could not start.",
        error
      );

      setIsListening(false);
      setIsProcessing(false);
    }
  };

  /* ================= HANDLE VOICE ANSWER ================= */

  const handleVoiceAnswer = (userAnswer) => {
    if (!userAnswer.trim()) {
      setIsProcessing(false);
      return;
    }

    const index = currentIndexRef.current;
    const currentQuestion =
      questionsRef.current[index];

    if (!currentQuestion) {
      setIsProcessing(false);
      return;
    }

    const correct =
      userAnswer.trim().toLowerCase() ===
      currentQuestion.answer
        ?.trim()
        .toLowerCase();

    const newAnswer = {
      question: currentQuestion.question,
      answer: userAnswer,
      correct,
      category: currentQuestion.category,
      technology: currentQuestion.technology,
    };

    const updatedAnswers = [
      ...answersRef.current,
      newAnswer,
    ];

    answersRef.current = updatedAnswers;

    setAnswers(updatedAnswers);

    /* ================= LAST QUESTION ================= */

    if (
      index ===
      questionsRef.current.length - 1
    ) {
      setTimeout(() => {
        finishInterview(updatedAnswers);
      }, 1200);

      return;
    }

    /* ================= AUTO NEXT ================= */

    setTimeout(() => {
      goToNextQuestion();
    }, 1500);
  };

  /* ================= NEXT QUESTION ================= */

  const goToNextQuestion = () => {
    recognitionRef.current?.stop();

    setIsListening(false);
    setIsProcessing(false);

    const nextIndex =
      currentIndexRef.current + 1;

    if (
      nextIndex >=
      questionsRef.current.length
    ) {
      finishInterview(answersRef.current);
      return;
    }

    currentIndexRef.current = nextIndex;

    setCurrentIndex(nextIndex);
    setAnswer("");

    setThinkingTime(THINKING_TIME);

    const nextQuestion =
      questionsRef.current[nextIndex];

    /* Speak next question */

    setTimeout(() => {
      speak(
        nextQuestion.question,
        () => {
          startThinkingTime();
        }
      );
    }, 400);
  };

  /* ================= FINISH ================= */

  const finishInterview = (finalAnswers) => {
    recognitionRef.current?.stop();
    window.speechSynthesis?.cancel();

    setIsListening(false);
    setIsProcessing(false);

    const total =
      questionsRef.current.length;

    const correctAnswers =
      finalAnswers.filter(
        (item) => item.correct
      ).length;

    const finalScore = total
      ? Math.round(
          (correctAnswers / total) * 100
        )
      : 0;

    setScore(finalScore);

    saveInterview({
      score: finalScore,
      correct: correctAnswers,
      total,
      averageConfidence: 0,

      weakTopics: finalAnswers
        .filter((item) => !item.correct)
        .map((item) => item.category)
        .filter(Boolean),

      technologies: [technology],

      duration: 0,
    });

    setFinished(true);
  };

  /* ================= START INTERVIEW ================= */

  const startInterview = () => {
    if (!cameraOn) {
      alert(
        "Please turn on the camera before starting."
      );
      return;
    }

    const selectedQuestions = [
      ...filteredQuestions,
    ]
      .sort(() => Math.random() - 0.5)
      .slice(
        0,
        Math.min(
          TOTAL_QUESTIONS,
          filteredQuestions.length
        )
      );

    if (!selectedQuestions.length) {
      alert(
        "No questions found for this selection."
      );
      return;
    }

    questionsRef.current =
      selectedQuestions;

    currentIndexRef.current = 0;

    answersRef.current = [];

    setInterviewQuestions(selectedQuestions);
    setCurrentIndex(0);
    setAnswers([]);
    setAnswer("");
    setFinished(false);
    setScore(0);
    setIsListening(false);
    setIsProcessing(false);

    setStep("interview");

    setTimeout(() => {
      speak(
        selectedQuestions[0].question,
        () => {
          startThinkingTime();
        }
      );
    }, 500);
  };

  /* ================= RESTART ================= */

  const restartInterview = () => {
    recognitionRef.current?.stop();
    window.speechSynthesis?.cancel();

    setFinished(false);
    setStep("setup");

    setCurrentIndex(0);
    currentIndexRef.current = 0;

    setAnswers([]);
    answersRef.current = [];

    setAnswer("");

    setIsListening(false);
    setIsProcessing(false);

    setThinkingTime(THINKING_TIME);
    setScore(0);
  };

  /* ================= CLEANUP ================= */

  useEffect(() => {
    return () => {
      recognitionRef.current?.stop();

      window.speechSynthesis?.cancel();

      streamRef.current
        ?.getTracks()
        .forEach((track) => track.stop());
    };
  }, []);

  /* ================= RESULT SCREEN ================= */

  if (finished) {
    return (
      <div className="min-vh-100 bg-light py-5">
        <div className="container">

          <div
            className="card border-0 shadow-sm rounded-4 mx-auto"
            style={{ maxWidth: "700px" }}
          >
            <div className="card-body p-5 text-center">

              <div
                className="rounded-circle bg-success-subtle text-success d-flex align-items-center justify-content-center mx-auto mb-4"
                style={{
                  width: "90px",
                  height: "90px",
                }}
              >
                <i className="bi bi-trophy fs-1"></i>
              </div>

              <h2 className="fw-bold">
                Voice Interview Completed!
              </h2>

              <p className="text-muted">
                Your performance has been saved.
              </p>

              <h1 className="display-3 fw-bold text-primary">
                {score}%
              </h1>

              <p className="text-muted">
                {
                  answers.filter(
                    (item) => item.correct
                  ).length
                }{" "}
                / {answers.length} correct answers
              </p>

              <div className="d-flex justify-content-center gap-3 mt-4">

                <button
                  className="btn btn-primary"
                  onClick={restartInterview}
                >
                  <i className="bi bi-arrow-repeat me-2"></i>
                  Try Again
                </button>

                <Link
                  to="/progress"
                  className="btn btn-outline-primary"
                >
                  View Progress
                </Link>

              </div>

            </div>
          </div>

        </div>
      </div>
    );
  }

  /* ================= SETUP SCREEN ================= */

  if (step === "setup") {
    return (
      <div className="min-vh-100 bg-light py-5">
        <div className="container">

          <div
            className="card border-0 shadow-sm rounded-4 mx-auto"
            style={{ maxWidth: "750px" }}
          >
            <div className="card-body p-4 p-md-5">

              <div className="text-center mb-4">

                <div
                  className="rounded-circle bg-primary-subtle text-primary d-flex align-items-center justify-content-center mx-auto mb-3"
                  style={{
                    width: "80px",
                    height: "80px",
                  }}
                >
                  <i className="bi bi-mic-fill fs-1"></i>
                </div>

                <h2 className="fw-bold">
                  Voice Interview
                </h2>

                <p className="text-muted">
                  Answer interview questions using
                  your voice.
                </p>

              </div>

              {/* TECHNOLOGY */}

              <div className="mb-4">

                <label className="form-label fw-semibold">
                  Select Technology
                </label>

                <select
                  className="form-select"
                  value={technology}
                  onChange={(e) =>
                    setTechnology(e.target.value)
                  }
                >
                  <option value="">
                    Select Technology
                  </option>

                  {technologies.map((item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  ))}
                </select>

              </div>

              {/* DIFFICULTY */}

              <div className="mb-4">

                <label className="form-label fw-semibold">
                  Select Difficulty
                </label>

                <select
                  className="form-select"
                  value={difficulty}
                  onChange={(e) =>
                    setDifficulty(e.target.value)
                  }
                >
                  <option value="">
                    Select Difficulty
                  </option>

                  <option value="All">
                    All Levels
                  </option>

                  <option value="Easy">
                    Easy
                  </option>

                  <option value="Medium">
                    Medium
                  </option>

                  <option value="Hard">
                    Hard
                  </option>
                </select>

              </div>

              {/* CAMERA */}

              <div className="mb-4">

                <label className="form-label fw-semibold">
                  Camera
                </label>

                {!cameraOn ? (

                  <div
                    className="bg-dark rounded-4 d-flex flex-column align-items-center justify-content-center"
                    style={{ height: "280px" }}
                  >

                    <i className="bi bi-camera-video-off text-white fs-1 mb-3"></i>

                    <p className="text-white mb-3">
                      Camera is required
                    </p>

                    <button
                      className="btn btn-light"
                      onClick={openCamera}
                    >
                      <i className="bi bi-camera-video me-2"></i>
                      Turn On Camera
                    </button>

                  </div>

                ) : (

                  <div className="position-relative">

                    <video
                      ref={videoRef}
                      autoPlay
                      muted
                      playsInline
                      className="w-100 rounded-4"
                      style={{
                        height: "280px",
                        objectFit: "cover",
                        background: "#111",
                      }}
                    />

                    <span className="position-absolute top-0 end-0 m-3 badge bg-success">
                      <i className="bi bi-camera-video me-1"></i>
                      Camera On
                    </span>

                  </div>

                )}

                {cameraError && (
                  <div className="alert alert-danger mt-3">
                    <i className="bi bi-exclamation-circle me-2"></i>
                    {cameraError}
                  </div>
                )}

              </div>

              <div className="alert alert-info border-0 rounded-3">

                <i className="bi bi-info-circle me-2"></i>

                Camera is required for the voice
                interview.

              </div>

              <button
                className="btn btn-primary w-100 py-3"
                disabled={
                  !technology ||
                  !difficulty ||
                  !cameraOn
                }
                onClick={startInterview}
              >
                <i className="bi bi-mic-fill me-2"></i>
                Start Voice Interview
              </button>

              <Link
                to="/interview"
                className="btn btn-outline-secondary w-100 mt-3"
              >
                Back to Interview
              </Link>

            </div>
          </div>

        </div>
      </div>
    );
  }

  /* ================= INTERVIEW SCREEN ================= */

  const currentQuestion =
    interviewQuestions[currentIndex];

  return (
    <div className="min-vh-100 bg-light py-4">

      <div className="container">

        {/* HEADER */}

        <div className="d-flex justify-content-between align-items-center mb-4">

          <div>

            <span className="badge bg-primary-subtle text-primary">
              <i className="bi bi-mic-fill me-2"></i>
              Voice Interview
            </span>

            <h3 className="fw-bold mt-2 mb-0">
              {technology} Interview
            </h3>

          </div>

          <span className="badge bg-dark fs-6 px-3 py-2">
            {currentIndex + 1}/
            {interviewQuestions.length}
          </span>

        </div>

        <div className="row g-4">

          {/* QUESTION */}

          <div className="col-lg-8">

            <div className="card border-0 shadow-sm rounded-4">

              <div className="card-body p-4 p-md-5">

                <div className="mb-4">

                  <span className="badge bg-primary-subtle text-primary me-2">
                    {currentQuestion.technology}
                  </span>

                  <span className="badge bg-warning-subtle text-warning-emphasis">
                    {currentQuestion.difficulty}
                  </span>

                </div>

                <div className="bg-light rounded-4 p-4 mb-4">

                  <small className="text-muted">
                    Interviewer:
                  </small>

                  <h4 className="fw-bold mt-2">
                    {currentQuestion.question}
                  </h4>

                  <button
                    className="btn btn-outline-primary mt-3"
                    disabled={
                      isSpeaking ||
                      isListening ||
                      isProcessing
                    }
                    onClick={() =>
                      speak(
                        currentQuestion.question
                      )
                    }
                  >
                    <i className="bi bi-volume-up me-2"></i>
                    Repeat Question
                  </button>

                </div>

                {/* THINKING TIME */}

                {thinkingTime > 0 &&
                  !isListening &&
                  !isProcessing && (
                    <div className="alert alert-info border-0 rounded-4 text-center">

                      <i className="bi bi-hourglass-split me-2"></i>

                      <strong>
                        Thinking Time: {thinkingTime}s
                      </strong>

                      <div className="small mt-1">
                        Prepare your answer...
                      </div>

                    </div>
                  )}

                {/* ANSWER */}

                <div className="position-relative">

                  <textarea
                    className="form-control pe-5"
                    rows="6"
                    value={answer}
                    readOnly
                    placeholder={
                      isListening
                        ? "Listening... speak your answer"
                        : isProcessing
                        ? "Processing your answer..."
                        : thinkingTime > 0
                        ? "Think about your answer..."
                        : "Your spoken answer will appear here..."
                    }
                  />

                  {/* MIC */}

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
                    }}
                    onClick={() => {
                      if (isListening) {
                        recognitionRef.current?.stop();
                        setIsListening(false);
                      } else if (!isProcessing) {
                        startListening();
                      }
                    }}
                    disabled={isProcessing}
                    title={
                      isListening
                        ? "Stop listening"
                        : "Start microphone"
                    }
                  >
                    <i
                      className={`bi ${
                        isListening
                          ? "bi-stop-fill"
                          : "bi-mic-fill"
                      }`}
                    ></i>
                  </button>

                </div>

                {/* LISTENING */}

                {isListening && (
                  <div className="alert alert-danger border-0 mt-3 text-center">

                    <i className="bi bi-record-circle me-2"></i>

                    <strong>
                      Listening...
                    </strong>

                    <div className="small mt-1">
                      Speak your answer clearly.
                    </div>

                  </div>
                )}

                {/* PROCESSING */}

                {isProcessing && (
                  <div className="alert alert-warning border-0 mt-3 text-center">

                    <span className="spinner-border spinner-border-sm me-2"></span>

                    Processing your answer...

                  </div>
                )}

                {/* ANSWER PREVIEW */}

                {answer && !isProcessing && (
                  <div className="alert alert-light border mt-3">

                    <strong>
                      Your answer:
                    </strong>

                    <div className="mt-2">
                      {answer}
                    </div>

                  </div>
                )}

                {/* MANUAL NEXT */}

                <div className="d-flex justify-content-center gap-3 mt-4">

                  <button
                    className="btn btn-outline-primary px-4"
                    disabled={
                      isListening ||
                      isProcessing ||
                      !answer.trim()
                    }
                    onClick={() => {
                      const currentQuestion =
                        questionsRef.current[
                          currentIndexRef.current
                        ];

                      if (!currentQuestion) return;

                      const correct =
                        answer
                          .trim()
                          .toLowerCase() ===
                        currentQuestion.answer
                          ?.trim()
                          .toLowerCase();

                      const alreadySaved =
                        answersRef.current.some(
                          (item) =>
                            item.question ===
                            currentQuestion.question
                        );

                      if (!alreadySaved) {
                        const newAnswer = {
                          question:
                            currentQuestion.question,
                          answer,
                          correct,
                          category:
                            currentQuestion.category,
                          technology:
                            currentQuestion.technology,
                        };

                        const updated = [
                          ...answersRef.current,
                          newAnswer,
                        ];

                        answersRef.current =
                          updated;

                        setAnswers(updated);
                      }

                      if (
                        currentIndexRef.current ===
                        questionsRef.current.length - 1
                      ) {
                        finishInterview(
                          answersRef.current
                        );
                      } else {
                        goToNextQuestion();
                      }
                    }}
                  >
                    <i className="bi bi-arrow-right-circle me-2"></i>
                    Next Question
                  </button>

                </div>

                <div className="text-center text-muted small mt-3">

                  <i className="bi bi-info-circle me-1"></i>

                  The next question starts automatically
                  after your answer.

                </div>

              </div>

            </div>

          </div>

          {/* CAMERA */}

          <div className="col-lg-4">

            <div className="card border-0 shadow-sm rounded-4">

              <div className="card-body p-3">

                <div className="d-flex justify-content-between align-items-center mb-3">

                  <h5 className="fw-bold mb-0">
                    <i className="bi bi-camera-video me-2"></i>
                    Your Camera
                  </h5>

                  <span className="badge bg-success">
                    LIVE
                  </span>

                </div>

                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-100 rounded-3"
                  style={{
                    height: "300px",
                    objectFit: "cover",
                    background: "#111",
                  }}
                />

                <div className="text-center small text-muted mt-2">
                  Camera is active during the interview
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default VoiceInterview;
