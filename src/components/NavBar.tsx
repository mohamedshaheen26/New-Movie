import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className='navbar d-flex justify-content-between align-items-center'>
      <ul className='d-flex justify-content-between align-items-center'>
        <li>
          <Link to='/' className='nav-link'>
            New Movie
          </Link>
        </li>
        <li>
          <Link to='/' className='nav-link'>
            Genre
          </Link>
        </li>
        <li>
          <Link to='/' className='nav-link'>
            Country
          </Link>
        </li>
        <li>
          <Link to='/' className='nav-link'>
            Movie
          </Link>
        </li>
        <li>
          <Link to='/' className='nav-link'>
            TV Series
          </Link>
        </li>
        <li>
          <button>
            <i className='fa-solid fa-magnifying-glass'></i>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
