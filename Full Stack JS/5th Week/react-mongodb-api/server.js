//  Import required packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

//  Create an instance of Express
const app = express();

//  Middleware to hadnle JSON data and CORS
app.use(express.json());
app.use(cors());

//  Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/studentDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//  Define a simple schema for storing student data
const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
});

//  Create a model based on the schema
const Student = mongoose.model('Student', studentSchema);

//  Define a GET route to retrieve all students
app.get('/api/students', async (req, res) => {
    const students = await Student.find();
    res.json(students); //  Send the students as JSON response
});

//  Define a POST route to add a new Student
app.post('/api/students', async (req, res) => {
    const newStudent = new Student (req.body);
    await newStudent.save();    //  Save the new student to the database
    res.json(newStudent);   // Send the created student as response
});

app.put('/api/students/:id', async (req, res) => {
    await Student.findByIdAndUpdate(req.params.id);
    res.json({ message: 'Student updated' });   //  Updates the students database
});

//  Define a DELETE route to remove a student by ID
app.delete('/api/students/:id', async (req, res) => {
    await Student.findByIdAndDelete (req.params.id);
    res.json({  message: 'Student deleted'  })
});

//  Start the server on port 5000
app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});