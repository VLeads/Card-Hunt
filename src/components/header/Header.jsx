import { useQuiz } from "context";
import React from "react";
import styles from "./Header.module.css";

export const Header = () => {
  const { quiz } = useQuiz();

  return (
    <header className={styles.header}>
      <div className={styles.headerLogo}>
        <img
          src="/course/library/images/cardhunt.png"
          alt="logo"
          className={styles.logoImg}
        />
        <h1 className={styles.headerText}>CardHunt</h1>
      </div>
      <div className={styles.headerDataContainer}>
        <span className={styles.headerData}>Level: {quiz.level}</span>
        <span className={styles.headerData}>Turns: {quiz.turns}</span>
        <span className={styles.headerData}>Score: {quiz.score} </span>
        <span className={styles.headerData}>Time: {quiz.timer}</span>
      </div>
    </header>
  );
};
