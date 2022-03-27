export const NavItem = ({
  active,
  item,
  onClick,
}) => {
  const clickHandler = () => onClick(item);

  return (
    <li className={active && 'active'}>
      <a href={`#${item.slug}`} onClick={clickHandler}>
        {item.title}
      </a>
    </li>
  );
};
