const Events = require("./mongooseDB");
const Main = require("../puppeteer/main.js");

exports.getJobs = async () => {
    const res = await Events.find({});
    return res;
};

//The inputData is the SearchString
exports.postJobs = async (inputData) => {
    // console.log(Jobs.main.toString());
    const jobs = await Main(inputData.searchString);

    //console.log(jobs,'jobs');


    for (let i=0; i< jobs.length; i++) {
        let inputData = jobs[i];
        const res = await Events.create({
            title: inputData.title,
            company: inputData.company,
            salary: inputData.salary,
            location: inputData.location,
            type: inputData.type,
            datePosted: inputData.datePosted,
            urlLink: inputData.urlLink,
            refID: inputData.refID
        });
    }

    // let inputData = jobs[0];
    // //console.log('\n', '\n', '\n');
    // const res = await Events.create({
    //     title: inputData.title,
    //     company: inputData.company,
    //     salary: inputData.salary,
    //     location: inputData.location,
    //     type: inputData.type,
    //     datePosted: inputData.datePosted,
    //     urlLink: inputData.urlLink,
    //     refID: inputData.refID
    // });
    // return res;


    return 'str';
};

exports.postJobs = async (inputData) => {
    const jobs = await Main(inputData.searchString);
    for (let i=0; i< jobs.length; i++) {
        let inputData = jobs[i];
        const res = await Events.create({
            title: inputData.title,
            company: inputData.company,
            salary: inputData.salary,
            location: inputData.location,
            type: inputData.type,
            datePosted: inputData.datePosted,
            urlLink: inputData.urlLink,
            refID: inputData.refID
        });
    }
    return 'str';
};

