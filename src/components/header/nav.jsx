import { useState } from 'react';

import { NavItem } from './nav_item';

export const Nav = ({ navItems }) => {
  const [activeItem, setActiveItem] = useState(null);

  const changeActiveItem = (item) => setActiveItem(item);

  return (
    <nav>
      <ul>
        { navItems.map(item => {
          return !item.disabled ? (
            <NavItem
              key={item.slug}
              active={item.slug === activeItem?.slug}
              item={item}
              onClick={changeActiveItem}
            />
          ) : null;
        })}
      </ul>
    </nav>
  );
};
