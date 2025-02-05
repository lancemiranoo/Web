// src/components/StudentList.js
import React from 'react';

const StudentList = ({students}) => {
    return (
        <div>
            <h2>Student List</h2>
            {students.length === 0 ? (
                <p>No students available</p>
            ) : (
                <ul>
                {students.map((student, index) => (
                    <li key={index}>{student}</li>
                ))}
            </ul>
            )}
        </div>
    );
};

export default StudentList;