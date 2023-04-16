import React from 'react';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { sidebarHovered, sidebarNotHovered } from '../../store/layout/layoutSlice';

// Components
import Brand from './Brand';
import Date from './Date';
import Add from './Add';
import Select from './Select';
import Reorder from './Reorder';
import Change from './Change';

// Styles
import styles from '../../assets/css/layout/Sidebar.module.css';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <Brand />
      <Date />
      <Add/>
      <Select />
      <Reorder />
      <Change />
    </div>
  );
};

export default Sidebar;