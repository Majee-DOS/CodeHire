import React from 'react';

const JobListItem = ({ job }) => {
  return (
    <div>
      <h3>{job.title}</h3>
      <p>{job.company}</p>
      <p>{job.salary}</p>
      <p>{job.location}</p>
      <p>{job.type}</p>
      <p>{job.datePosted}</p>
      <a href={job.urlLink}>Apply Now</a>
    </div>
  );
};

export default JobListItem;
