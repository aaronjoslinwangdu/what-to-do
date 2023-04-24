import React from 'react';

import styles from '../../assets/css/layout/Brand.module.css';

const Brand = () => {
  return (
    <div className={styles.brand}>
      <span className={styles.what}>What</span>
      <span className={styles.to}>To</span>
      <span className={styles.do}>Do</span>
    </div>
  );
};

export default Brand;