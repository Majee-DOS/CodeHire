import React, { useEffect, useState } from 'react';
import axios from 'axios';
import JobListItem from './JobListItem';

import { useParams } from 'react-router-dom';

const JobList = ({ jobs, setCounter }) => {
    // const [counter, setCounter] = useState(0);

    const { jobPageNum } = useParams();
    console.log(jobPageNum);

    const nextPageLoader = (jobPageNum) => {
        if (!isNaN(jobPageNum)) {
            setCounter(parseInt(jobPageNum)+1);
        }
    }

    const previousPageLoader = (jobPageNum) => {
        if (!isNaN(jobPageNum)) {
            setCounter(parseInt(jobPageNum)-1);
        }
    }

    console.log(jobs);
    return (
        <div>
            <h1>JobList</h1>
            <button onClick={previousPageLoader}>Previous Page</button>
            <button onClick={nextPageLoader}>Next Page</button>
        </div>
    )
};

export default JobList;


//const [jobs, setJobs] = useState([]);

// useEffect(() => {
//     const fetchJobs = async () => {
//         const response = await axios.get('/jobs');
//         setJobs(response.data);
//     };
//     fetchJobs();
// }, []);

// return (
//     <div style={{ marginTop: "50px" }}>
//         <div>
//             {jobs.map((job) => (
//                 <JobListItem key={job.refID} job={job} />
//             ))}
//         </div>
//         <div>
//             <h1>JobList</h1>
//         </div>
//     </div>
// );