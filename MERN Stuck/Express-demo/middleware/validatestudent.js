const validatestudent = (req, res, next) =>
     {
         const { name, age, course } = req.body;
         if (!name || !age || !course)
             {
                return res.status (400).json(
                    {
                        message: "all fields are required"
                    }
                );
       
     }
     if (typeof name !== "string" || name.trim() === "" )
        
     {
        return res.status(400).json(
            {
                message: "invalid data types"
            }
        );
     }

     if (!Number.isInteger(age) || age <=0 )
     {
        return res.status(400).json(
            {
                message: "invalid data types"
            }
        );
     }
      
     if (typeof course !== "string" || course.trim() === "")
     {
        return res.status(400).json(
            {
                message: "invalid data types"
            }
        );
     }

    };
    export default validatestudent;