import React, { useEffect, useState } from 'react';
import { getItems, getItem, updateItem, deleteItem } from '../../utils/Api';

// Styles
import styles from '../../assets/css/layout/Main.module.css';

// Components
import Item from '../items/Item';
import MainColumn from './MainColumn';

const DUMMY_ITEM = {
  _id: '6441b25cb5f8079b70f34e1f',
  label: 'dummy',
  description: 'dummy desc',
  date: '04-20-2023',
  userId: 1,
  folder: 2,
  status: 2
}


// should get items in this component
const Main = () => {

  const [items, setItems] = useState([]);

  useEffect(() => {
    const getItemList = async () => {
      const itemList = await getItems();
      setItems(itemList);
    }
    getItemList();
  }, []);

  console.log(items);

  let itemsColumns = [[],[],[]];
  if (items.length !== 0) {
    for (let i = 0; i < items.length; i++) {
      itemsColumns[items[i].status].push(items[i]);
    }
  }


  let columns = [];
  columns = itemsColumns.map((itemsInCol, index) => {
    console.log(index);

    let columnLabel;
    switch(index) {
      case 0: columnLabel = 'To Do'; break;
      case 1: columnLabel = 'In Progress'; break;
      case 2: columnLabel = 'Done'; break;
    }

    return <MainColumn key={index} label={columnLabel} items={itemsInCol} />

  });


  console.log(itemsColumns);
  console.log(columns);

  return (
    <div className={styles.main}>
      {columns}
    </div>
  );
};

export default Main;