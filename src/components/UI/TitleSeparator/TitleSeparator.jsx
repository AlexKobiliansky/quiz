import React from 'react';
import PropTypes from 'prop-types';
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

TitleSeparator.propTypes = {
  title: PropTypes.string.isRequired
}

export default TitleSeparator;