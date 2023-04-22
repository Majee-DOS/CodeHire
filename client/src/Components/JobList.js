import React, { useEffect, useState } from 'react';
import axios from 'axios';
import JobListItem from './JobListItem';

const JobList = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            const response = await axios.get('/jobs');
            setJobs(response.data);
        };
        fetchJobs();
    }, []);

    return (
        <div style={{ marginTop: "50px" }}>
            <div>
                {jobs.map((job) => (
                    <JobListItem key={job.refID} job={job} />
                ))}
            </div>
            <div>
                <h1>JobList</h1>
            </div>
        </div>
    );
};

export default JobList;
