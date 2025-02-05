// Function to load messages with AJAX
function loadMessages(){
    // Create an XMLHttpRequest object
    const xhr = new XMLHttpRequest();

    // Set up a GET request to the JSON file
    xhr.open("GET", "messages.json", true);

    // Handle the response when it loads
    xhr.onload = function(){
        if (xhr.status === 200){
            // Parse the JSON response
            const data = JSON.parse(xhr.responseText);

            // Get the array of messages
            const messages = data.messages;

            // Display each message in the messageContainer
            const messagesContainer = document.getElementById("messagesContainer");
            messagesContainer.innerHTML = "";   // Clear any existing content

            messages.forEach (message =>{
                // Create a new div for each message
                const messageDiv = document.createElement("div");
                messageDiv.innerHTML = `<strong>${message.author}:</strong>
                ${message.text}`;
                messagesContainer.appendChild(messageDiv)
            });
        }
    };

    // Send the request 
    xhr.send();
}

// Add an event listener to the button
document.getElementById("loadButton").addEventListener("click", loadMessages);