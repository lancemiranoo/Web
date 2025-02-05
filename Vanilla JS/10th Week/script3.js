// Function to load messages based on selected format
function loadMessages(){
    const format = document.getElementById("dataFormat").value;
    const xhr = new XMLHttpRequest();

    // SET URL based on the selected format
    const url = format === "json" ? "messages.json" : "messages.xml";
    xhr.open("GET", url, true);

    xhr.onload = function (){
        if (xhr.status === 200){
            const messagesContainer = document.getElementById("messagesContainer");
            messagesContainer.innerHTML = "";   // clear previous content

            if (format === "json"){
                // Parse and display JSON data
                const data = JSON.parse(xhr.responseText);
                data.messages.forEach(message => {
                    const messageDiv = document.createElement("div");
                    messageDiv.innerHTML = `<strong>${message.author}:</strong>${message.text}`;
                    messagesContainer.appendChild(messageDiv);
                });
            } else {
                // Parse and display XML data
                const xmlDoc = xhr.responseXML;
                const messages = xmlDoc.getElementsByTagName("message");
                for (let i = 0; i < messages.length; i++){
                    const author = messages[i].getElementsByTagName("author")[0].textContent;
                    const text = messages[i].getElementsByTagName("text")[0].textContent;
                    const messageDiv = document.createElement("div");
                messageDiv.innerHTML = `<strong>${author}:</strong> ${text}`;
                messagesContainer.appendChild(messageDiv);
                }
            }
        }
    };

    xhr.send();
}

// Event listener to load messages when the button is clicked
document.getElementById("loadButton").addEventListener("click", loadMessages);