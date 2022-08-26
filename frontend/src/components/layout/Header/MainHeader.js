import { NavLink } from 'react-router-dom';

import { useSelector } from 'react-redux';

import classes from './MainHeader.module.css';

const MainHeader = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  return (
    <header className={classes.header}>
      <nav>
        <ul>
          <li>
            <NavLink
              className={(navData) => (navData.isActive ? classes.active : '')}
              to='/'
            >
              Welcome
            </NavLink>
          </li>

          <li>
            <NavLink
              className={(navData) => (navData.isActive ? classes.active : '')}
              to='/products'
            >
              Products
            </NavLink>
          </li>

          <li>
            <NavLink
              className={(navData) => (navData.isActive ? classes.active : '')}
              to='/about'
            >
              About
            </NavLink>
          </li>

          <li>
            <NavLink
              className={(navData) => (navData.isActive ? classes.active : '')}
              to='/contact'
            >
              Contact
            </NavLink>
          </li>

          {!isAuthenticated && (
            <li>
              <NavLink
                className={(navData) =>
                  navData.isActive ? classes.active : ''
                }
                to='/login'
              >
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
