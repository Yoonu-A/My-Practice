import express from "express";

const app = express();

app.use(express.json());


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
    {id:2,name:"kumar",age:22,course:"IT"},
    {id:3,name:"kamal",age:22,course:"IT"}
];

//GET
app.get("/students-demo",(req,res) =>
{
    res.status(200).json(students);
});


app.get("/students-demo/:id", (req, res) => {
    const id = Number(req.params.id);

    const student = students.find((s) => s.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.status(200).json(student);
});

//POST
 app.post("/students-demo",(req,res) =>
 {
     const newstudent=req.body;

     students.push(newstudent);

    res.status(201).json(
        {message:"students added",
          student:newstudent   
         }
     );
 });

 //Patch
 // PATCH - Update particular student details

app.patch("/students-demo/:id", (req, res) => {

    const id = Number(req.params.id);

    const student = students.find((s) => s.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    Object.assign(student, req.body);

    res.status(200).json({
        message: "Student updated successfully",
        student: student
    });

});
//PUT
app.put("/students-demo/:id",(req,res) =>
{
    const id=Number(req.params.id);
    const index=students.findIndex((s)=> s.id===id);

    if(index===-1){
        return res.status(404).json(
            {
                message:"student not found"
            }
        );
    }
    students[index]={id,...req.body};

    res.status(200).json({
        message:"student replaced successfully",
        student:students[index]
    });

});

//delete
app.delete("/students-demo/:id",(req,res) =>
{
    const id=Number(req.params.id);
    const index=students.findIndex((s)=> s.id===id);

    if(index===-1){
        return res.status(404).json(
            {
                message:"student not found"
            }
        );
    }
    students.splice(index,1);

    res.status(200).json({
        message:"student deleted successfully",
    });

});

app.listen(3000, () => {
    console.log("server running");
});