import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav>
      <ul className='nav-links'>
        <Link to='/'>Home</Link>
        <Link to='/about'>About</Link>
        <Link to='/donate'>Donate</Link>
      </ul>      
    </nav>
  );
};

export default NavBar;