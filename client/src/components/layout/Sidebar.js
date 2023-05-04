import React from 'react';

// Styles
import styles from '../../assets/css/layout/Sidebar.module.css';

// Components
import Brand from './Brand';
import Date from './Date';
import Add from './Add';
import Select from './Select';
import Profile from './Profile';
import Logout from './Logout';


const Sidebar = () => {

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarBrand}>
        <Brand />
      </div>
      <div className={styles.sidebarItems}>
        <Add/>
        <Select />
        <Profile />
        <Logout />
      </div>
    </div>
  );
};

export default Sidebar;