import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useStudy } from "../context/StudyContext";
import questions from "../data/questions";

const Progress = () => {
const { performance, interviewHistory } = useStudy();

// =====================================================
// PRACTICE PERFORMANCE
// =====================================================

const totalPracticeAttempts = performance.length;

const correctPracticeAnswers = performance.filter(
(item) => (item.score || 0) >= 70
).length;

const wrongPracticeAnswers =
totalPracticeAttempts - correctPracticeAnswers;

const practiceAccuracy = totalPracticeAttempts
? Math.round(
(correctPracticeAnswers / totalPracticeAttempts) * 100
)
: 0;

const averageConfidence = totalPracticeAttempts
? (
performance.reduce(
(sum, item) => sum + (Number(item.confidence) || 0),
0
) / totalPracticeAttempts
).toFixed(1)
: "0.0";

// =====================================================
// TOPIC PERFORMANCE
// =====================================================

const topicStats = useMemo(() => {
const data = {};

performance.forEach((item) => {
  const technology = item.technology || "Other";
  const topic = item.topic || "General";

  const key = `${technology}|||${topic}`;

  if (!data[key]) {
    data[key] = {
      technology,
      topic,
      attempts: 0,
      correct: 0,
      wrong: 0,
      confidence: 0,
    };
  }

  data[key].attempts++;

  if ((item.score || 0) >= 70) {
    data[key].correct++;
  } else {
    data[key].wrong++;
  }

  data[key].confidence += Number(item.confidence) || 0;
});

return Object.values(data)
  .map((item) => ({
    ...item,

    accuracy:
      item.attempts > 0
        ? Math.round(
            (item.correct / item.attempts) * 100
          )
        : 0,

    averageConfidence:
      item.attempts > 0
        ? (
            item.confidence / item.attempts
          ).toFixed(1)
        : "0.0",
  }))
  .sort((a, b) => a.accuracy - b.accuracy);


}, [performance]);

// =====================================================
// TECHNOLOGY PERFORMANCE
// =====================================================

const technologyStats = useMemo(() => {
const data = {};


performance.forEach((item) => {
  const technology = item.technology || "Other";

  if (!data[technology]) {
    data[technology] = {
      technology,
      attempts: 0,
      correct: 0,
      wrong: 0,
    };
  }

  data[technology].attempts++;

  if ((item.score || 0) >= 70) {
    data[technology].correct++;
  } else {
    data[technology].wrong++;
  }
});

return Object.values(data)
  .map((item) => ({
    ...item,
    accuracy:
      item.attempts > 0
        ? Math.round(
            (item.correct / item.attempts) * 100
          )
        : 0,
  }))
  .sort((a, b) => b.accuracy - a.accuracy);


}, [performance]);

// =====================================================
// WEAK TOPICS
// =====================================================

const weakTopics = topicStats
.filter((item) => item.accuracy < 60)
.sort((a, b) => {
if (a.accuracy !== b.accuracy) {
return a.accuracy - b.accuracy;
}


  return b.attempts - a.attempts;
})
.slice(0, 5);


// =====================================================
// STRONG TOPICS
// =====================================================

const strongTopics = topicStats
.filter((item) => item.accuracy >= 80)
.sort((a, b) => {
if (b.accuracy !== a.accuracy) {
return b.accuracy - a.accuracy;
}


  return b.attempts - a.attempts;
})
.slice(0, 5);


// =====================================================
// LEARNING PROGRESS
// =====================================================

const completedTopics = new Set(
performance.map(
(item) =>
`${item.technology || "Other"}|||${
          item.topic || "General"
        }`
)
).size;

const totalTopics = new Set(
questions.map(
(item) =>
`${item.technology || "Other"}|||${
          item.category || "General"
        }`
)
).size;

const completion = totalTopics
? Math.min(
Math.round(
(completedTopics / totalTopics) * 100
),
100
)
: 0;

// =====================================================
// INTERVIEW PERFORMANCE
// =====================================================

const sortedInterviews = useMemo(() => {
return [...interviewHistory].sort(
(a, b) =>
new Date(b.date || 0) -
new Date(a.date || 0)
);
}, [interviewHistory]);

const latestInterview = sortedInterviews[0];
const previousInterview = sortedInterviews[1];

const latestScore =
latestInterview?.score || 0;

const previousScore =
previousInterview?.score || 0;

const scoreImprovement =
latestInterview && previousInterview
? latestScore - previousScore
: 0;

// =====================================================
// UI
// =====================================================

return ( <div className="min-vh-100 bg-light py-4"> <div className="container">

    {/* =================================================
        HEADER
    ================================================= */}

    <div className="mb-4">
      <span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-2">
        <i className="bi bi-graph-up-arrow me-2"></i>
        Performance
      </span>

      <h2 className="fw-bold mt-3 mb-1">
        Your Progress
      </h2>

      <p className="text-muted mb-0">
        Understand your practice performance and
        mock interview progress.
      </p>
    </div>

    {/* =================================================
        PRACTICE PERFORMANCE
    ================================================= */}

    <div className="mb-3">
      <h4 className="fw-bold mb-1">
        Practice Performance
      </h4>

      <p className="text-muted">
        Track your question-solving accuracy,
        confidence and learning progress.
      </p>
    </div>

    {/* PRACTICE STATS */}

    <div className="row g-4 mb-4">

      {/* Questions Attempted */}

      <div className="col-md-6 col-xl-3">
        <div className="card border-0 shadow-sm rounded-4 h-100">
          <div className="card-body p-4">

            <small className="text-muted">
              Questions Attempted
            </small>

            <h2 className="fw-bold mt-2">
              {totalPracticeAttempts}
            </h2>

            <i className="bi bi-question-circle text-primary fs-3"></i>

          </div>
        </div>
      </div>

      {/* Accuracy */}

      <div className="col-md-6 col-xl-3">
        <div className="card border-0 shadow-sm rounded-4 h-100">
          <div className="card-body p-4">

            <small className="text-muted">
              Practice Accuracy
            </small>

            <h2 className="fw-bold mt-2">
              {practiceAccuracy}%
            </h2>

            <i className="bi bi-bullseye text-success fs-3"></i>

          </div>
        </div>
      </div>

      {/* Correct */}

      <div className="col-md-6 col-xl-3">
        <div className="card border-0 shadow-sm rounded-4 h-100">
          <div className="card-body p-4">

            <small className="text-muted">
              Correct Answers
            </small>

            <h2 className="fw-bold mt-2">
              {correctPracticeAnswers}
            </h2>

            <small className="text-muted">
              {wrongPracticeAnswers} wrong
            </small>

            <div>
              <i className="bi bi-check-circle text-success fs-3"></i>
            </div>

          </div>
        </div>
      </div>

      {/* Confidence */}

      <div className="col-md-6 col-xl-3">
        <div className="card border-0 shadow-sm rounded-4 h-100">
          <div className="card-body p-4">

            <small className="text-muted">
              Avg. Confidence
            </small>

            <h2 className="fw-bold mt-2">
              {averageConfidence}/5
            </h2>

            <i className="bi bi-person-check text-warning fs-3"></i>

          </div>
        </div>
      </div>

    </div>

    {/* =================================================
        OVERALL LEARNING PROGRESS
    ================================================= */}

    <div className="card border-0 shadow-sm rounded-4 mb-4">
      <div className="card-body p-4">

        <div className="d-flex justify-content-between mb-2">

          <div>
            <h5 className="fw-bold mb-1">
              Overall Learning Progress
            </h5>

            <small className="text-muted">
              Based on topics you have practiced.
            </small>
          </div>

          <strong className="text-primary">
            {completion}%
          </strong>

        </div>

        <div
          className="progress"
          style={{ height: "10px" }}
        >
          <div
            className="progress-bar"
            style={{
              width: `${completion}%`,
            }}
          ></div>
        </div>

        <small className="text-muted d-block mt-2">
          {completedTopics} of {totalTopics} topics practiced
        </small>

      </div>
    </div>

    {/* =================================================
        TECHNOLOGY + TOPICS
    ================================================= */}

    <div className="row g-4 mb-4">

      {/* TECHNOLOGY PERFORMANCE */}

      <div className="col-lg-6">

        <div className="card border-0 shadow-sm rounded-4 h-100">

          <div className="card-body p-4">

            <h5 className="fw-bold mb-1">
              <i className="bi bi-code-square text-primary me-2"></i>
              Technology Performance
            </h5>

            <small className="text-muted d-block mb-4">
              Your practice performance by technology.
            </small>

            {technologyStats.length === 0 ? (

              <div className="text-center text-muted py-4">
                No practice data yet.
              </div>

            ) : (

              technologyStats.map((item) => (

                <div
                  key={item.technology}
                  className="mb-4"
                >

                  <div className="d-flex justify-content-between mb-2">

                    <strong>
                      {item.technology}
                    </strong>

                    <strong>
                      {item.accuracy}%
                    </strong>

                  </div>

                  <div
                    className="progress"
                    style={{ height: "7px" }}
                  >

                    <div
                      className={`progress-bar ${
                        item.accuracy >= 80
                          ? "bg-success"
                          : item.accuracy >= 60
                          ? "bg-warning"
                          : "bg-danger"
                      }`}
                      style={{
                        width: `${item.accuracy}%`,
                      }}
                    ></div>

                  </div>

                  <small className="text-muted">
                    {item.attempts} questions •{" "}
                    {item.correct} correct •{" "}
                    {item.wrong} wrong
                  </small>

                </div>

              ))

            )}

          </div>
        </div>
      </div>

      {/* WEAK TOPICS */}

      <div className="col-lg-6">

        <div className="card border-0 shadow-sm rounded-4 h-100">

          <div className="card-body p-4">

            <h5 className="fw-bold mb-1">
              <i className="bi bi-exclamation-triangle text-warning me-2"></i>
              Weak Topics
            </h5>

            <small className="text-muted d-block mb-3">
              Topics where your accuracy is below 60%.
            </small>

            {weakTopics.length === 0 ? (

              <div className="alert alert-success border-0">
                <i className="bi bi-check-circle me-2"></i>
                No weak topics found. Keep practicing!
              </div>

            ) : (

              weakTopics.map((item) => (

                <div
                  key={`${item.technology}-${item.topic}`}
                  className="d-flex justify-content-between align-items-center border-bottom py-3"
                >

                  <div>

                    <strong>
                      {item.topic}
                    </strong>

                    <div className="small text-muted">
                      {item.technology}
                    </div>

                    <div className="small text-danger">
                      {item.attempts} attempts •{" "}
                      {item.correct} correct •{" "}
                      {item.wrong} wrong
                    </div>

                  </div>

                  <span className="badge bg-danger rounded-pill">
                    {item.accuracy}%
                  </span>

                </div>

              ))

            )}

            {weakTopics.length > 0 && (
              <Link
                to="/practice"
                className="btn btn-outline-primary w-100 mt-3"
              >
                Start Revision
                <i className="bi bi-arrow-right ms-2"></i>
              </Link>
            )}

          </div>

        </div>
      </div>

      {/* STRONG TOPICS */}

      <div className="col-lg-6">

        <div className="card border-0 shadow-sm rounded-4">

          <div className="card-body p-4">

            <h5 className="fw-bold mb-1">
              <i className="bi bi-trophy text-warning me-2"></i>
              Strong Topics
            </h5>

            <small className="text-muted d-block mb-3">
              Topics where your accuracy is 80% or above.
            </small>

            {strongTopics.length === 0 ? (

              <p className="text-muted mb-0">
                Keep practicing to discover your strong topics.
              </p>

            ) : (

              strongTopics.map((item) => (

                <div
                  key={`${item.technology}-${item.topic}`}
                  className="d-flex justify-content-between align-items-center border-bottom py-3"
                >

                  <div>

                    <strong>
                      {item.topic}
                    </strong>

                    <div className="small text-muted">
                      {item.technology} • Confidence:{" "}
                      {item.averageConfidence}/5
                    </div>

                    <div className="small text-success">
                      {item.attempts} attempts •{" "}
                      {item.correct} correct •{" "}
                      {item.wrong} wrong
                    </div>

                  </div>

                  <span className="badge bg-success rounded-pill">
                    {item.accuracy}%
                  </span>

                </div>

              ))

            )}

          </div>

        </div>
      </div>

      {/* SMART RECOMMENDATION */}

      <div className="col-lg-6">

        <div className="card border-0 shadow-sm rounded-4 h-100">

          <div className="card-body p-4">

            <h5 className="fw-bold mb-3">
              <i className="bi bi-lightbulb text-warning me-2"></i>
              Smart Recommendation
            </h5>

            {weakTopics.length > 0 ? (

              <>
                <p className="text-muted">
                  Your weakest topic is{" "}
                  <strong>
                    {weakTopics[0].topic}
                  </strong>{" "}
                  from{" "}
                  <strong>
                    {weakTopics[0].technology}
                  </strong>
                  . You answered{" "}
                  <strong>
                    {weakTopics[0].wrong}
                  </strong>{" "}
                  questions incorrectly. Practice this
                  topic again to improve your accuracy.
                </p>

                <Link
                  to="/practice"
                  className="btn btn-primary"
                >
                  Practice Now
                  <i className="bi bi-arrow-right ms-2"></i>
                </Link>
              </>

            ) : (

              <>
                <p className="text-muted">
                  Start solving questions. PrepPilot will
                  automatically identify your weak and
                  strong topics.
                </p>

                <Link
                  to="/practice"
                  className="btn btn-primary"
                >
                  Start Practice
                </Link>
              </>

            )}

          </div>

        </div>
      </div>

    </div>

    {/* =================================================
        MOCK INTERVIEW PERFORMANCE
    ================================================= */}

    <div className="mb-3 mt-5">

      <h4 className="fw-bold mb-1">
        Mock Interview Performance
      </h4>

      <p className="text-muted">
        Track your interview attempts and improvement
        separately from practice questions.
      </p>

    </div>

    <div className="card border-0 shadow-sm rounded-4 mb-4">

      <div className="card-body p-4">

        <div className="d-flex justify-content-between align-items-center mb-4">

          <div>
            <h5 className="fw-bold mb-1">
              <i className="bi bi-person-video3 text-primary me-2"></i>
              Interview Performance
            </h5>

            <small className="text-muted">
              Your mock interview results.
            </small>
          </div>

          <Link
            to="/interview"
            className="btn btn-primary btn-sm rounded-3"
          >
            New Interview
            <i className="bi bi-arrow-right ms-2"></i>
          </Link>

        </div>

        {sortedInterviews.length === 0 ? (

          <div className="text-center py-5 bg-light rounded-4">

            <i className="bi bi-mic fs-1 text-primary"></i>

            <h6 className="fw-bold mt-3">
              No interviews yet
            </h6>

            <p className="text-muted mb-3">
              Take your first mock interview to see
              your performance here.
            </p>

            <Link
              to="/interview"
              className="btn btn-primary"
            >
              Start Interview
              <i className="bi bi-arrow-right ms-2"></i>
            </Link>

          </div>

        ) : (

          <>

            {/* INTERVIEW SUMMARY */}

            <div className="row g-3 mb-4">

              <div className="col-md-4">

                <div className="p-3 bg-light rounded-4 h-100">

                  <small className="text-muted">
                    Total Interviews
                  </small>

                  <h3 className="fw-bold mt-2 mb-0">
                    {sortedInterviews.length}
                  </h3>

                </div>

              </div>

              <div className="col-md-4">

                <div className="p-3 bg-primary-subtle rounded-4 h-100">

                  <small className="text-primary">
                    Latest Interview
                  </small>

                  <h3 className="fw-bold text-primary mt-2 mb-0">
                    {latestScore}%
                  </h3>

                </div>

              </div>

              <div className="col-md-4">

                <div
                  className={`p-3 rounded-4 h-100 ${
                    scoreImprovement >= 0
                      ? "bg-success-subtle"
                      : "bg-danger-subtle"
                  }`}
                >

                  <small
                    className={
                      scoreImprovement >= 0
                        ? "text-success"
                        : "text-danger"
                    }
                  >
                    Improvement
                  </small>

                  <h3
                    className={`fw-bold mt-2 mb-0 ${
                      scoreImprovement >= 0
                        ? "text-success"
                        : "text-danger"
                    }`}
                  >
                    {sortedInterviews.length >= 2
                      ? `${scoreImprovement >= 0 ? "+" : ""}${scoreImprovement}%`
                      : "—"}
                  </h3>

                </div>

              </div>

            </div>

            {/* LATEST VS PREVIOUS */}

            {latestInterview &&
              previousInterview && (

                <div className="row g-3 mb-4">

                  <div className="col-md-6">

                    <div className="border rounded-4 p-3">

                      <small className="text-muted">
                        Previous Interview
                      </small>

                      <h3 className="fw-bold mt-2">
                        {previousScore}%
                      </h3>

                      <small className="text-muted">
                        {previousInterview.totalQuestions ||
                          previousInterview.total ||
                          10}{" "}
                        questions
                      </small>

                    </div>

                  </div>

                  <div className="col-md-6">

                    <div className="border border-primary rounded-4 p-3">

                      <small className="text-primary">
                        Latest Interview
                      </small>

                      <h3 className="fw-bold text-primary mt-2">
                        {latestScore}%
                      </h3>

                      <small className="text-muted">
                        {latestInterview.totalQuestions ||
                          latestInterview.total ||
                          10}{" "}
                        questions
                      </small>

                    </div>

                  </div>

                </div>

              )}

            {/* RECENT INTERVIEWS */}

            <h6 className="fw-bold mb-3">
              Recent Interviews
            </h6>

            <div className="table-responsive">

              <table className="table align-middle mb-0">

                <thead>
                  <tr>
                    <th>Interview</th>
                    <th>Date</th>
                    <th>Score</th>
                    <th>Correct</th>
                    <th>Confidence</th>
                    <th>Questions</th>
                  </tr>
                </thead>

                <tbody>

                  {sortedInterviews
                    .slice(0, 5)
                    .map((interview, index) => {

                      const number =
                        sortedInterviews.length - index;

                      const score =
                        interview.score || 0;

                      const correct =
                        interview.correct ?? 0;

                      const total =
                        interview.totalQuestions ||
                        interview.total ||
                        10;

                      const confidence =
                        interview.averageConfidence ??
                        interview.confidence ??
                        0;

                      return (
                        <tr
                          key={
                            interview.id ||
                            `${interview.date}-${index}`
                          }
                        >

                          <td>
                            <span className="badge bg-light text-dark rounded-pill">
                              Interview #{number}
                            </span>
                          </td>

                          <td>
                            <small>
                              {interview.date
                                ? new Date(
                                    interview.date
                                  ).toLocaleDateString()
                                : "Recent"}
                            </small>
                          </td>

                          <td>

                            <span
                              className={`badge rounded-pill ${
                                score >= 70
                                  ? "bg-success"
                                  : score >= 40
                                  ? "bg-warning text-dark"
                                  : "bg-danger"
                              }`}
                            >
                              {score}%
                            </span>

                          </td>

                          <td>
                            {correct}/{total}
                          </td>

                          <td>
                            {confidence}/5
                          </td>

                          <td>
                            {total}
                          </td>

                        </tr>
                      );
                    })}

                </tbody>

              </table>

            </div>

          </>

        )}

      </div>

    </div>

    {/* =================================================
        DETAILED INTERVIEW HISTORY
    ================================================= */}

    {sortedInterviews.length > 0 && (

      <div className="card border-0 shadow-sm rounded-4 mb-4">

        <div className="card-body p-4">

          <div className="d-flex justify-content-between align-items-center mb-4">

            <div>

              <h5 className="fw-bold mb-1">
                <i className="bi bi-clock-history text-primary me-2"></i>
                Interview History
              </h5>

              <small className="text-muted">
                Detailed history of your mock interviews.
              </small>

            </div>

            <span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-2">
              {sortedInterviews.length} Interviews
            </span>

          </div>

          <div className="row g-3">

            {sortedInterviews.map(
              (interview, index) => {

                const score =
                  interview.score || 0;

                const correct =
                  interview.correct ?? 0;

                const total =
                  interview.totalQuestions ||
                  interview.total ||
                  10;

                const confidence =
                  interview.averageConfidence ??
                  interview.confidence ??
                  0;

                const duration =
                  interview.duration || 0;

                let scoreClass =
                  "text-danger";

                let badgeClass =
                  "bg-danger-subtle text-danger";

                if (score >= 80) {

                  scoreClass =
                    "text-success";

                  badgeClass =
                    "bg-success-subtle text-success";

                } else if (score >= 60) {

                  scoreClass =
                    "text-warning";

                  badgeClass =
                    "bg-warning-subtle text-warning-emphasis";

                }

                return (

                  <div
                    className="col-md-6 col-xl-4"
                    key={
                      interview.id ||
                      `${interview.date}-${index}`
                    }
                  >

                    <div className="border rounded-4 p-4 h-100">

                      <div className="d-flex justify-content-between align-items-start">

                        <div>

                          <span className="badge bg-light text-dark rounded-pill">
                            Interview #
                            {sortedInterviews.length -
                              index}
                          </span>

                          <div className="small text-muted mt-2">
                            {interview.date
                              ? new Date(
                                  interview.date
                                ).toLocaleDateString()
                              : "Recent"}
                          </div>

                        </div>

                        <div
                          className={`rounded-3 ${badgeClass} d-flex align-items-center justify-content-center`}
                          style={{
                            width: "52px",
                            height: "52px",
                          }}
                        >

                          <strong>
                            {score}%
                          </strong>

                        </div>

                      </div>

                      <div className="mt-4">

                        <div className="d-flex justify-content-between mb-2">

                          <span className="text-muted">
                            Correct Answers
                          </span>

                          <strong>
                            {correct}/{total}
                          </strong>

                        </div>

                        <div className="d-flex justify-content-between mb-2">

                          <span className="text-muted">
                            Confidence
                          </span>

                          <strong>
                            {confidence}/5
                          </strong>

                        </div>

                        <div className="d-flex justify-content-between">

                          <span className="text-muted">
                            Time Used
                          </span>

                          <strong>
                            {Math.floor(
                              duration / 60
                            )}{" "}
                            min
                          </strong>

                        </div>

                      </div>

                      <div className="mt-4">

                        <div className="d-flex justify-content-between mb-2">

                          <small className="text-muted">
                            Performance
                          </small>

                          <small
                            className={`fw-bold ${scoreClass}`}
                          >
                            {score}%
                          </small>

                        </div>

                        <div
                          className="progress"
                          style={{
                            height: "7px",
                          }}
                        >

                          <div
                            className={`progress-bar ${
                              score >= 80
                                ? "bg-success"
                                : score >= 60
                                ? "bg-warning"
                                : "bg-danger"
                            }`}
                            style={{
                              width: `${score}%`,
                            }}
                          ></div>

                        </div>

                      </div>

                      {interview.weakTopics?.length >
                        0 && (

                        <div className="mt-3">

                          <small className="text-muted d-block mb-2">
                            <i className="bi bi-exclamation-circle me-1"></i>
                            Needs improvement
                          </small>

                          <div className="d-flex flex-wrap gap-1">

                            {interview.weakTopics
                              .slice(0, 3)
                              .map(
                                (
                                  topic,
                                  topicIndex
                                ) => (

                                  <span
                                    key={`${interview.id || index}-${topic}-${topicIndex}`}
                                    className="badge bg-danger-subtle text-danger"
                                  >
                                    {topic}
                                  </span>

                                )
                              )}

                          </div>

                        </div>

                      )}

                    </div>

                  </div>

                );
              }
            )}

          </div>

        </div>

      </div>

    )}

  </div>
</div>

);
};

export default Progress;
