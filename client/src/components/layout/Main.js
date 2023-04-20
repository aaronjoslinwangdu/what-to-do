import React, { useEffect } from 'react';
import { getItems, getItem, updateItem, deleteItem } from '../../utils/Api';

// Styles
import styles from '../../assets/css/layout/Main.module.css';

// Components
import Item from '../items/Item';

const DUMMY_ITEM = {
  _id: '6441b25cb5f8079b70f34e1f',
  label: 'dummy',
  description: 'dummy desc',
  date: '04-20-2023',
  userId: 1,
  folder: 2,
  status: 2
}

const Main = () => {

  useEffect(() => {
    const testFn = async () => {
      const itemList = await deleteItem(DUMMY_ITEM._id);
      console.log(itemList);
    }
    testFn();
  }, []);

  return (
    <div className={styles.main}>
      <Item />
    </div>
  );
};

export default Main;