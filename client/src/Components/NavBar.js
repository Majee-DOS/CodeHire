import { Outlet, Link } from "react-router-dom";
import './NavBar.css';
import { postJobs } from '../api.service';
//Don't forget to show results
const NavBar = () => {

  const handleSearch = (event) => {
    console.log("Quick Search: ", event.target.elements.search.value);
    const newQuickSearch = {
      searchString: event.target.elements.search.value
    }
    postJobs(newQuickSearch);
    event.preventDefault();
  }
  return (
    <>
      <body className="navBarBackground">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/jobs/1">Job Results</Link>
            </li>
            <li>
              <Link to="/login">Log In</Link>
            </li>
            <li>
              <Link to="/loading">Loading Screen</Link>
            </li>
            <li>
              <Link to="/search">Search</Link>
            </li>
            <form onSubmit={handleSearch}>
              <input type="text" name="search" placeholder="quick search..." />
              <button type="submit">Search</button>
            </form>
          </ul>
        </nav>
      </body>

      <Outlet />
    </>
  )
};

export default NavBar;