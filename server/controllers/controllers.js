const database = require("../models/models.js");

exports.getJobs = async (req, res) => {
    const data = await database.getJobs();
    res.send(data);
}

exports.postJobs = async (req, res) => {
    // const input = JSON.parse(req.body);
    // const input = req.body;
    await database.postJobs();
    //res.send('input has been posted');
    res.status(201).send('input has been posted');
}