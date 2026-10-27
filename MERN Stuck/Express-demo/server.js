import Express from "express";
const app=Express();
app.get("/",(req,res)=>
{
    res.send("Hello World");
}
);
/*app.get("/about",(req,res)=>
{
    res.send("This is the about page");
});

app.get("/contact",(req,res)=>
{
    res.send("This is the contact page");
});*/
app.get("/student/:id/:course", (req, res) => {
    res.json({
        id: req.params.id, 
        course: req.params.course
    });
});

app.listen(3000,()=>
{
    console.log("server running")
});