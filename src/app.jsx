import { Header } from './components/header';
import { Main } from './components/main';

import './css/styles.css';

const navItems = [
  {
    slug: 'who-am-i',
    title: 'Who am I?',
    disabled: false,
  },
  {
    slug: 'skills',
    title: 'Skills',
    disabled: false,
  },
  {
    slug: 'projects',
    title: 'Projects',
    disabled: false,
  },
  {
    slug: 'contact',
    title: 'Contact',
    disabled: false,
  },
];

export const App = () => {
  return (
    <>
      <Header navItems={navItems} />
      <Main />
    </>
  );
};
