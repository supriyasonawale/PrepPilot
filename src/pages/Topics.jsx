
import { Link } from "react-router-dom";
import { useStudy } from "../context/StudyContext";
import questions from "../data/questions";

const Topics = () => {
  const { performance } = useStudy();

  const technologies = [
    ...new Set(
      questions
        .map((q) => q.technology)
        .filter(Boolean)
    ),
  ];

  const getTopicStats = (technology) => {
    const topicQuestions = questions.filter(
      (q) => q.technology === technology
    );

    const attempts = performance.filter(
      (item) => item.technology === technology
    );

    const solved = attempts.length;

    const accuracy = attempts.length
      ? Math.round(
          attempts.reduce(
            (sum, item) => sum + (item.score || 0),
            0
          ) / attempts.length
        )
      : 0;

    const progress = topicQuestions.length
      ? Math.min(
          Math.round(
            (Math.min(solved, topicQuestions.length) /
              topicQuestions.length) *
              100
          ),
          100
        )
      : 0;

    return {
      total: topicQuestions.length,
      solved,
      accuracy,
      progress,
    };
  };

  return (
    <div className="min-vh-100 bg-light py-4">

      <div className="container">

        {/* ================= HEADER ================= */}

        <div className="mb-4">

          <span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-2">
            <i className="bi bi-book me-2"></i>
            Learning Topics
          </span>

          <h2 className="fw-bold mt-3 mb-1">
            Explore Topics
          </h2>

          <p className="text-muted mb-0">
            Choose a technology and build your interview confidence.
          </p>

        </div>

        {/* ================= EMPTY STATE ================= */}

        {technologies.length === 0 ? (

          <div className="card border-0 shadow-sm rounded-4">

            <div className="card-body text-center p-5">

              <div
                className="rounded-circle bg-primary-subtle text-primary d-flex align-items-center justify-content-center mx-auto"
                style={{
                  width: "80px",
                  height: "80px",
                }}
              >
                <i className="bi bi-journal-x fs-2"></i>
              </div>

              <h4 className="fw-bold mt-4">
                No Topics Available
              </h4>

              <p className="text-muted mb-4">
                Questions will appear here once your question
                bank is available.
              </p>

              <Link
                to="/practice"
                className="btn btn-primary rounded-3"
              >
                Go to Practice
                <i className="bi bi-arrow-right ms-2"></i>
              </Link>

            </div>

          </div>

        ) : (

          /* ================= TOPICS ================= */

          <div className="row g-4">

            {technologies.map((technology) => {

              const stats = getTopicStats(technology);

              return (
                <div
                  className="col-md-6 col-lg-4"
                  key={technology}
                >

                  <div
                    className="card border-0 shadow-sm rounded-4 h-100 topic-card"
                    style={{
                      transition: "all 0.25s ease",
                    }}
                  >

                    <div className="card-body p-4 d-flex flex-column">

                      {/* TOP */}

                      <div className="d-flex justify-content-between align-items-start mb-3">

                        <div
                          className="rounded-4 text-primary d-flex align-items-center justify-content-center"
                          style={{
                            width: "54px",
                            height: "54px",
                            background:
                              "linear-gradient(135deg,#e8f0ff,#f1eaff)",
                          }}
                        >
                          <i className="bi bi-code-square fs-4"></i>
                        </div>

                        <span className="badge bg-light text-secondary rounded-pill px-3 py-2">
                          {stats.total} Questions
                        </span>

                      </div>

                      {/* TITLE */}

                      <h4 className="fw-bold mb-2">
                        {technology}
                      </h4>

                      <p className="text-muted small mb-4">
                        Practice {technology} questions covering
                        fundamentals, practical concepts,
                        scenarios and interview problems.
                      </p>

                      {/* PROGRESS */}

                      <div className="d-flex justify-content-between align-items-center mb-2">

                        <span className="small text-muted">
                          Learning Progress
                        </span>

                        <strong className="small text-primary">
                          {stats.progress}%
                        </strong>

                      </div>

                      <div
                        className="progress mb-4"
                        style={{
                          height: "8px",
                          background: "#edf0f5",
                        }}
                      >
                        <div
                          className="progress-bar rounded-pill"
                          style={{
                            width: `${stats.progress}%`,
                            background:
                              "linear-gradient(90deg,#2563eb,#7c3aed)",
                          }}
                        ></div>
                      </div>

                      {/* STATS */}

                      <div className="row g-2 mb-4">

                        <div className="col-6">

                          <div className="bg-light rounded-4 p-3 text-center">

                            <i className="bi bi-check2-circle text-success"></i>

                            <small className="text-muted d-block mt-1">
                              Solved
                            </small>

                            <div className="fw-bold fs-5">
                              {stats.solved}
                            </div>

                          </div>

                        </div>

                        <div className="col-6">

                          <div className="bg-light rounded-4 p-3 text-center">

                            <i className="bi bi-bullseye text-primary"></i>

                            <small className="text-muted d-block mt-1">
                              Accuracy
                            </small>

                            <div className="fw-bold fs-5 text-success">
                              {stats.accuracy}%
                            </div>

                          </div>

                        </div>

                      </div>

                      {/* BUTTON */}

                      <Link
                        to="/practice"
                        className="btn btn-primary w-100 rounded-3 mt-auto"
                      >
                        Practice {technology}

                        <i className="bi bi-arrow-right ms-2"></i>
                      </Link>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>

        )}

      </div>

      {/* ================= HOVER ================= */}

      <style>
        {`
          .topic-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 30px rgba(0,0,0,0.08) !important;
          }
        `}
      </style>

    </div>
  );
};

export default Topics;
