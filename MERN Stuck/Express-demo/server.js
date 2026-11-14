import express from "express";
import morgan from "morgan";
import errorhandler from "./middleware/errormiddleware.js";

import studentRoutes from "./Routes/studentroute.js";

const app = express();
app.set("view engine", "ejs");

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public")); 
app.use(express.urlencoded({ extended: true }));
app.use(errorhandler); // Use the error handling middleware

 

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
 
    res.render("student", { students: students });
});
//student page ejs
app.get("/student-page", (req,res)=>
{
    res.render("student", { title: "Student Page", students: students });
});

//about page ejs
app.get("/about", (req,res)=>
{
    res.render("about", { title: "About Us" });

});
//contact page ejs
app.get("/contact", (req,res)=>
{
    res.render("contact", { title: "Contact Us" });
});

//Register page ejs 
let students = [
    {id: 1, name: "John Doe", age: 18, course: "Computer Science"},
    {id: 2, name: "Jane Smith", age: 16, course: "Mathematics"},
    {id: 3, name: "Michael Johnson", age: 18, course: "Physics"},
]; // Array to store registered students

app.get("/register", (req, res) => {
    res.render("register", { title: "Register", students: students });
});

//handle rejister form submission
app.post("/register", (req, res) => {
    const { name, age, course } = req.body;
    const parsedAge = Number(age);
    if
    (typeof name !== "string" || name.trim() === "" ||
    !Number.isInteger(parsedAge) || parsedAge <= 0 ||
    typeof course !== "string" || course.trim() === "") {
        return res.status(400).send("Invalid input. Please provide valid name, age, and course.");
    }
    const newStudent = {
        id: Math.max(0, ...students.map(s => s.id)) + 1,
        name: name,
        age: parsedAge,
        course: course
    };
    students.push(newStudent);
    res.redirect("/student-page");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});