const mongoose = require('mongoose');


const taskSchema =new mongoose.Schema({
    date:{type:Date},
    task:{type:String},
    type:{type:String},
    title:{type:String},
    duration:{type:Number},
}
);
const tasksSchema =new mongoose.Schema({
        course: {type:String,required:true,unique:true},
        timePerDay: {type:Number},   
        tasksList:{type:[taskSchema]},
    }
);

const taskModel = mongoose.model('Tasks',tasksSchema);

module.exports = taskModel;