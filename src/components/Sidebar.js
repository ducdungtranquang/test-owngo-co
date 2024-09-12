import React from 'react';
import { stores } from '../ultils/data';

const Sidebar = ({ isOpen, toggleSidebar, setIsOpen, setSelectedStore }) => {
  return (
    <>
      <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
        {isOpen ? 'Close Menu' : 'Open Menu'}
      </button>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <h2>Milk Tea Store</h2>
        {stores?.map(store => (
          <ul key={store.id}>
            <li onClick={() => {
              setIsOpen(false)
              setSelectedStore(store.id)
            }}>{store.name}</li>
          </ul>
        ))}
      </div>
    </>
  );
};

export default Sidebar;
