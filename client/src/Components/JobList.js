//import React, { useEffect, useState } from 'react';
import React from 'react';
import JobListItem from './JobListItem';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import './JobList.css';

const JobList = () => {
    const jobs = React.useContext(UserContext);
    console.log(jobs.length);
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
        <div className='jobListDiv'>
            <h1>Total Results {jobs.length}</h1>
            <h1>Showing Results {(jobPageNum - 1) * resultsPerPage} - {jobPageNum * resultsPerPage}</h1>
            <div className='jobListPageButtons'>
                <a href={`/jobs/1`}>
                    <button className='firstButton'>First Page</button>
                </a>
                <button className='prevButton' onClick={async () => {
                    navigate(`/jobs/${navigatePrevPage()}`);
                }}>{'<'}</button>
                <button className='nextButton' onClick={() => {
                    navigate(`/jobs/${navigateNextPage()}`)
                }}>{'>'}</button>
                <a href={`/jobs/${jobs.length / resultsPerPage}`}>
                    <button className='lastButton'>Last Page</button>
                </a>
            </div>
            {jobs.slice((jobPageNum - 1) * resultsPerPage, jobPageNum * resultsPerPage).map((job) => (
                <JobListItem key={job.refID} job={job} />
            ))}
        </div>
    )
};

export default JobList;
