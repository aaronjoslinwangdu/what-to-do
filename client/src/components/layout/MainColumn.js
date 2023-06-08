import React from 'react';

// Styles
import styles from '../../assets/css/layout/MainColumn.module.css';

// Components
import Item from '../items/Item';
import Add from './Add';


const MainColumn = ({ key, status, items }) => {

  let columnLabel;
  switch(status) {
    case 0: columnLabel = 'To Do'; break;
    case 1: columnLabel = 'In Progress'; break;
    case 2: columnLabel = 'Done'; break;
  }


  let itemList = [];
  itemList = items.map((itemObj) => {
    return <Item key={itemObj._id} item={itemObj} />
  });

  return (
    <div className={styles.mainColumn}>
      <div className={styles.columnLabel}>{columnLabel}</div>
      {itemList}
      <Add type={'column'} status={status}/>
    </div>
  );
};

export default MainColumn;