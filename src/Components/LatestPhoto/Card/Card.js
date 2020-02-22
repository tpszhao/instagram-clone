import React from "react";
import { Link } from "react-router-dom";
import styles from "./Card.module.css";

export default function Card({photo}) {
  const url = `/user/${photo.user.username}`
  return (
    <div className={styles.Card}>
      <div className={styles.User}>
        <Link to={url}>
          <img
            className={styles.Profile_Image}
            src={photo.user.profile_image.medium}
            alt="placeholder"/>
        </Link>
        <Link to={url} style={{textDecoration:'none'}}>
          <span className={styles.name}>{photo.user.name}</span>
        </Link>
      </div>
      <img
        className={styles.image}
        src={photo.urls.regular}
        alt="placeholder"
        />
    </div>
  );
}
