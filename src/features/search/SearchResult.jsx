import React from 'react';
import styles from './Search.module.css';

const SearchResult = ({result, key}) => {
  const {title, subtitle, image} = result

  return (
    <div className={styles.box} key={key}>
      <div className={styles.imageContainer}>
        <img width='50' src={image} alt={title} />
      </div>
      <div>
        <h4>{title}</h4>
        <p>{subtitle}</p>
      </div>
    </div>
  );
}

export default SearchResult;