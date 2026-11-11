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
app.use(express.static("public")); // Serve static files from the "public" directory

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
        { title: "Welcome Page",
            name: "John Doe",
          course: "Computer Science" });
});

//student page ejs
app.get("/student-page", (req,res)=>
{
    const students = [
        {id: 1, name: "John Doe", age: 18, course: "Computer Science"},
        {id: 2, name: "Jane Smith", age: 16, course: "Mathematics"},
        {id: 3, name: "Michael Johnson", age: 18, course: "Physics"},
    ];
    res.render("student", { students: students });
});

//about page ejs
app.get("/about", (req,res)=>
{
    res.render("about", { title: "About Us" });

});




app.listen(3000, () => {
    console.log("Server running on port 3000");
});