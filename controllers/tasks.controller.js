const Task = require("../models/tasks.model");
const taskService = require("../services/tasks.service");
const taskServiceInstance = new taskService();


const enroll = async (req, res) => {

  let { course, timePerDay } = req.body;
  
 
  timePerDay=Number(timePerDay);
  
  let tasksList = await taskServiceInstance.getTaskList(course, timePerDay);

  
  if(tasksList[0].tasksList.length > 0) {
    res.json({
      course: course,
      tasks: tasksList[0].tasksList
    });
  }
  else{
    tasksList = await taskServiceInstance.createTaskList(course, timePerDay);
    res.json({
      course: course,
      tasks:tasksList
    });
  }
    
}

module.exports = {
  enroll
};
