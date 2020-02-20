import React from "react";
import { Link } from "react-router-dom";
import styles from "./Card.module.css";

export default function Card(props) {
  return (
    <Link to={`/image/${props.image}`}>
      <div className={styles.Card}>
        <img
          className={styles.image}
          src={props.image}
          alt="placeholder"
          />
      </div>
    </Link>
  );
}
