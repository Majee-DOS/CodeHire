import React, { useEffect, useState } from 'react';
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Home from "./Components/Home";
import JobList from "./Components/JobList";
import Login from "./Components/Login";
import NoPage from "./Components/NoPage";
import Loading from "./Components/Loading";
import { getJobs } from './api.service';
//import { useParams } from 'react-router-dom';
//import { useContext } from 'react';

export const UserContext = React.createContext();
const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [counter, setCounter] = useState(1);

  const refreshJobs = () => {
    getJobs().then(data => setSearchResults(data));
  }

  useEffect(() => {
    refreshJobs();
  }, []);

  //fix job/path to work with handlebars
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Home />} />
          <Route path="jobs/:jobPageNum" element=
            {<UserContext.Provider value={searchResults}>
              <JobList counter={counter} setCounter={setCounter}></JobList>
            </UserContext.Provider>} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NoPage />} />
          <Route path="jobs/0" element={<NoPage />} />
          <Route path="loading" element={<Loading />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;