// ===========================================
// Name: formGenerator.js
// Description: Function to generate the form
// ===========================================

function generateForm() {
    // Hide chart container
    document.getElementsByClassName("container")[0].style.visibility = "hidden";

    // Get selected type
    let type = document.getElementById("chartType").value;

    // divplaceholder for options
    let chartOptions = document.getElementById("chartOptions");
    chartOptions.innerHTML = ""; // Clear previous form inputs

    // Create title input
    let title = document.createElement("input");

    title.setAttribute("type", "text");
    title.setAttribute("placeholder", "Chart Title");
    title.setAttribute("id", "chartTitle");

    // Add the title input inside divplaceholder
    chartOptions.appendChild(title);

    // Generate input fields based on chart type
    let inputType = type === "pie" ? "sectors" : "bars";
    let labelText = type === "pie" ? "Number of Sectors (2-6): " : "Number of Bars (2-6): ";

    // Add the textnode input inside divplaceholder
    chartOptions.appendChild(document.createTextNode(labelText));
    let inputField = document.createElement("input");
    inputField.setAttribute("type", "number");
    inputField.setAttribute("id", inputType);
    inputField.setAttribute("min", "2");
    inputField.setAttribute("max", "6");
    chartOptions.appendChild(inputField);

    // Container for either sector/bar labels and values 
    let container = document.createElement("div");
    container.setAttribute("id", inputType + "Container");
    chartOptions.appendChild(container);

    // Generate the fields according to the input field
    inputField.addEventListener("input", () => {
        // Checks if the input is within 2-6
        validateInput(inputField);
        if (inputField.value >= 2 && inputField.value <= 6) {
            if (type === "pie") {
                generateSectorInputs(parseInt(inputField.value, 10), container);
            } else {
                generateBarInputs(parseInt(inputField.value, 10), container);
            }
        }
    });

}
