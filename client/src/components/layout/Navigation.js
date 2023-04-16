import React from 'react';

import styles from '../../assets/css/layout/Navigation.module.css';

const NavigationTop = () => {
  return (
    <nav className={styles.navigation}>
      <div className={styles.brand}>
        <span className={styles.what}>What</span>
        <span className={styles.to}>To</span>
        <span className={styles.do}>Do</span>
      </div>
      <div>Login</div>
    </nav>
  );
};

export default NavigationTop;