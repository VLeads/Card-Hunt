import { createContext, useContext, useEffect, useReducer } from "react";
import { quizReducer } from "reducers";
import {
  DECREASE_TIME,
  IS_QUIZ_COMPLETED,
  SET_QUIZ_DATA,
  STOP_TIMER,
} from "utils";
import { useAllQuiz } from "./allquiz-context";

const QuizContext = createContext();

const QuizProvider = ({ children }) => {
  const { allQuiz } = useAllQuiz();

  const [quiz, dispatchQuiz] = useReducer(quizReducer, {
    index: 0,
    data: allQuiz[0],
    turns: 0,
    score: 0,
    timer: 150,
    level: 1,
    isTimerRunning: false,
    isQuizCompleted: false,
  });

  useEffect(() => {
    if (quiz.timer === 0) return;
    let timerId;
    if (quiz.isTimerRunning) {
      timerId = setTimeout(() => {
        let newTime = quiz.timer - 1;
        if (newTime === 0) dispatchQuiz({ type: STOP_TIMER });
        dispatchQuiz({ type: DECREASE_TIME });
      }, 1000);

      return () => clearTimeout(timerId);
    }
  }, [quiz.timer, quiz.isTimerRunning]);

  useEffect(() => {
    if (quiz.score % 60 === 0 && quiz.score !== 0) {
      if (allQuiz[quiz.index + 1] !== undefined) {
        dispatchQuiz({
          type: SET_QUIZ_DATA,
          payload: {
            index: quiz.index + 1,
            data: allQuiz[quiz.index + 1],
            level: quiz.level + 1,
          },
        });
      }
      if (quiz.score === allQuiz.length * 60) {
        dispatchQuiz({ type: IS_QUIZ_COMPLETED });
      }
    }
  }, [quiz.score, quiz.index, allQuiz]);

  return (
    <QuizContext.Provider value={{ quiz, dispatchQuiz }}>
      {children}
    </QuizContext.Provider>
  );
};

const useQuiz = () => useContext(QuizContext);

export { QuizProvider, useQuiz };
