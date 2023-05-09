import React from 'react';

// Styles
import styles from '../../assets/css/layout/Spinner.module.css';

const Spinner = () => {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner}></div>
    </div>
  );
}

export default Spinner;