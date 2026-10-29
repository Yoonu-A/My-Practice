import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/about", (req, res) => {
    res.send("This is the about page");
});

app.get("/contact", (req, res) => {
    res.send("contact us at marstech@gmail.com");
});

app.get("/students/:id/courses/:course", (req, res) => {
    res.json({
        studentId: req.params.id,
        courseName: req.params.course
    });
});

app.get("/search",(req,res)=>
{
  res.json({
    search:req.query.asd,
    barnd:req.query.brand
});
});

app.get("/api/students",(req,res) =>
{
    res.json({
        message:"students retrived Successfully",
        student:[
            {id:102,name:"ahmed"},
        {id:103,name:"raja"}]
    });
});

let students=[
    {id:1,name:"raja",age:20,course:"SE"},
    {id:2,name:"kumar",age:22,course:"IT"}
];

//Get
app.get("/students-demo",(req,res)=>
{
    res.status(200).json(students);
}
);





app.listen(3000, () => {
    console.log("server running");
});