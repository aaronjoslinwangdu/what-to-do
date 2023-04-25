import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Styles
import styles from '../../assets/css/layout/Main.module.css';

// Components
import MainColumn from './MainColumn';
import { getItems } from '../../utils/Api';
import { itemActions } from '../../store/items/itemSlice';
import { sessionActions } from '../../store/session/sessionSlice';


// should get items in this component
const Main = () => {
  const dispatch = useDispatch();
  const items = useSelector(state => state.item.items);
  const isAuthenticated = useSelector(state => state.session.isAuthenticated);

  useEffect(() => {
    const getItemList = async () => {
      const itemList = await getItems();
      dispatch(itemActions.setItems(itemList));
    }
    getItemList();
  }, [items, isAuthenticated]);


  let itemsColumns = [[],[],[]];
  if (items.length !== 0) {
    for (let i = 0; i < items.length; i++) {
      itemsColumns[items[i].status].push(items[i]);
    }
  }

  
  let columns = [];
  columns = itemsColumns.map((itemsInCol, index) => {

    let columnLabel;
    switch(index) {
      case 0: columnLabel = 'To Do'; break;
      case 1: columnLabel = 'In Progress'; break;
      case 2: columnLabel = 'Done'; break;
    }

    return <MainColumn key={index} label={columnLabel} items={itemsInCol} />

  });


  return (
    <div className={styles.main}>
      {columns}
    </div>
  );
};

export default Main;