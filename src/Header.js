import NavBar from './NavBar';

const Header = ({ title }) => {
  return (
    <header className='Header'>
      <h1>{title}</h1>
      <NavBar />
    </header>
  );
};

export default Header;