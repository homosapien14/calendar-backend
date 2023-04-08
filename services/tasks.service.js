const Tasks = require('../models/tasks.model');
const getData = require("../tasks");

class taskService{
    checkDate = (today)=>{
        if(today.getDay()===0){
          today.setDate(today.getDate()+1);
        }
        else if(today.getDay()===6){
          today.setDate(today.getDate()+2);
        }
        return today;
    }
    
    checkCourse = (course,title)=>{
        let currString="";
        title=title+" ";
        for(let j=0;j<title.length;j++){
          if(title[j]===' '){
            if(currString===course){
              return true;
            }
            else{
              currString="";
            }
          }
          else{
            currString=currString+title[j];
          }
        }
        return false;
    } 

    getTaskList = async (course,timePerDay)=>{
        const tasksList = await Tasks.find({course:course,timePerDay:timePerDay},"tasksList");

        return tasksList;
    }

    createTaskList = async (course,timePerDay)=>{

        let today = new Date();
        let taskList = [];
        let remainingTime = timePerDay*60;
        let tasks = getData(); 
        // Assign tasks to each day
        let len = tasks.length;
        let i=0;
        while (i<len) {
            const task = tasks[i];
            let taskDuration = Number(task.duration);
            if(remainingTime===0){
            remainingTime = timePerDay*60;
            }

            if(today.getDay()===0){
                today.setDate(today.getDate()+1);
            }
            else if(today.getDay()===6){
                 today.setDate(today.getDate()+2);
            }

            let date = new Date(today);
            date.setDate(today.getDate());
            if (remainingTime >= taskDuration ) {
            taskList.push({
                date: date.toDateString(),
                task: task.title,
                type: task.type,
                title: task.title,
                duration: task.duration
            });
            remainingTime -= taskDuration;
            i++;
            } else{
            
            taskList.push({
                date: date.toDateString(),
                task: task.title,
                type: task.type,
                title: task.title,
                duration: task.duration
            });
            today.setDate(today.getDate() + 1);
            remainingTime=(timePerDay*60);
            }
            
        }
        let body={
            course: course,
            timePerDay: timePerDay,
            tasksList:taskList
        }
        const newEnrollment = new Tasks(body);
        const result = await newEnrollment.save();
        
        return taskList;
    }
};


module.exports = taskService;
