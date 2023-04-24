//import React, { useEffect, useState } from 'react';
import React from 'react';
import JobListItem from './JobListItem';
import { useParams } from 'react-router-dom';
import { UserContext } from '../App';

const JobList = ({ counter ,setCounter }) => {
    const jobs = React.useContext(UserContext);
    const resultsPerPage = 5;
  
    //This is the current page number after the /jobs/:jobPageNum route
    const { jobPageNum } = useParams();

    //store it as number before button click events overrides useParams
    let currentPageNum = parseInt(jobPageNum);

    const nextPageLoader = () => {
        if (currentPageNum < jobs.length / resultsPerPage){
            setCounter(currentPageNum + 1);
        }
    }

    const previousPageLoader = () => {
        if (currentPageNum > 1){
            setCounter(currentPageNum - 1);
        }
    }

    return (
        <div>
            <h1>JobList</h1>
            <h1>Total Results {jobs.length}</h1>
            <h1>Showing Results from {(jobPageNum - 1 ) * resultsPerPage} to {jobPageNum * resultsPerPage}</h1>
            <button onClick={previousPageLoader}>Previous Page</button>
            <a href={`/jobs/${counter}`}>
                <button>cool {`${counter}`}</button>
            </a>
            <button onClick={nextPageLoader}>Next Page</button>
            {jobs.slice((jobPageNum - 1) * resultsPerPage,jobPageNum * resultsPerPage).map((job) => (
                <JobListItem key={job.refID} job={job} />
            ))}
        </div>
    )
};

export default JobList;
