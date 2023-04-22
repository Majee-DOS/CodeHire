import React, { useEffect, useState } from 'react';
//import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Home from "./Components/Home";
import JobList from "./Components/JobList";
import Login from "./Components/Login";
import NoPage from "./Components/NoPage";
import Loading from "./Components/Loading";
import { getJobs } from './api.service';

const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [counter, setCounter] = useState(0);

  const generateCounter = () => {
    setCounter(counter + 25);
  }

//use this when next page is clicked in JobList
//onClick={generateCounter}
  const refreshJobs = () => {
    getJobs().then(data => setSearchResults(data));
    // const jobs = searchResults;
    // setSearchResults(jobs);
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
          <Route path="jobs/:jobPageNum" element={<JobList jobs={searchResults.slice(counter,counter+25)}></JobList>} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NoPage />} />
          <Route path="loading" element={<Loading />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
