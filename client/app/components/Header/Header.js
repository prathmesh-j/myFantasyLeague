import React from 'react';

import { Link } from 'react-router-dom';

const Header = () => (
  <div className='menu-container'>
    <div className='menu'>
      <div className='date'>Aug 14, 2016</div>
      <div className='links'>
        <div className='signup'>Sign Up</div>
        <div className='login'>Login</div>
      </div>
    </div>
  </div>
);

export default Header;
