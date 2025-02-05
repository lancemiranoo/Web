// Select all input fields with class 'textbox'
const inputs = document.querySelectorAll('.textbox');

// Loop through each input field
inputs.forEach(input => {
    // Listen for the focus event (when the input is clicked)
    input.addEventListener('focus',() => {
        input.classList.add('highlight'); //add highlight class
    });

    // Listen for the blur event (when the input losed focus)
    input.addEventListener('blur', () => {
        input.classList.remove('highlight'); //Remove highlight class
    });
});

const form = document.getElementById('myForm');

// Listen for the submit event
form.addEventListener('submit', (event) => {
    event.preventDefault(); //Prevent the form from submitting normally

    // Get values from the form inputs
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const hobbies = []; // Array to hold checked hobbies

    // Check if the hobby checkboxes are checked and add them to the array
    if (document.getElementById('hobby1').checked) hobbies.push('Reading');
    if (document.getElementById('hobby2').checked) hobbies.push('Traveling');

    // Display the submitted data in the output div
    document.getElementById('output').innerHTML = `
    <h2>Submitted Data</h2>
    <p>Name: ${name}</p>
    <p>Age: ${age}</p>
    <p>Gender: ${gender}</p>
    <p>Hobbies: ${hobbies.join(', ')}</p>
    `;
});


// Set focus on the name input when the page loads
window.onload = () => {
    document.getElementById('name').focus(); // Focus on the name input
};

form.addEventListener('reset',(event) =>
     {
    document.getElementById('output').innerHTML = " ";
    });
