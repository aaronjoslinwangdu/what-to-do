import React from 'react';

// Styles
import styles from '../../assets/css/layout/MainColumn.module.css';

// Components
import Item from '../items/Item';


const MainColumn = (props) => {
  const items = props.items;

  let itemList = [];
  itemList = items.map((itemObj) => {
    return <Item key={itemObj._id} item={itemObj} />
  });

  return (
    <div className={styles.mainColumn}>
      <div className={styles.columnLabel}>{props.label}</div>
      {itemList}
    </div>
  );
};

export default MainColumn;