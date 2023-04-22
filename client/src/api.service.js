const url = 'http://localhost:3000';


const getJobs = async () => {
    const response = await fetch(url);
    const events = await response.json();
    return events;
}

//change url to better name
const postJobs = async (jobDetails) => {
    const response = await fetch((url), {
        method: 'POST'
        //,
        // body: JSON.stringify(jobDetails),
        // headers: {
        //     "Content-Type": "application/json"
        // }
    });
    const event = await response.json();
    return event;
}

module.exports = {
    getJobs,
    postJobs,
}