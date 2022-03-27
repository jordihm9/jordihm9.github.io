import { useState } from 'react';

import { NavItem } from './nav_item';

export const Nav = ({ locationSlug, navItems }) => {
  const [currentPage, setCurrentPage] = useState(locationSlug);

  const changeActiveItem = (slug) => setCurrentPage(slug);

  return (
    <nav>
      <ul>
        { navItems.map(item => {
          return !item.disabled ? (
            <NavItem
              key={item.slug}
              active={item.slug === currentPage}
              item={item}
              onClick={changeActiveItem}
            />
          ) : null;
        })}
      </ul>
    </nav>
  );
};
