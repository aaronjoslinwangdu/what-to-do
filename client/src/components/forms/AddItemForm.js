import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Styles
import styles from '../../assets/css/forms/AddItemForm.module.css';
import "react-datepicker/dist/react-datepicker.css";

// Components 
import { itemActions } from '../../store/items/itemSlice';
import { layoutActions } from '../../store/layout/layoutSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { useAddItemMutation } from '../../store/items/itemsApiSlice';
import DatePicker from 'react-datepicker';

const AddItemForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const items = useSelector(state => state.item.items);
  const [addItem, { isLoading }] = useAddItemMutation();
  const [formErrors, setFormErrors] = useState({ label: null });


  useEffect(() => {
    setFormState({ ...formState, userId: user.id });
  }, [user]);

  const [formState, setFormState] = useState({
    label: "",
    description: "",
    date: new Date(), 
    folder: 1,
    status: 0,
    userId: user.id
  });

  const cancelHandler = (event) => {
    event.preventDefault();
    dispatch(layoutActions.setShowAddItemForm(false));
  }

  const changeHandler = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value
    });
    setFormErrors({
      ...formErrors,
      [event.target.name]: null,
    });
  }

  const submitHandler = async (event) => {
    event.preventDefault();

    // validation

    if (formState.label === '') {
      setFormErrors({ ...formErrors, label: true });
      setFormState({ ...formState, label: ''});
      return;
    }


    console.log(formState.date);



    const addedItem = await addItem(formState).unwrap();
    dispatch(itemActions.addItem(addedItem));
    dispatch(layoutActions.setShowAddItemForm(false));
  }
  

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div>

        <div className={styles.formHeader}>
          <h2>Add item</h2>
          <FontAwesomeIcon className={styles.exitIcon} icon={faXmark} size='2x' onClick={cancelHandler}/>
        </div>

        <div>
          <label className={styles.labelRow} htmlFor='label'>
            Label{' '}
            <div className={styles.asterisk}>*</div>
            {formErrors.label && <div className={styles.errorMessage}>Please enter a Label</div>}
          </label>
          <input 
            className={formErrors.label ? `${styles.error}` : ''}
            autoFocus
            name='label' 
            type='text' 
            id='label'
            value={formState.label}
            onChange={changeHandler}
          />
        </div>

        <div>
          <label htmlFor='description'>Description</label>
          <textarea 
            name='description' 
            id='description' 
            rows='4' 
            cols='20'
            value={formState.description}
            onChange={changeHandler}
          />
        </div>

        <div className={styles.selectGroup}>
          <label>Date</label>
          <DatePicker 
            selected={formState.date}
            minDate={new Date()}
            onChange={(date) => setFormState({ ...formState, date: date })}
          />
        </div>

        <div className={styles.selectGroup}>
          <label htmlFor='status'>Status</label>
          <select 
            name='status' 
            id='status'
            value={formState.status}
            onChange={changeHandler}
          >
            <option value={0}>To Do</option>
            <option value={1}>In Progress</option>
            <option value={2}>Done</option>
          </select>
        </div>

        <div className={styles.selectGroup}>
          <label htmlFor='folder'>Folder</label>
          <select 
            name='folder' 
            id='folder'
            value={formState.folder}
            onChange={changeHandler}
          >
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