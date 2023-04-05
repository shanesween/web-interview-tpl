import React from 'react';
import styles from './Search.module.css';

const SearchResult = ({result, width = '50'}) => {
  const {id, title, subtitle, image} = result

  return (
    <div className={styles.box} key={id}>
      <div className={styles.imageContainer}>
        <img width={width} src={image} alt={title} />
      </div>
      <div>
        <h4>{title}</h4>
        <p>{subtitle}</p>
      </div>
    </div>
  );
}

export default SearchResult;