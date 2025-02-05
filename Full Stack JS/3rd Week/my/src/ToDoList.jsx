import React from 'react';

function ToDoList({ tasks, removeTask }) {
    return (
        <ul>
            {tasks.map((task, index) => (
                <li key={index}>
                    {`${index + 1}. ${task}`} {/* Using template strings */}
                    <button onClick={ () => removeTask(index)}>Remove</button>
                </li>
            ))}
        </ul>
    );
}

export default ToDoList;