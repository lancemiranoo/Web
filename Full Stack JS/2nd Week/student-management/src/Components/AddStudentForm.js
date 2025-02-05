import React, {useState} from 'react';

const AddStudentForm = ({onAddStudent}) => {
    const [newStudent, setNewStudent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddStudent(newStudent);
        setNewStudent('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                value={newStudent}
                onChange={(e) => setNewStudent (e.target.value)}
                placeholder='Enter student name'
            />
            <button type='submit'>Add Student</button>
        </form>
    );
};

export default AddStudentForm;