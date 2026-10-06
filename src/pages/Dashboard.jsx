import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useStudy } from "../context/StudyContext";
import questions from "../data/questions";

const Dashboard = () => {
  const { performance } = useStudy();

  const solvedQuestions = performance.length;

  const accuracy = performance.length
    ? Math.round(
        performance.reduce(
          (sum, item) => sum + (item.score || 0),
          0
        ) / performance.length
      )
    : 0;

  const totalTopics = new Set(
    questions.map((q) => q.category)
  ).size;

  const completedTopics = new Set(
    performance
      .filter((item) => item.score >= 70)
      .map((item) => item.topic)
  ).size;

  const streak = useMemo(() => {
    const dates = [
      ...new Set(
        performance.map((item) =>
          new Date(item.date).toDateString()
        )
      ),
    ];

    if (!dates.length) return 0;

    let count = 0;
    const today = new Date();

    for (let i = 0; ; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);

      if (dates.includes(date.toDateString())) {
        count++;
      } else {
        break;
      }
    }

    return count;
  }, [performance]);

  const weakTopics = useMemo(() => {
    const data = {};

    performance.forEach((item) => {
      if (!item.topic) return;

      if (!data[item.topic]) {
        data[item.topic] = {
          attempts: 0,
          score: 0,
        };
      }

      data[item.topic].attempts++;
      data[item.topic].score += item.score || 0;
    });

    return Object.entries(data)
      .map(([topic, value]) => ({
        topic,
        score: Math.round(
          value.score / value.attempts
        ),
      }))
      .filter((item) => item.score < 70)
      .sort((a, b) => a.score - b.score)
      .slice(0, 3);
  }, [performance]);

  const recentActivity = [...performance]
    .reverse()
    .slice(0, 4);

  const technologies = [
    "JavaScript",
    "React",
    "HTML",
    "CSS",
  ];

  return (
    <div
      className="min-vh-100 py-4"
      style={{
        background:
          "linear-gradient(135deg,#f7f9fc 0%,#eef3ff 100%)",
      }}
    >
      <div className="container">

        {/* ================= HERO ================= */}

        <div
          className="rounded-5 overflow-hidden shadow-lg mb-4"
          style={{
            background:
              "linear-gradient(120deg,#111827,#1e3a8a,#2563eb)",
          }}
        >
          <div className="row align-items-center">

            <div className="col-lg-7">
              <div className="p-4 p-md-5 text-white">

                <span className="badge rounded-pill bg-white bg-opacity-10 border border-white border-opacity-25 px-3 py-2">
                  <i className="bi bi-stars me-2"></i>
                  PrepPilot
                </span>

                <h1
                  className="fw-bold mt-4"
                  style={{
                    fontSize:
                      "clamp(2rem,4vw,3.3rem)",
                  }}
                >
                  Prepare smarter.
                  <br />
                  <span className="text-info">
                    Perform better.
                  </span>
                </h1>

                <p className="text-white-50 fs-5 mt-3">
                  Your personal interview preparation
                  workspace for coding, concepts,
                  problem solving and technical interviews.
                </p>

                <div className="d-flex flex-wrap gap-3 mt-4">

                  <Link
                    to="/practice"
                    className="btn btn-light btn-lg px-4"
                  >
                    <i className="bi bi-lightning-charge-fill me-2"></i>
                    Continue Practice
                  </Link>

                  <Link
                    to="/interview"
                    className="btn btn-outline-light btn-lg px-4"
                  >
                    <i className="bi bi-mic-fill me-2"></i>
                    Mock Interview
                  </Link>

                </div>

              </div>
            </div>

            {/* Code Visual */}
            <div className="col-lg-5 d-none d-lg-block">
              <div className="p-4">

                <div
                  className="rounded-4 shadow-lg overflow-hidden"
                  style={{
                    background: "#0b1120",
                    transform: "rotate(2deg)",
                  }}
                >

                  <div className="px-3 py-2 border-bottom border-secondary">
                    <span className="text-danger me-1">●</span>
                    <span className="text-warning me-1">●</span>
                    <span className="text-success">●</span>

                    <span className="text-secondary small ms-3">
                      interview.js
                    </span>
                  </div>

                  <div className="p-4 font-monospace small">

                    <div className="text-secondary">
                      01
                    </div>

                    <div className="text-info">
                      const{" "}
                      <span className="text-white">
                        prep
                      </span>{" "}
                      = {"{"}
                    </div>

                    <div className="text-white ps-4">
                      skills:
                      <span className="text-warning">
                        ["React", "JS"]
                      </span>
                    </div>

                    <div className="text-white ps-4">
                      confidence:
                      <span className="text-success">
                        {` ${accuracy}%`}
                      </span>
                    </div>

                    <div className="text-white ps-4">
                      progress:
                      <span className="text-info">
                        {` ${solvedQuestions}`}
                      </span>
                    </div>

                    <div className="text-info">
                      {"}"}
                    </div>

                    <div className="mt-3 text-success">
                      ✓ Keep learning...
                    </div>

                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* ================= STATS ================= */}

        <div className="row g-3 mb-4">

          <div className="col-6 col-xl-3">
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body p-4">

                <div className="d-flex justify-content-between">
                  <div>
                    <small className="text-muted">
                      Questions Solved
                    </small>

                    <h2 className="fw-bold mt-2 mb-0">
                      {solvedQuestions}
                    </h2>
                  </div>

                  <div
                    className="rounded-3 bg-primary-subtle text-primary d-flex align-items-center justify-content-center"
                    style={{
                      width: 48,
                      height: 48,
                    }}
                  >
                    <i className="bi bi-check2-circle fs-4"></i>
                  </div>
                </div>

                <div className="small text-muted mt-3">
                  Keep building momentum
                </div>

              </div>
            </div>
          </div>

          <div className="col-6 col-xl-3">
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body p-4">

                <div className="d-flex justify-content-between">
                  <div>
                    <small className="text-muted">
                      Accuracy
                    </small>

                    <h2 className="fw-bold mt-2 mb-0">
                      {accuracy}%
                    </h2>
                  </div>

                  <div
                    className="rounded-3 bg-success-subtle text-success d-flex align-items-center justify-content-center"
                    style={{
                      width: 48,
                      height: 48,
                    }}
                  >
                    <i className="bi bi-bullseye fs-4"></i>
                  </div>
                </div>

                <div className="small text-muted mt-3">
                  Overall performance
                </div>

              </div>
            </div>
          </div>

          <div className="col-6 col-xl-3">
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body p-4">

                <div className="d-flex justify-content-between">
                  <div>
                    <small className="text-muted">
                      Topics Completed
                    </small>

                    <h2 className="fw-bold mt-2 mb-0">
                      {completedTopics}/{totalTopics}
                    </h2>
                  </div>

                  <div
                    className="rounded-3 bg-warning-subtle text-warning d-flex align-items-center justify-content-center"
                    style={{
                      width: 48,
                      height: 48,
                    }}
                  >
                    <i className="bi bi-bookmark-check fs-4"></i>
                  </div>
                </div>

                <div className="small text-muted mt-3">
                  Learning coverage
                </div>

              </div>
            </div>
          </div>

          <div className="col-6 col-xl-3">
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body p-4">

                <div className="d-flex justify-content-between">
                  <div>
                    <small className="text-muted">
                      Current Streak
                    </small>

                    <h2 className="fw-bold mt-2 mb-0">
                      {streak}
                      <span className="fs-6 ms-1">
                        days
                      </span>
                    </h2>
                  </div>

                  <div
                    className="rounded-3 bg-danger-subtle text-danger d-flex align-items-center justify-content-center"
                    style={{
                      width: 48,
                      height: 48,
                    }}
                  >
                    <i className="bi bi-fire fs-4"></i>
                  </div>
                </div>

                <div className="small text-muted mt-3">
                  Consistency matters
                </div>

              </div>
            </div>
          </div>

        </div>

        {/* ================= MAIN GRID ================= */}

        <div className="row g-4">

          {/* Continue Learning */}

          <div className="col-lg-8">

            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body p-4">

                <div className="d-flex justify-content-between align-items-center mb-4">

                  <div>
                    <h4 className="fw-bold mb-1">
                      Continue Learning
                    </h4>

                    <p className="text-muted mb-0">
                      Pick a skill and keep improving.
                    </p>
                  </div>

                  <Link
                    to="/topics"
                    className="btn btn-sm btn-outline-primary"
                  >
                    View All
                  </Link>

                </div>

                <div className="row g-3">

                  {technologies.map((tech) => {

                    const techQuestions =
                      questions.filter(
                        (q) => q.technology === tech
                      ).length;

                    const techAttempts =
                      performance.filter(
                        (p) =>
                          p.technology === tech
                      ).length;

                    const progress = Math.min(
                      Math.round(
                        (techAttempts /
                          techQuestions) *
                          100
                      ) || 0,
                      100
                    );

                    return (
                      <div
                        className="col-md-6"
                        key={tech}
                      >
                        <div className="border rounded-4 p-3 h-100">

                          <div className="d-flex justify-content-between align-items-center">

                            <div className="d-flex align-items-center gap-3">

                              <div
                                className="rounded-3 bg-primary-subtle text-primary d-flex align-items-center justify-content-center"
                                style={{
                                  width: 45,
                                  height: 45,
                                }}
                              >
                                <i className="bi bi-code-slash fs-5"></i>
                              </div>

                              <div>
                                <h6 className="fw-bold mb-1">
                                  {tech}
                                </h6>

                                <small className="text-muted">
                                  {techQuestions} questions
                                </small>
                              </div>

                            </div>

                            <strong>
                              {progress}%
                            </strong>

                          </div>

                          <div
                            className="progress mt-3"
                            style={{ height: 6 }}
                          >
                            <div
                              className="progress-bar"
                              style={{
                                width: `${progress}%`,
                              }}
                            ></div>
                          </div>

                          <Link
                            to="/practice"
                            className="btn btn-sm btn-light w-100 mt-3"
                          >
                            Continue
                            <i className="bi bi-arrow-right ms-2"></i>
                          </Link>

                        </div>
                      </div>
                    );
                  })}

                </div>

              </div>
            </div>

          </div>

          {/* Interview CTA */}

          <div className="col-lg-4">

            <div
              className="card border-0 shadow-sm rounded-4 h-100 text-white overflow-hidden"
              style={{
                background:
                  "linear-gradient(145deg,#312e81,#7c3aed)",
              }}
            >
              <div className="card-body p-4 d-flex flex-column">

                <div className="mb-4">
                  <span className="badge bg-white bg-opacity-10 border border-white border-opacity-25">
                    <i className="bi bi-mic me-1"></i>
                    Mock Interview
                  </span>
                </div>

                <div
                  className="rounded-circle bg-white bg-opacity-10 d-flex align-items-center justify-content-center mb-4"
                  style={{
                    width: 70,
                    height: 70,
                  }}
                >
                  <i className="bi bi-person-video3 fs-2"></i>
                </div>

                <h3 className="fw-bold">
                  Ready for the real thing?
                </h3>

                <p className="text-white-50">
                  Take a random technical interview with
                  a timer, confidence tracking and final
                  performance analysis.
                </p>

                <div className="mt-auto">

                  <div className="d-flex gap-2 mb-4">
                    <span className="badge bg-white bg-opacity-10">
                      10 Questions
                    </span>

                    <span className="badge bg-white bg-opacity-10">
                      15 Minutes
                    </span>
                  </div>

                  <Link
                    to="/interview"
                    className="btn btn-light w-100"
                  >
                    Start Interview
                    <i className="bi bi-arrow-right ms-2"></i>
                  </Link>

                </div>

              </div>
            </div>

          </div>

        </div>

        {/* ================= LOWER SECTION ================= */}

        <div className="row g-4 mt-1">

          {/* Smart Revision */}

          <div className="col-lg-7">

            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body p-4">

                <div className="d-flex justify-content-between align-items-center mb-4">

                  <div>
                    <h4 className="fw-bold mb-1">
                      Smart Revision
                    </h4>

                    <p className="text-muted mb-0">
                      Topics that need your attention.
                    </p>
                  </div>

                  <i className="bi bi-lightbulb text-warning fs-2"></i>

                </div>

                {weakTopics.length === 0 ? (
                  <div className="text-center py-4">

                    <i className="bi bi-stars text-primary fs-1"></i>

                    <h6 className="fw-bold mt-3">
                      Your revision plan will appear here
                    </h6>

                    <p className="text-muted small mb-0">
                      Practice more questions and PrepPilot
                      will identify your weak topics.
                    </p>

                  </div>
                ) : (
                  weakTopics.map((item) => (
                    <div
                      key={item.topic}
                      className="border rounded-4 p-3 mb-3"
                    >

                      <div className="d-flex justify-content-between mb-2">

                        <strong>
                          {item.topic}
                        </strong>

                        <span className="badge bg-danger-subtle text-danger">
                          {item.score}%
                        </span>

                      </div>

                      <div
                        className="progress"
                        style={{ height: 6 }}
                      >
                        <div
                          className="progress-bar bg-danger"
                          style={{
                            width: `${item.score}%`,
                          }}
                        ></div>
                      </div>

                    </div>
                  ))
                )}

                <Link
                  to="/progress"
                  className="btn btn-outline-primary w-100 mt-2"
                >
                  View Detailed Progress
                  <i className="bi bi-arrow-right ms-2"></i>
                </Link>

              </div>
            </div>

          </div>

          {/* Recent Activity */}

          <div className="col-lg-5">

            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body p-4">

                <div className="d-flex justify-content-between align-items-center mb-4">

                  <h4 className="fw-bold mb-0">
                    Recent Activity
                  </h4>

                  <i className="bi bi-activity text-primary fs-4"></i>

                </div>

                {recentActivity.length === 0 ? (
                  <div className="text-center py-4">

                    <i className="bi bi-clock-history text-muted fs-1"></i>

                    <p className="text-muted mt-3 mb-0">
                      No activity yet.
                    </p>

                  </div>
                ) : (
                  recentActivity.map((item, index) => (
                    <div
                      key={index}
                      className="d-flex align-items-center gap-3 mb-3"
                    >

                      <div
                        className={`rounded-circle d-flex align-items-center justify-content-center ${
                          item.score >= 70
                            ? "bg-success-subtle text-success"
                            : "bg-danger-subtle text-danger"
                        }`}
                        style={{
                          width: 42,
                          height: 42,
                        }}
                      >
                        <i
                          className={
                            item.type === "Interview"
                              ? "bi bi-mic"
                              : "bi bi-check"
                          }
                        ></i>
                      </div>

                      <div className="flex-grow-1">

                        <strong className="d-block">
                          {item.type}
                        </strong>

                        <small className="text-muted">
                          {item.topic ||
                            item.technology ||
                            "Practice"}
                        </small>

                      </div>

                      <span
                        className={`badge ${
                          item.score >= 70
                            ? "bg-success"
                            : "bg-danger"
                        }`}
                      >
                        {item.score}%
                      </span>

                    </div>
                  ))
                )}

              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;