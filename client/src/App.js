import React from 'react';

// Components
import Navigation from './components/layout/Navigation';
import Main from './components/layout/Main';
import Sidebar from './components/layout/Sidebar';

// Fonts
import './assets/css/fonts.css';

// Styles
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.regionSidebar}>
      <Sidebar />
      <div className={styles.regionContent}>
        <Navigation />
        <Main />
      </div>
    </div>
  );
}

export default App;
