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

import { useParams } from 'react-router-dom';

const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [jobsLength, setJobsLength] = useState(0);
  const [counter, setCounter] = useState(1);
  // const [pageNum, setPageNum] = useState(1);

  // const { jobPageNum } = useParams();
  // setPageNum(parseInt(jobPageNum));

  
  // const { jobPageNum } = useParams();
  // const jobNum = parseInt(jobPageNum);

  // const generateCounter = () => {
  //   setCounter(counter + 25);
  // }

//use this when next page is clicked in JobList
//onClick={generateCounter}
  const refreshJobs = () => {
    getJobs().then(data => setSearchResults(data));
    // const jobs = searchResults;
    // setSearchResults(jobs);
  }

  const refreshJobsLength = () => {
    setJobsLength(searchResults.length);
  }

  useEffect(() => {
    refreshJobs();
    refreshJobsLength();
  }, []);

//fix job/path to work with handlebars
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Home />} />
          <Route path="jobs/:jobPageNum" element={<JobList jobs={searchResults.slice(0,25)} setCounter={setCounter}></JobList>} />
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
