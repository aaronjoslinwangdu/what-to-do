import React from 'react';

import styles from '../../assets/css/layout/Brand.module.css';

const Brand = () => {
  return (
    <div className={styles.brand}>
      <span className={styles.what}>W</span>
      <span className={styles.to}>T</span>
      <span className={styles.do}>D</span>
    </div>
  );
};

export default Brand;