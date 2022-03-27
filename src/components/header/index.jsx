import { Nav } from './nav';

export const Header = ({ navItems }) => {
  return (
    <header>
      <Nav navItems={navItems} />
    </header>
  )
};
