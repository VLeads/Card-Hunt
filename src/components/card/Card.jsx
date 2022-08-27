import React from "react";
import styles from "./Card.module.css";

export const Card = ({ card, flipped, handleCardClick, isDisabled }) => {
  const { imgData } = card;

  return (
    <div className={styles.cardContainer}>
      <div className={`${flipped ? styles.cardFlip : ""}`}>
        <img
          src={imgData}
          alt="card"
          className={`${styles.originalImg} ${styles.cardImg}`}
          loading="lazy"
        />
        <img
          src="/course/Library/images/cardhunt.png"
          alt="hidden card"
          className={`${styles.cardCover} ${styles.cardImg}`}
          onClick={() => {
            if (!isDisabled) {
              handleCardClick(card);
            }
          }}
          loading="lazy"
        />
      </div>
    </div>
  );
};
