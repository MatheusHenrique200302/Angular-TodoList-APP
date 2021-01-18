const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const tasksSchema = new Schema({
    user_id: String,
    taskname: String,
    taskdesc: String,
    taskStatus: Boolean
});
module.exports = mongoose.model('tasks',tasksSchema, 'tasks')