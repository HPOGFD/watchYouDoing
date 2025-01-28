import { NavLink } from 'react-router-dom';

const Nav = () => (
  <nav>
    <h1>
      <NavLink to='/' id='logo'>
        Film Tracker
      </NavLink>
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
      <li className='nav-item'>
        <h2>
          <NavLink to='/login' className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            LOGIN
          </NavLink>
        </h2>
      </li>
    </ul>
  </nav>
);

export default Nav;
