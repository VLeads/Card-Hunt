import React from "react";
import styles from "./Footer.module.css";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "assets/icons/icons";

export const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.item}>
        <a href="https://twitter.com/vishalk01234" target="_blank">
          <TwitterIcon />
        </a>
      </div>
      <div className={styles.item}>
        <a href="https://www.linkedin.com/in/vishalkumar28/" target="_blank">
          <LinkedinIcon />
        </a>
      </div>
      <div className={styles.item}>
        <a href="https://github.com/VLeads/Card-Hunt" target="_blank">
          <GithubIcon />
        </a>
      </div>
    </div>
  );
};
