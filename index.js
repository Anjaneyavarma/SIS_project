const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const studentRouter = require("./routes/UserRouter");
const timeTableRouter = require("./routes/TimetableRouter");
const login = require("./routes/AuthRouter");
const cors = require("cors");
const kitchenRouter = require("./routes/KitchenRouter"); 
const boardingRouter = require("./routes/BoardingRouter");

dotenv.config();
const app = express();

const {
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOSTNAME,
    MONGO_PORT,
    MONGO_DB
  } = process.env;

const clientURI = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

mongoose.connect(clientURI, 
{useNewUrlParser: true, useUnifiedTopology: true,})
.then(()=> console.log("mongodb connected"))
.catch((err)=> console.log(err))


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({
    origin: "*"
}));


app.use("/student", studentRouter);
app.use("/", login);
app.use("/tt", timeTableRouter);
app.use("/kitchen", kitchenRouter);
app.use("/boarding", boardingRouter);

app.use('/uploads', express.static("./uploads"));

app.get("/", (req,res)=>{
    res.send("hello world");
});

const con = mongoose.connection

con.on('open', function(){
    console.log("database connected..")
})

app.listen(9000, ()=>{
    console.log("server is ready to use");
})