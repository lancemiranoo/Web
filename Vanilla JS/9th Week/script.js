// Function to load messages with AJAX
function loadMessages() {
    // Create an XMLHttpsRequest object
    const xhr = new XMLHttpRequest();

    // Set up a Get request to the XML file
    xhr.open("GET", "messages.xml", true);

    // Handle the response when it loads
    xhr.onload = function () {
        if (xhr.status === 200) {
            // Get the XML response
            const xmlDoc = xhr.responseXML;

            // Extract messages from the XML
            const messages = xmlDoc.getElementsByTagName("message");

            // Display each message in the messageContainer

            const messagesContainer =
            document.getElementById("messagesContainer");
            messagesContainer.innerHTML = ""; //    Clear any existing content

            for (let i = 0; i < messages.length; i++){
                const author = 
                messages[i].getElementsByTagName("author")[0].textContent;
                const text = 
                messages[i].getElementsByTagName("text")[0].textContent;

                // Create a new div for each message
                const messageDiv = document.createElement("div");
                messageDiv.innerHTML = `<strong>${author}:</strong> ${text}`;
                messagesContainer.appendChild(messageDiv);
            }
        }
    };

    // Send the request
    xhr.send();
}

// Add an event listener to the button
document.getElementById("loadButton").addEventListener("click", loadMessages);
