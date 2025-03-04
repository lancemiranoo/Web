const express = require('express');
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
const PORT = 3000;
const url = "mongodb://localhost:27017";
const dbName = "myFirstDatabase";

let db;

app.use(express.json()); // Middleware to parse JSON request bodies

MongoClient.connect(url)
    .then(client => {
        console.log("Connected to MongoDB!");
        db = client.db(dbName);

        // Get all students
        app.get('/students', async (req, res) => {
            try {
                const students = await db.collection('students').find().toArray();
                res.json(students);
            } catch (err) {
                res.status(500).send(err);
            }
        });

        // Create a new student
        app.post('/students', async (req, res) => {
            try {
                const newStudent = req.body;
                const result = await db.collection('students').insertOne(newStudent);
                res.status(201).json(result);
            } catch (err) {
                res.status(500).send(err);
            }
        });

        // Update an existing student by ID
        app.put('/students/:id', async (req, res) => {
            try {
                const { id } = req.params;
                const updatedStudent = req.body;
                const result = await db.collection('students').updateOne(
                    { _id: new ObjectId(id) },
                    { $set: updatedStudent }
                );
                res.json(result);
            } catch (err) {
                res.status(500).send(err);
            }
        });

        // Delete a student by ID
        app.delete('/students/:id', async (req, res) => {
            try {
                const { id } = req.params;
                const result = await db.collection('students').deleteOne({ _id: new ObjectId(id) });
                res.json(result);
            } catch (err) {
                res.status(500).send(err);
            }
        });

        // Start the server only after DB connection is established
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error("Failed to connect to MongoDB:", err);
    });
