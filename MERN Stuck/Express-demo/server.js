import express from "express";
import morgan from "morgan";
import errorhandler from "./middleware/errormiddleware.js";

import studentRoutes from "./Routes/studentroute.js";

const app = express();
app.set("view engine", "ejs");

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(errorhandler);

//custom middleware
const logger = (req, res, next) =>
     {
        console.log("Request Method:", req.method);
        console.log("Request URL:", req.url);
        console.log("Request Time:", new Date().toLocaleString());
        next();
     }
app.use(logger);

// Student API routes
app.use("/api/students", studentRoutes);

// Home route
app.get("/", (req, res) => {
    res.send("Welcome to Student API");
});

//EJS route
app.get("/studentview", (req,res)=>
{
    res.render ("studentview", 
        { name: "John Doe",
          age: 15,
          course: "Computer Science" });
});

app.get("/wellcome", (req,res)=>
{
    res.render ("wellcome", 
        { name: "John Doe",
          course: "Computer Science" });
});





app.listen(3000, () => {
    console.log("Server running on port 3000");
});