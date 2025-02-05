// Select all the question elements
const questions = document.querySelectorAll(".question");

// Loop through each question and attach a click event listener
questions.forEach(function(question){
    question.addEventListener("click", function(){
        // Find the next sibling element, which is the answer
        const answer = this.nextElementSibling;

        // Toggle the display style between 'block' and 'none'
        if (answer.style.display === "none" || answer.style.display === ""){
            answer.style.display = "block"; // Show the answer
        }
        else {
            answer.style.display = "none"; // Hide the answer
        }
    });
});