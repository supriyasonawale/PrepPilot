
import { useEffect, useMemo, useRef, useState } from "react";
import { useStudy } from "../context/StudyContext";
import questions from "../data/questions";

const Practice = () => {
  const { savePerformance } = useStudy();

  // ================= VOICE RECOGNITION =================

  const recognitionRef = useRef(null);
  const [isListening, setIsListening] = useState(false);

  const [technology, setTechnology] = useState("All");
  const [category, setCategory] = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const [type, setType] = useState("All");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [confidence, setConfidence] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ================= INITIAL LOAD ================= */

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        if (!Array.isArray(questions)) {
          throw new Error("Question data could not be loaded.");
        }

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  /* ================= FILTER OPTIONS ================= */

  const technologies = [
    "All",
    ...new Set(
      questions.map((q) => q.technology).filter(Boolean)
    ),
  ];

  const categories = [
    "All",
    ...new Set(
      questions
        .filter(
          (q) =>
            technology === "All" ||
            q.technology === technology
        )
        .map((q) => q.category)
        .filter(Boolean)
    ),
  ];

  const difficulties = [
    "All",
    ...new Set(
      questions.map((q) => q.difficulty).filter(Boolean)
    ),
  ];

  const types = [
    "All",
    ...new Set(
      questions.map((q) => q.type).filter(Boolean)
    ),
  ];

  /* ================= FILTER QUESTIONS ================= */

  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      return (
        (technology === "All" ||
          q.technology === technology) &&
        (category === "All" ||
          q.category === category) &&
        (difficulty === "All" ||
          q.difficulty === difficulty) &&
        (type === "All" || q.type === type)
      );
    });
  }, [technology, category, difficulty, type]);

  const currentQuestion =
    filteredQuestions[currentIndex];

  /* ================= ANSWER CHECK ================= */

  const isCorrect =
    submitted &&
    answer.trim().toLowerCase() ===
      currentQuestion?.answer
        ?.trim()
        .toLowerCase();

  /* ================= SUBMIT ================= */

  const handleSubmit = () => {
    if (!answer.trim() || confidence === 0) return;

    // Stop voice recognition if running
    recognitionRef.current?.stop();
    recognitionRef.current = null;
    setIsListening(false);

    const correct =
      answer.trim().toLowerCase() ===
      currentQuestion.answer
        .trim()
        .toLowerCase();

    savePerformance({
      type: "Practice",
      topic: currentQuestion.category,
      technology: currentQuestion.technology,
      score: correct ? 100 : 0,
      confidence,
      date: new Date().toISOString(),
    });

    setSubmitted(true);
  };

  /* ================= VOICE INPUT ================= */

  const startVoiceInput = () => {
    if (!currentQuestion || submitted) return;

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "Voice input is not supported in this browser. Please use Google Chrome."
      );
      return;
    }

    // Stop listening
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript =
        event.results[0][0].transcript;

      setAnswer((prev) => {
        if (prev.trim()) {
          return `${prev.trim()} ${transcript}`;
        }

        return transcript;
      });
    };

    recognition.onerror = (event) => {
      console.log(
        "Speech recognition error:",
        event.error
      );

      setIsListening(false);
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
        "Speech recognition could not start."
      );

      setIsListening(false);
      recognitionRef.current = null;
    }
  };

  /* ================= STOP VOICE ON QUESTION CHANGE ================= */

  useEffect(() => {
    recognitionRef.current?.stop();
    recognitionRef.current = null;
    setIsListening(false);
  }, [currentIndex]);

  /* ================= CLEANUP ================= */

  useEffect(() => {
    return () => {
      recognitionRef.current?.stop();
    };
  }, []);

  /* ================= NEXT ================= */

  const nextQuestion = () => {
    if (
      currentIndex <
      filteredQuestions.length - 1
    ) {
      recognitionRef.current?.stop();
      recognitionRef.current = null;
      setIsListening(false);

      setCurrentIndex((prev) => prev + 1);
      setAnswer("");
      setConfidence(0);
      setSubmitted(false);
    }
  };

  /* ================= PREVIOUS ================= */

  const previousQuestion = () => {
    if (currentIndex > 0) {
      recognitionRef.current?.stop();
      recognitionRef.current = null;
      setIsListening(false);

      setCurrentIndex((prev) => prev - 1);
      setAnswer("");
      setConfidence(0);
      setSubmitted(false);
    }
  };

  /* ================= RESET ================= */

  const resetFilters = () => {
    recognitionRef.current?.stop();
    recognitionRef.current = null;
    setIsListening(false);

    setTechnology("All");
    setCategory("All");
    setDifficulty("All");
    setType("All");

    setCurrentIndex(0);
    setAnswer("");
    setConfidence(0);
    setSubmitted(false);
  };

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center">
        <div className="text-center">

          <div
            className="spinner-border text-primary mb-3"
            style={{
              width: "3rem",
              height: "3rem",
            }}
          ></div>

          <h5 className="fw-bold">
            Preparing Practice
          </h5>

          <p className="text-muted mb-0">
            Loading your questions...
          </p>

        </div>
      </div>
    );
  }

  /* ================= ERROR ================= */

  if (error) {
    return (
      <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center p-3">
        <div
          className="card border-0 shadow-sm rounded-4 text-center"
          style={{ maxWidth: "500px" }}
        >
          <div className="card-body p-5">

            <div
              className="rounded-circle bg-danger-subtle text-danger d-flex align-items-center justify-content-center mx-auto"
              style={{
                width: "70px",
                height: "70px",
              }}
            >
              <i className="bi bi-exclamation-triangle fs-2"></i>
            </div>

            <h4 className="fw-bold mt-4">
              Something went wrong
            </h4>

            <p className="text-muted">
              {error}
            </p>

            <button
              className="btn btn-primary rounded-3"
              onClick={() => window.location.reload()}
            >
              <i className="bi bi-arrow-clockwise me-2"></i>
              Try Again
            </button>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light py-4">
      <div className="container">

        {/* ================= HEADER ================= */}

        <div className="mb-4">

          <span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-2">
            <i className="bi bi-lightning-charge me-2"></i>
            Practice Mode
          </span>

          <h2 className="fw-bold mt-3 mb-1">
            Practice Questions
          </h2>

          <p className="text-muted mb-0">
            Choose your preferences and practice smarter.
          </p>

        </div>

        {/* ================= FILTERS ================= */}

        <div className="card border-0 shadow-sm rounded-4 mb-4">

          <div className="card-body p-4">

            <div className="row g-3">

              {/* Technology */}

              <div className="col-md-3">

                <label className="form-label fw-semibold">
                  Technology
                </label>

                <select
                  className="form-select rounded-3"
                  value={technology}
                  onChange={(e) => {
                    setTechnology(e.target.value);
                    setCategory("All");
                    setCurrentIndex(0);
                    setAnswer("");
                    setConfidence(0);
                    setSubmitted(false);
                  }}
                >
                  {technologies.map((item) => (
                    <option key={item}>
                      {item}
                    </option>
                  ))}
                </select>

              </div>

              {/* Category */}

              <div className="col-md-3">

                <label className="form-label fw-semibold">
                  Category
                </label>

                <select
                  className="form-select rounded-3"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setCurrentIndex(0);
                    setAnswer("");
                    setConfidence(0);
                    setSubmitted(false);
                  }}
                >
                  {categories.map((item) => (
                    <option key={item}>
                      {item}
                    </option>
                  ))}
                </select>

              </div>

              {/* Difficulty */}

              <div className="col-md-3">

                <label className="form-label fw-semibold">
                  Difficulty
                </label>

                <select
                  className="form-select rounded-3"
                  value={difficulty}
                  onChange={(e) => {
                    setDifficulty(e.target.value);
                    setCurrentIndex(0);
                    setAnswer("");
                    setConfidence(0);
                    setSubmitted(false);
                  }}
                >
                  {difficulties.map((item) => (
                    <option key={item}>
                      {item}
                    </option>
                  ))}
                </select>

              </div>

              {/* Type */}

              <div className="col-md-3">

                <label className="form-label fw-semibold">
                  Question Type
                </label>

                <select
                  className="form-select rounded-3"
                  value={type}
                  onChange={(e) => {
                    setType(e.target.value);
                    setCurrentIndex(0);
                    setAnswer("");
                    setConfidence(0);
                    setSubmitted(false);
                  }}
                >
                  {types.map((item) => (
                    <option key={item}>
                      {item}
                    </option>
                  ))}
                </select>

              </div>

              {/* Reset */}

              <div className="col-12">

                <button
                  className="btn btn-outline-secondary btn-sm rounded-3"
                  onClick={resetFilters}
                >
                  <i className="bi bi-arrow-counterclockwise me-2"></i>
                  Reset Filters
                </button>

              </div>

            </div>

          </div>

        </div>

        {/* ================= EMPTY STATE ================= */}

        {!currentQuestion ? (

          <div className="card border-0 shadow-sm rounded-4">

            <div className="card-body text-center p-5">

              <div
                className="rounded-circle bg-primary-subtle text-primary d-flex align-items-center justify-content-center mx-auto"
                style={{
                  width: "80px",
                  height: "80px",
                }}
              >
                <i className="bi bi-search fs-2"></i>
              </div>

              <h4 className="fw-bold mt-4">
                No Questions Found
              </h4>

              <p className="text-muted">
                We couldn't find questions matching
                your selected filters.
              </p>

              <button
                className="btn btn-primary rounded-3"
                onClick={resetFilters}
              >
                <i className="bi bi-arrow-counterclockwise me-2"></i>
                Reset Filters
              </button>

            </div>

          </div>

        ) : (

          <div className="row g-4">

            {/* ================= QUESTION ================= */}

            <div className="col-lg-8">

              <div className="card border-0 shadow-sm rounded-4">

                <div className="card-body p-4 p-md-5">

                  {/* Top */}

                  <div className="d-flex justify-content-between align-items-center mb-4">

                    <div className="d-flex gap-2 flex-wrap">

                      <span className="badge bg-primary-subtle text-primary px-3 py-2">
                        {currentQuestion.technology}
                      </span>

                      <span className="badge bg-secondary-subtle text-secondary px-3 py-2">
                        {currentQuestion.category}
                      </span>

                      <span className="badge bg-warning-subtle text-warning-emphasis px-3 py-2">
                        {currentQuestion.difficulty}
                      </span>

                    </div>

                    <strong className="text-muted">
                      {currentIndex + 1}/
                      {filteredQuestions.length}
                    </strong>

                  </div>

                  {/* Progress */}

                  <div
                    className="progress mb-4"
                    style={{ height: "6px" }}
                  >
                    <div
                      className="progress-bar"
                      style={{
                        width: `${
                          ((currentIndex + 1) /
                            filteredQuestions.length) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>

                  {/* Question */}

                  <h4 className="fw-bold lh-base mb-4">
                    {currentQuestion.question}
                  </h4>

                  {/* ================= MCQ ================= */}

                  {currentQuestion.options ? (

                    <div className="d-grid gap-3">

                      {currentQuestion.options.map(
                        (option, index) => {

                          const selected =
                            answer === option;

                          const correct =
                            submitted &&
                            option ===
                              currentQuestion.answer;

                          const wrong =
                            submitted &&
                            selected &&
                            !correct;

                          return (
                            <button
                              key={option}
                              type="button"
                              disabled={submitted}
                              className={`btn text-start p-3 rounded-3 ${
                                correct
                                  ? "btn-success"
                                  : wrong
                                  ? "btn-danger"
                                  : selected
                                  ? "btn-primary"
                                  : "btn-outline-secondary"
                              }`}
                              onClick={() =>
                                setAnswer(option)
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

                    /* ================= TEXT ANSWER + VOICE ================= */

                    <div className="position-relative">

                      <textarea
                        className="form-control rounded-3 pe-5"
                        rows="6"
                        disabled={submitted}
                        value={answer}
                        placeholder={
                          isListening
                            ? "Listening... speak your answer"
                            : "Write your answer or use the microphone..."
                        }
                        onChange={(e) =>
                          setAnswer(e.target.value)
                        }
                      />

                      {/* MICROPHONE BUTTON */}

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
                          width: "45px",
                          height: "45px",
                        }}
                        onClick={startVoiceInput}
                        disabled={submitted}
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

                  {/* LISTENING MESSAGE */}

                  {isListening && (
                    <div className="text-danger small mt-2">
                      <i className="bi bi-record-circle me-1"></i>
                      Listening... speak your answer
                    </div>
                  )}

                  {/* ================= CONFIDENCE ================= */}

                  <div className="mt-4">

                    <label className="fw-semibold mb-3 d-block">
                      How confident are you?
                    </label>

                    <div className="d-flex gap-2 flex-wrap">

                      {[1, 2, 3, 4, 5].map(
                        (level) => (

                          <button
                            key={level}
                            disabled={submitted}
                            className={`btn rounded-3 ${
                              confidence === level
                                ? "btn-primary"
                                : "btn-outline-primary"
                            }`}
                            onClick={() =>
                              setConfidence(level)
                            }
                          >
                            {level}
                          </button>

                        )
                      )}

                    </div>

                    <small className="text-muted d-block mt-2">
                      1 = Not confident&nbsp;&nbsp;•&nbsp;&nbsp;
                      5 = Very confident
                    </small>

                  </div>

                  {/* ================= RESULT ================= */}

                  {submitted && (

                    <div
                      className={`alert mt-4 rounded-3 ${
                        isCorrect
                          ? "alert-success"
                          : "alert-danger"
                      }`}
                    >

                      <div className="d-flex gap-3">

                        <i
                          className={`bi ${
                            isCorrect
                              ? "bi-check-circle-fill"
                              : "bi-x-circle-fill"
                          } fs-4`}
                        ></i>

                        <div>

                          <h6 className="fw-bold">
                            {isCorrect
                              ? "Correct Answer!"
                              : "Incorrect Answer"}
                          </h6>

                          {!isCorrect && (
                            <p className="mb-0">
                              Correct answer:{" "}
                              <strong>
                                {currentQuestion.answer}
                              </strong>
                            </p>
                          )}

                        </div>

                      </div>

                    </div>

                  )}

                  {/* ================= BUTTONS ================= */}

                  <div className="d-flex justify-content-between gap-3 mt-4">

                    <button
                      className="btn btn-outline-secondary rounded-3"
                      disabled={currentIndex === 0}
                      onClick={previousQuestion}
                    >
                      <i className="bi bi-arrow-left me-2"></i>
                      Previous
                    </button>

                    {!submitted ? (

                      <button
                        className="btn btn-primary rounded-3 px-4"
                        disabled={
                          !answer.trim() ||
                          confidence === 0
                        }
                        onClick={handleSubmit}
                      >
                        Check Answer
                        <i className="bi bi-check-lg ms-2"></i>
                      </button>

                    ) : (

                      <button
                        className="btn btn-success rounded-3 px-4"
                        disabled={
                          currentIndex ===
                          filteredQuestions.length - 1
                        }
                        onClick={nextQuestion}
                      >
                        Next Question
                        <i className="bi bi-arrow-right ms-2"></i>
                      </button>

                    )}

                  </div>

                </div>

              </div>

            </div>

            {/* ================= SIDEBAR ================= */}

            <div className="col-lg-4">

              <div className="card border-0 shadow-sm rounded-4">

                <div className="card-body p-4">

                  <h5 className="fw-bold mb-4">
                    <i className="bi bi-info-circle text-primary me-2"></i>
                    Practice Summary
                  </h5>

                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-muted">
                      Questions
                    </span>

                    <strong>
                      {filteredQuestions.length}
                    </strong>
                  </div>

                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-muted">
                      Current
                    </span>

                    <strong>
                      {currentIndex + 1}
                    </strong>
                  </div>

                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-muted">
                      Technology
                    </span>

                    <strong>
                      {technology}
                    </strong>
                  </div>

                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-muted">
                      Difficulty
                    </span>

                    <strong>
                      {difficulty}
                    </strong>
                  </div>

                  <div className="d-flex justify-content-between">
                    <span className="text-muted">
                      Type
                    </span>

                    <strong>
                      {type}
                    </strong>
                  </div>

                  <hr />

                  {/* Current Status */}

                  <div className="p-3 rounded-3 bg-light">

                    <div className="d-flex align-items-center gap-2">

                      <i
                        className={`bi ${
                          submitted
                            ? isCorrect
                              ? "bi-check-circle-fill text-success"
                              : "bi-x-circle-fill text-danger"
                            : "bi-hourglass-split text-warning"
                        }`}
                      ></i>

                      <span className="fw-semibold">

                        {submitted
                          ? isCorrect
                            ? "Answered Correctly"
                            : "Answer Reviewed"
                          : "Waiting for Answer"}

                      </span>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        )}

      </div>
    </div>
  );
};

export default Practice;