import React from 'react';

// Styles
import styles from '../../assets/css/items/Item.module.css';

// Components



const Item = () => {
  return (
    <div className={styles.item}>
      <div className={styles.itemLabel}>Label</div>
      <div className={styles.itemDesc}>This is a super duper long description that should be cut off once I'm done styling this. This is a super duper long description that should be cut off once I'm done styling this. This is a super duper long description that should be cut off once I'm done styling this. This is a super duper long description that should be cut off once I'm done styling this. This is a super duper long description that should be cut off once I'm done styling this. This is a super duper long description that should be cut off once I'm done styling this.</div>
    </div>
  );
};

export default Item;