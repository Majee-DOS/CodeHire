import React from 'react';
import './JobListItem.css';
import starImage from './public/star.png';
import greyStarImage from './public/greyStar.png';
const JobListItem = ({ job }) => {
  const [clicked, setClicked] = React.useState(false);
  const handleClick = () => {
    console.log("reference: ", job.refID);

    setClicked(true);
    setTimeout(() => setClicked(false), 500);
  }

  return (
    <div className='jobItemDiv'>
      <div className='starDiv'>
        <h3 className='jobItemHeader'>{job.title}</h3>
        <img
          id="starButton"
          className={clicked ? 'clicked grow' : ''}
          src={starImage}
          alt="Star"
          onClick={handleClick}
        />
      </div>
      <p className="jobItemParagraph">Company: {job.company}</p>
      <p className="jobItemParagraph">Salary: {job.salary}</p>
      <p className="jobItemParagraph">Location: {job.location}</p>
      <p className="jobItemParagraph">Position: {job.type}</p>
      <p className="jobItemParagraph">Posted: {job.datePosted}</p>
      <p className="jobItemParagraph">Reference: {job.refID}</p>
      <a className="jobItemLink" href={"https://www.reed.co.uk/" + job.urlLink}>Apply Now</a>
    </div>
  );
};

export default JobListItem;
