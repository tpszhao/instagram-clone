import React from "react";
import { Link } from "react-router-dom";
import styles from "./Card.module.css";

export default function Card(props) {
  return (
    <div className={styles.Card}>
      <Link to={`/user/${props.image.user.username}`}>
        {props.image.user.name}
      </Link>
      <img
        className={styles.image}
        src={props.image.urls.regular}
        alt="placeholder"
      />
    </div>
  );
}
