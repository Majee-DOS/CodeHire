const database = require("../models/models.js");

exports.getEvents = async (req, res) => {
    const data = await database.getEvents();
    res.send(data);
}

exports.postEvents = async (req, res) => {
    // const input = JSON.parse(req.body);
    // const input = req.body;
    await database.postEvent();
    //res.send('input has been posted');
    res.status(201).send('input has been posted');
}