const url = 'http://localhost:3000';


const getJobs = async () => {
    const response = await fetch(url);
    const jobs = await response.json();
    return jobs;
}

//change url to better name
const postJobs = async (jobDetails) => {
    // return console.log("postJobs", jobDetails , "\n" , JSON.stringify(jobDetails));
    const response = await fetch((url), {
        method: 'POST',
        body: JSON.stringify(jobDetails),
        headers: {
            "Content-Type": "application/json"
        }
    });
    const jobs = await response.json();
    return jobs;
}

const postAdvancedJobs = async (jobDetails) => {
    const response = await fetch((url + '/search'), {
        method: 'POST',
        body: JSON.stringify(jobDetails),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const jobs = await response.json();
    return jobs;
}

module.exports = {
    getJobs,
    postJobs,
    postAdvancedJobs
}