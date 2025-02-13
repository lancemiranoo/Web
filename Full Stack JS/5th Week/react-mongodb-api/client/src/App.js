import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  //  Fetch students when the component mounts
  useEffect(() => {
    axios.get('http://localhost:5000/api/students')
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  //  Function to add a new student
  const addStudent = () => {
    axios.post('http://localhost:5000/api/students', {name, age})
      .then((response) => {
        setStudents([...students, response.data]);
        setName('');  //  Clear input fields after adding
        setAge('');
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className='App'>
      <h1>Student Management</h1>
      <input
        type='text'
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder='Enter student name'
        />
        <input
          type='number'
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder='Enter student age'
          />
          <button onClick={addStudent}>Add Student</button>

          <h2>All Students</h2>
          <ul>
            {students.map((student) => (
              <li key={student._id}>
                {student.name} - {student.age}
              </li>
            ))}
          </ul>
    </div>
  );
}