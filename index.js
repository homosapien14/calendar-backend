const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 8081;
const taskRouters = require("./routes/tasks.route");

// connecting the database to server using mongoose.

const mongoose = require('mongoose');
const DB_URI = "mongodb+srv://Swapnil:nOGHm3usj9i8pW8L@cluster0.bqgoctb.mongodb.net/?retryWrites=true&w=majority/schedule";
mongoose
	.connect(`${DB_URI}`)
	.then(()=>console.log("Connected to DATABASE at",DB_URI))
	.catch((error)=>console.log("Failed to connect to DB",error))



app.use(cors());
app.use(express.json());

app.use('/',taskRouters);


  

app.listen(PORT, () => console.log("Server running on port", PORT));

