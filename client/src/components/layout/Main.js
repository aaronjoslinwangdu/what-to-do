import React from 'react';

// Styles
import styles from '../../assets/css/layout/Main.module.css';

// Components
import Item from '../items/Item';


const Main = () => {
  return (
    <div className={styles.main}>
      <Item />
    </div>
  );
};

export default Main;