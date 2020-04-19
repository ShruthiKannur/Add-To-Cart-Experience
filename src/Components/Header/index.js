import React from 'react';
import './header.css';
import Favourite from '../Favourite';
import SearchBox from '../SearchBox';
import Cart from '../Cart';
import { useLocation } from 'react-router-dom';
import '../../themes/commonThemes.css';

export default function Header(prop) {
  const location = useLocation();
  return (
    <ul className="header__ul displayInColumn flexWithSpace listStyle">
      <li>
        <Favourite />
      </li>
      <li>
        <ul className="listStyle displayInColumn">
          <li className="header__li">
            <SearchBox />
          </li>
          {location.pathname!="/Cart" && <li className="header_liCart">
            <Cart />
          </li>}
        </ul>
      </li>
    </ul>
  );
}
