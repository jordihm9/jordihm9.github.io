import { Nav } from './nav';

export const Header = ({ location, navItems }) => {
  return (
    <header>
      <Nav navItems={navItems} locationSlug={location} />
    </header>
  )
};
