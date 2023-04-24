import React from 'react';

const JobListItem = ({ job }) => {
  return (
    <div>
      <h3>{job.title}</h3>
      <p>{job.company}</p>
      <p>Salary: {job.salary}</p>
      <p>Location: {job.location}</p>
      <p>Position: {job.type}</p>
      <p>Posted: {job.datePosted}</p>
      <p>Reference: {job.refID}</p>
      <a href={"https://www.reed.co.uk/" + job.urlLink}>Apply Now</a>
    </div>
  );
};

export default JobListItem;
