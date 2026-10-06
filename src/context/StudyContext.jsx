import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useAuth } from "./AuthContext";

const StudyContext = createContext();

export const StudyProvider = ({ children }) => {
  const { currentUser } = useAuth();

  const userId = currentUser?.id || "guest";

  const [performance, setPerformance] = useLocalStorage(
    `preppilot-performance-${userId}`,
    []
  );

  const [interviewHistory, setInterviewHistory] =
    useLocalStorage(
      `preppilot-interviews-${userId}`,
      []
    );

  const savePerformance = (result) => {
    setPerformance((prev) => [
      ...prev,
      {
        ...result,
        id: Date.now(),
        date: new Date().toISOString(),
      },
    ]);
  };

  const saveInterview = (result) => {
    setInterviewHistory((prev) => [
      ...prev,
      {
        ...result,
        id: Date.now(),
        date: new Date().toISOString(),
      },
    ]);
  };

  const clearPerformance = () => {
    setPerformance([]);
  };

  const clearInterviewHistory = () => {
    setInterviewHistory([]);
  };

  const getWeakTopics = () => {
    const data = {};

    performance.forEach((item) => {
      const topic = item.topic || "General";

      if (!data[topic]) {
        data[topic] = {
          attempts: 0,
          score: 0,
        };
      }

      data[topic].attempts++;
      data[topic].score += item.score || 0;
    });

    return Object.entries(data)
      .map(([topic, value]) => ({
        topic,
        attempts: value.attempts,
        score: Math.round(
          value.score / value.attempts
        ),
      }))
      .filter((item) => item.score < 70)
      .sort((a, b) => a.score - b.score);
  };

  const getAverageScore = () => {
    if (!performance.length) return 0;

    return Math.round(
      performance.reduce(
        (sum, item) => sum + (item.score || 0),
        0
      ) / performance.length
    );
  };

  const getAverageConfidence = () => {
    if (!performance.length) return 0;

    return (
      performance.reduce(
        (sum, item) =>
          sum + (item.confidence || 0),
        0
      ) / performance.length
    ).toFixed(1);
  };

  return (
    <StudyContext.Provider
      value={{
        performance,
        interviewHistory,
        savePerformance,
        saveInterview,
        clearPerformance,
        clearInterviewHistory,
        getWeakTopics,
        getAverageScore,
        getAverageConfidence,
      }}
    >
      {children}
    </StudyContext.Provider>
  );
};

export const useStudy = () => {
  const context = useContext(StudyContext);

  if (!context) {
    throw new Error(
      "useStudy must be used inside StudyProvider"
    );
  }

  return context;
};