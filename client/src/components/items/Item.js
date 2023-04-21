import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

// Styles
import styles from '../../assets/css/items/Item.module.css';

// Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { showDeleteItemForm, setItemToDelete } from '../../store/layout/layoutSlice';


const Item = (props) => {
  const dispatch = useDispatch();
  const item = props.item;
  const [isEditingLabel, setIsEditingLabel] = useState(false);
  const [isEditingDesc, setIsEditingDesc] = useState(false);
  const [label, setLabel] = useState(item.label);
  const [description, setDescription] = useState(item.description);

  const deleteItemHandler = () => {
    dispatch(showDeleteItemForm());
    dispatch(setItemToDelete(item._id));
  }

  const editItemHandler = () => {
    setIsEditingLabel(!isEditingLabel);
  }

  const changeLabelHandler = (event) => {
    setLabel(event.target.value);
    console.log(label)
  }



  return (
    <div className={styles.item}>
      <div className={styles.itemHeader}>
        {!isEditingLabel && <div className={styles.itemLabel}>{label}</div>}
        {isEditingLabel && <input className={styles.editLabel} type="text" value={label} onChange={changeLabelHandler}></input>}
        <FontAwesomeIcon 
          className={styles.itemEdit}
          onClick={editItemHandler}
          icon={faPenToSquare} 
          />
        <FontAwesomeIcon 
          className={styles.itemDelete} 
          onClick={deleteItemHandler}
          icon={faTrashCan} 
        />
      </div>
      <div className={styles.itemDesc}>{item.description}</div>
    </div>
  );
};

export default Item;