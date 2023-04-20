import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Styles
import styles from '../../assets/css/items/AddItemForm.module.css';

// Components 
import { hideAddItemForm } from '../../store/layout/layoutSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'


const AddItemForm = () => {
  const dispatch = useDispatch();
  const showAddItemForm = useSelector(state => state.layout.showAddItemForm);

  const [formState, setFormState] = useState({
    label: "",
    description: "",
    date: "", 
    folder: "",
    status: "",
    userId: 1
  });

  const cancelHandler = (event) => {
    event.preventDefault();
    dispatch(hideAddItemForm());
  }
  

  return (
    <form className={styles.form} onSubmit={console.log('afd')}>
      <div>
        <div className={styles.formHeader}>
          <h2>Add item</h2>
          <FontAwesomeIcon className={styles.exitIcon} icon={faXmark} size='2x' onClick={cancelHandler}/>
        </div>
        <div>
          <label htmlFor='label'>
            Label
            <span> *</span>
            </label>
          <input type='text' id='label'></input>
        </div>
        <div>
          <label htmlFor='description'>Description</label>
          <textarea id='description' rows='4' cols='20'></textarea>
        </div>
        <div>
          <label htmlFor='date'>Date</label>
          <input type='text' id='date'></input>
        </div>
        <div className={styles.selectGroup}>
          <label htmlFor='status'>Status</label>
          <select name='status' id='status'>
            <option value={0}>To-Do</option>
            <option value={1}>In Progress</option>
            <option value={2}>Done</option>
          </select>
        </div>
        <div className={styles.selectGroup}>
          <label htmlFor='folder'>Folder</label>
          <select name='folder' id='folder'>
            <option value={1}>Folder 1</option>
            <option value={2}>Folder 2</option>
            <option value={3}>Folder 3</option>
          </select>
        </div>
      </div>
      <div className={styles.buttonGroup}>
        <div onClick={cancelHandler}>Cancel</div>
        <button type='submit'>Create</button>
      </div>
    </form>
  );
};

export default AddItemForm;