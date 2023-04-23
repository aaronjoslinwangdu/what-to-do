import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';

// Styles
import styles from '../../assets/css/items/Item.module.css';

// Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faPenToSquare, faSquareCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import { showDeleteItemForm, setItemToDelete } from '../../store/layout/layoutSlice';
import { updateItem } from '../../utils/Api';
import { itemActions } from '../../store/items/itemSlice';


const Item = (props) => {
  const dispatch = useDispatch();
  const [item, setItem] = useState(props.item);
  const [uneditedItem, setUneditedItem] = useState(item);
  const [isEditingLabel, setIsEditingLabel] = useState(false);
  const [isEditingDesc, setIsEditingDesc] = useState(false);

  const deleteItemHandler = () => {
    dispatch(showDeleteItemForm());
    dispatch(setItemToDelete(item._id));
  }

  const editItemHandler = () => {
    setUneditedItem(item);
    setIsEditingLabel(true);
    setIsEditingDesc(true);
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
  }
  
  const saveItemHandler = async () => {
    const savedItem = await updateItem(item);
    dispatch(itemActions.updateItem(savedItem));
    setIsEditingLabel(false);
    setIsEditingDesc(false);
  }


  return (
    <div className={styles.item}>
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
          type="text" value={item.description} 
          name="description"
          onChange={changeHandler}
        >
        </input>
      }
    </div>
  );
};

export default Item;