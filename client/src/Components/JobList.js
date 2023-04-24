//import React, { useEffect, useState } from 'react';
import React from 'react';
import JobListItem from './JobListItem';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

const JobList = () => {
    const jobs = React.useContext(UserContext);
    //How many results to display per page
    const resultsPerPage = 5;

    //This is the current page number after the /jobs/:jobPageNum route
    const { jobPageNum } = useParams();

    //store it as number before button click events overrides useParams
    let currentPageNum = parseInt(jobPageNum);
    const navigate = useNavigate();

    const navigatePrevPage = () => {
        if (currentPageNum > 1) {
            return currentPageNum - 1;
        } else {
            return currentPageNum;
        }
    }

    const navigateNextPage = () => {
        if (currentPageNum < jobs.length / resultsPerPage) {
            return currentPageNum + 1;
        } else {
            return currentPageNum;
        }
    }

    return (
        <div>
            <h1>JobList</h1>
            <h1>Total Results {jobs.length}</h1>
            <h1>Showing Results from {(jobPageNum - 1) * resultsPerPage} to {jobPageNum * resultsPerPage}</h1>

            <a href={`/jobs/1`}>
                <button>First Page</button>
            </a>
            <button onClick={async () => {
                navigate(`/jobs/${navigatePrevPage()}`);
            }}>Previous Page</button>
            <button onClick={() => {
                navigate(`/jobs/${navigateNextPage()}`)
            }}>Next Page</button>
            <a href={`/jobs/${jobs.length / resultsPerPage}`}>
                <button>Last Page</button>
            </a>

            {jobs.slice((jobPageNum - 1) * resultsPerPage, jobPageNum * resultsPerPage).map((job) => (
                <JobListItem key={job.refID} job={job} />
            ))}
        </div>
    )
};

export default JobList;
