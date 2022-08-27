import {
  DECREASE_TIME,
  INCREASE_SCORE,
  INCREASE_TURN,
  IS_QUIZ_COMPLETED,
  RESET_QUIZ,
  RUN_TIMER,
  SET_QUIZ_DATA,
  STOP_TIMER,
} from "utils";

export const quizReducer = (state, action) => {
  switch (action.type) {
    case INCREASE_TURN:
      return { ...state, turns: state.turns + 1 };
    case DECREASE_TIME:
      return { ...state, timer: state.timer - 1 };
    case RUN_TIMER:
      return { ...state, isTimerRunning: true };
    case STOP_TIMER:
      return { ...state, isTimerRunning: false };
    case IS_QUIZ_COMPLETED:
      return { ...state, isTimerRunning: false, isQuizCompleted: true };
    case INCREASE_SCORE:
      return { ...state, score: state.score + 10 };
    case RESET_QUIZ:
      return action.payload;
    case SET_QUIZ_DATA:
      return {
        ...state,
        index: action.payload.index,
        data: action.payload.data,
        level: action.payload.level,
      };
    default:
      return state;
  }
};
