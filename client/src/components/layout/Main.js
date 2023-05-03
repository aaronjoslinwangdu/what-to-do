import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Styles
import styles from '../../assets/css/layout/Main.module.css';

// Components
import MainColumn from './MainColumn';
import { itemActions } from '../../store/items/itemSlice';
import { useGetUserItemsQuery } from '../../store/items/itemsApiSlice';


const Main = () => {
  const dispatch = useDispatch();
  const items = useSelector(state => state.item.items);
  const user = useSelector(state => state.auth.user);
  const { data: itemsList, isLoading, isSuccess, isError, error } = useGetUserItemsQuery(user.id);
  
  let columns = [];

  if (isLoading) {
    return <div>Loading...</div>
  } else if (isError) {
    console.log(error)
    return <div>Error...</div>
  } else {


    dispatch(itemActions.setItems(itemsList));

    let itemsColumns = [[],[],[]];


    if (items && items.length !== 0) {
      for (let i = 0; i < items.length; i++) {
        itemsColumns[items[i].status].push(items[i]);
      }
    }

    columns = itemsColumns.map((itemsInCol, index) => {
  
      let columnLabel;
      switch(index) {
        case 0: columnLabel = 'To Do'; break;
        case 1: columnLabel = 'In Progress'; break;
        case 2: columnLabel = 'Done'; break;
      }
  
      return <MainColumn key={index} label={columnLabel} items={itemsInCol} />
  
    });
  }


  return (
    <div className={styles.main}>
      {columns}
    </div>
  );
};

export default Main;