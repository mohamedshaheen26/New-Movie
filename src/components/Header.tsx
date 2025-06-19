import NavBar from "./NavBar";

const Header = () => {
  return (
    <div className='header'>
      <div className='container d-flex justify-content-between align-items-center'>
        <div className='header-left'>
          <img src='/logo.png' alt='Logo' className='logo' />
        </div>
        <div className='header-right'>
          <NavBar />
        </div>
      </div>
    </div>
  );
};

export default Header;
