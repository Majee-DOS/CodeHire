const Events = require("./mongooseDB");
const Main = require("../puppeteer/main.js");

exports.getEvents = async () => {
    const res = await Events.find({});
    return res;
};

exports.postEvent = async () => {
    // console.log(Jobs.main.toString());
    const jobs = await Main();

    //console.log(jobs,'jobs');

    let inputData = jobs[0];
    //console.log('\n', '\n', '\n');
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
    return res;
};
