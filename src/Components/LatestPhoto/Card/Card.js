import React from "react";
import { Link } from "react-router-dom";
import Image from "react-graceful-image";
import styles from "./Card.module.css";

export default function Card({photo}) {
  const url = `/user/${photo.user.username}`
  return (
    <div className={styles.Card}>
      <div className={styles.User}>
        <Link to={url}>
          <Image
            className={styles.profile_image}
            src={photo.user.profile_image.medium}
            alt="placeholder"/>
        </Link>
        <Link to={url} style={{textDecoration:'none'}}>
          <span className={styles.name}>{photo.user.name}</span>
        </Link>
      </div>
      <Image
        className={styles.image}
        src={photo.urls.regular}
        placeholderColor={photo.color}
        alt="placeholder"
        />
      <div className={styles.photostat}>{`${photo.likes} likes`}</div>
    </div>
  );
}
