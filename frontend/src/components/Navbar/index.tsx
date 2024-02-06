import React from "react";
//import React, { ChangeEvent } from "react";
import { useState } from "react";

import styles from "./Navbar.module.css";

/*export interface NavbarProps {
    onSearch: any
}*/

const Navbar = (onSearch: any): React.JSX.Element => { 
  const [search, setSearch] = useState('');

  const handleInputChange = (evt: any) => {
      setSearch(evt.target.value);
  }

  const handleInputKeyDown = (evt: any) => {
      if (evt.key = 'Enter') {
          onSearch(search);
      }
  }

  return (
    <div className={styles.navbarContainer}>
      <div className={styles.navbarAppTitleContainer}>
        <p className={styles.navbarAppTitleText}>Mi Blog</p>
      </div>
      <div className={styles.navbarSearchContainer}>
        <input
          placeholder="Buscar en el blog"
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          value={search}
          className={styles.navbarSearchInput}
        />
        {/*<Link to="/profile/my-info" style={{
          marginLeft: 24,
          color: '#fff',
          textDecoration: 'none'
        }}>Mi perfil</Link>*/}
      </div>
    </div>
  );
};

export default Navbar;