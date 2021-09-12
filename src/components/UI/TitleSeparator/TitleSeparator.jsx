import React from 'react';

import styles from './TitleSeparator.module.sass'

const TitleSeparator = ({title}) => {
  return (
    <div className={styles.titleSeparator}>
      <div className={styles.title}>
        <div className={styles.content}>
          {title}
        </div>
      </div>
    </div>
  );
};

export default TitleSeparator;