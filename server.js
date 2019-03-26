const Joi = require('joi');
const express = require('express');
const app=express();

app.use(express.json());
/** 
 * creating the json array
*/
const courses =[
    {
        id: 1, name: 'course1'
    },
    {
        id: 2, name: 'course2'
    },
    {
        id: 3, name: 'course3'
    },
];

app.get('/',(req,res) =>{

    res.send('hello world!!!');
});
/**
 * getting courses details
 */
app.get('/api/courses', (req,res) =>{

    res.send([courses]); 
});
/**
 * adding a new course
 */
app.post('/api/courses', (req,res) =>{
    const {error} = validateCourse(req.body);// equevelent result.error
    if(error){
        // 400 Bad request
        res.status(400).send(error.details[0].message);
        return; 
    }
    
    const course = {
            id: courses.length + 1,
            name: req.body.name
    };

    courses.push(course);
    res.send(course);

});

/**
 * updating the existing course based on id
 */
app.put('/api/courses/:id',(req,res)=>{

    //look up the courses
    //  if not existing, return 404 
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('the course of the given id was not found');
    //validate 
    //if Invalid, return  400 - Bad request
    const {error} = validateCourse(req.body);// equevelent result.error
    if(error){
        // 400 Bad request
        res.status(400).send(error.details[0].message);
        return; 
    }
    //update course
    course.name =req.body.name;
    //return the updated course
    res.send(course);
});


/**
 * delete the course based on its id
 */
app.delete('/api/courses/:id', (req,res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    //bad request
    if(!course) res.status(404).send('the course of the given id was not found');
   
    const  index = courses.indexOf(course);
    courses.splice(index,1);

    res.send(course);

});

function validateCourse(course){
    const schema ={
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
}


app.get('/api/courses/:id', (req,res) => {
    
            const course = courses.find(c => c.id === parseInt(req.params.id));
            if(!course) res.status(404).send('the course of the given id was not found');

        res.send(course);
    // res.send(req.params.id);
});

app.get('/api/courses/:id', (req,res) => {
    res.send(req.query);
});

const  port = process.env.PORT || 3000; 

app.listen(port ,() => console.log(`listening on port ${port}...`));