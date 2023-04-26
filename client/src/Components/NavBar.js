import { Outlet, Link } from "react-router-dom";
import './NavBar.css';
import { postJobs } from '../api.service';
//Don't forget to show results
const NavBar = ({ setSearchResults }) => {

  const handleSearch = async (event) => {
    console.log("Quick Search: ", event.target.elements.search.value);
    const newQuickSearch = {
      searchString: event.target.elements.search.value
    }
    const temp = await postJobs(newQuickSearch);
    console.log(temp.length)
    setSearchResults([...temp]);

    //event.preventDefault();
  }
  return (
      <div className="appBackground">
        <nav className="navBarNav">
          <ul>
            <li>
            <form onSubmit={handleSearch}>
              <input type="text" name="search" placeholder="quick search..." />
              <button type="submit">Search</button>
            </form>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/jobs/1">Job Results</Link>
            </li>
            <li>
              <Link to="/loading">Loading Screen</Link>
            </li>
            <li>
              <Link to="/search">Advanced Search</Link>
            </li>
            <li>
              <Link to="/login">Log In</Link>
            </li>
          </ul>
        </nav>

        <Outlet />
      </div>

  )
};

export default NavBar;