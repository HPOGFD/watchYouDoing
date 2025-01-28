import { useState, useEffect, useCallback } from 'react';
import { NavLink, Link } from 'react-router-dom';
import AuthService from '../utils/auth';

const Nav = () => {
  const [loginCheck, setLoginCheck] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkLogin = useCallback(() => {
    const isLoggedIn = AuthService.loggedIn();
    setLoginCheck(isLoggedIn);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    checkLogin();

    const handleStorageChange = () => {
      checkLogin();
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [checkLogin]);

  if (isLoading) {
    return <div>Loading...</div>; // Or any loading indicator
  }

  return (
    <nav>
      <h1>
        <Link to='/' id='logo'>
          Film Tracker
        </Link>
      </h1>
      <ul className='nav nav-tabs'>
        <li className='nav-item'>
          <h2>
            <NavLink to='/' className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} end>
              HOME
            </NavLink>
          </h2>
        </li>
        <li className='nav-item'>
          <h2>
            <NavLink to='/watchList' className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              WATCH LIST
            </NavLink>
          </h2>
        </li>
        <li className='nav-item'>
          <h2>
            <NavLink to='/seenIt' className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              SEEN IT
            </NavLink>
          </h2>
        </li>
        {
          !loginCheck ? (
            <li className='nav-item'>
              <h2>
                <NavLink to='/login' className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                  LOGIN
                </NavLink>
              </h2>
            </li>
          ) : (
            <li className='nav-item'>
              <h2>
                <button type='button' onClick={() => {
                  AuthService.logout();
                  setLoginCheck(false);
                }} className='nav-link'>LOGOUT</button>
              </h2>
            </li>
          )
        }
      </ul>
    </nav>
  );
};

export default Nav;
