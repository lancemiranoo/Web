// // import logo from './logo.svg';
// import './App.css';
// import StudentList from './Components/StudentList';

// function App() {
//   const students = ['Alice', 'Bob', 'Charlie'];

//   return (
//     <div className='App'>
//       <StudentList students={students} />
//     </div>
//   );
// }

// export default App;


import React, {useState} from 'react'
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import StudentList from './Components/StudentList'
import AddStudentForm from './Components/AddStudentForm'

function App() {
  const [students, setStudents] = useState(['Alice', 'Bob', 'Charlie']);
  const handleAddStudent = (newStudent) => {
    setStudents([...students, newStudent]);
  };

  return (
    <Router>
      <div className='App'>
        <nav>
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/add-student'>Add Student</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path='/' element={<StudentList students={students} />} />
          <Route path='/add-student' element={<AddStudentForm onAddStudent={handleAddStudent} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;