import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';

// Styles
import styles from '../../assets/css/items/Item.module.css';

// Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faTrashCan, 
  faPenToSquare, 
  faSquareCheck, 
  faXmark, 
  faChevronLeft, 
  faChevronRight 
} from '@fortawesome/free-solid-svg-icons'
import { showDeleteItemForm, setItemToDelete } from '../../store/layout/layoutSlice';
import { updateItem } from '../../utils/Api';
import { itemActions } from '../../store/items/itemSlice';


const Item = (props) => {
  const dispatch = useDispatch();
  const [item, setItem] = useState(props.item);
  const [uneditedItem, setUneditedItem] = useState(item);
  const [isEditingLabel, setIsEditingLabel] = useState(false);
  const [isEditingDesc, setIsEditingDesc] = useState(false);
  const [isEditingStatus, setIsEditingStatus] = useState(false);

  const deleteItemHandler = () => {
    dispatch(showDeleteItemForm());
    dispatch(setItemToDelete(item));
  }

  const editItemHandler = () => {
    setUneditedItem(item);
    setIsEditingLabel(true);
    setIsEditingDesc(true);
    setIsEditingStatus(true);
  }


  const editLabelHandler = () => {
    setUneditedItem(item);
    setIsEditingLabel(true);
  }

  const editDescriptionHandler = () => {
    setUneditedItem(item);
    setIsEditingDesc(true);
  }

  const changeHandler = (event) => {
    setItem(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }))
  }

  const cancelHandler = () => {
    setItem(uneditedItem);
    setIsEditingLabel(false);
    setIsEditingDesc(false);
    setIsEditingStatus(false);
  }
  
  const saveItemHandler = async () => {
    const savedItem = await updateItem(item);
    setIsEditingLabel(false);
    setIsEditingDesc(false);
    setIsEditingStatus(false);
    dispatch(itemActions.updateItem(savedItem));
  }

  const moveItemLeftHandler = async () => {
    if (item.status !== 0) {
      let tempItem = {...item, status: item.status - 1};
      const savedItem = await updateItem(tempItem);
      dispatch(itemActions.updateItem(savedItem));
    }
  }

  const moveItemRightHandler = async () => {
    if (item.status !== 2) {
      let tempItem = {...item, status: item.status + 1};
      const savedItem = await updateItem(tempItem);
      dispatch(itemActions.updateItem(savedItem));
    }
  }


  const leftStyles = item.status !== 0 ? `${styles.itemNavEnabled}` : `${styles.itemNavDisabled}`;
  const rightStyles = item.status !== 2 ? `${styles.itemNavEnabled}` : `${styles.itemNavDisabled}`;
  const leftNavSection = item.status !== 0 ? `${styles.navSectionEnabled}` : `${styles.navSectionDisabled}`;
  const rightNavSection = item.status !== 2 ? `${styles.navSectionEnabled}` : `${styles.navSectionDisabled}`;

  return (
    <div className={styles.item}>
      <div className={leftNavSection} onClick={moveItemLeftHandler}>
        <FontAwesomeIcon className={leftStyles} icon={faChevronLeft} />
      </div>
      <div className={styles.itemContent}>
        <div className={styles.itemHeader}>
          {!isEditingLabel && 
            <div 
              className={styles.itemLabel} 
              onClick={editLabelHandler}
            >
              {item.label}
            </div>
          }
          {isEditingLabel && 
            <input 
              className={styles.editLabel} 
              type="text" 
              name="label"
              value={item.label} 
              onChange={changeHandler}
            >
            </input>
          }
          {isEditingStatus &&
            <select 
              name='status' 
              id='status'
              value={item.status}
              onChange={changeHandler}
              className={styles.editStatus}
            >
              <option value={0}>To Do</option>
              <option value={1}>In Progress</option>
              <option value={2}>Done</option>
            </select>
          }
          {!isEditingDesc && !isEditingLabel &&
            <FontAwesomeIcon 
              className={styles.itemEdit}
              onClick={editItemHandler}
              icon={faPenToSquare} 
            />
          }
          {(isEditingDesc || isEditingLabel) &&
            <Fragment>
              <FontAwesomeIcon
                className={styles.itemCancel}
                onClick={cancelHandler}
                icon={faXmark}
              />
              <FontAwesomeIcon 
                className={styles.itemSave}
                onClick={saveItemHandler}
                icon={faSquareCheck} 
              />
            </Fragment>
          }
          <FontAwesomeIcon 
            className={styles.itemDelete} 
            onClick={deleteItemHandler}
            icon={faTrashCan} 
          />
        </div>
        <div>
          {!isEditingDesc &&
            <div 
              className={styles.itemDesc}
              onClick={editDescriptionHandler}
            >
              {item.description}
            </div>
          }
          {isEditingDesc &&
            <input 
              className={styles.editDescription} 
              type="text" 
              value={item.description} 
              name="description"
              onChange={changeHandler}
            >
            </input>
          }
        </div>
      </div>
      <div className={rightNavSection} onClick={moveItemRightHandler}>
        <FontAwesomeIcon className={rightStyles} icon={faChevronRight} />
      </div>
    </div>
  );
};

export default Item;