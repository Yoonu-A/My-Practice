import express from "express";

import studentRoutes from "./Routes/studentroute.js";

const app = express();

// Middleware
app.use(express.json());


//custom middleware
const mymiddleware=(req,res,next)=>
{
    console.log("Middleware is Working");
    next();
};

app.use(mymiddleware);

// Student API routes
app.use("/api/students", studentRoutes);

// Home route
app.get("/", (req, res) => {
    res.send("Welcome to Student API");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});