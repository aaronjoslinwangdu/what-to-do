import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Styles
import styles from '../../assets/css/layout/Main.module.css';

// Components
import MainColumn from './MainColumn';
import { itemActions } from '../../store/items/itemSlice';
import { useGetItemsQuery } from '../../store/items/itemsApiSlice';


// should get items in this component
const Main = () => {
  const dispatch = useDispatch();
  const items = useSelector(state => state.item.items);
  const { data: itemsList, isLoading, isSuccess, isError, error } = useGetItemsQuery();

  useEffect(() => {
    if (itemsList) {
      dispatch(itemActions.setItems(itemsList));
    }
  }, [itemsList]);

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