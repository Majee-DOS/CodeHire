const mongoose = require('mongoose');

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/chat-db');
}

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: String,
    company: String,
    salary: String,
    location: String,
    type: String,
    datePosted: String,
    urlLink: String,
    refID: Number
})

const Event = mongoose.model('Job', eventSchema);

module.exports = Event
