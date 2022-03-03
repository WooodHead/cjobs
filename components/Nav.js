import Link from 'next/link';
import classes from '../styles/Nav.module.css';

const Nav = () => {
  return (
    <nav className={classes.nav}>
      <ul>
        <li>
          <Link href='/'>
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href='/aboutus'>
            <a>About us</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
