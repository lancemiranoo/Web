// ===========================================
// Name: utilsCommon.js
// Description: Contains helper functions
// ===========================================

function createTextInput(id, placeholder) {
    let input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", placeholder);
    input.setAttribute("id", id);
    return input;
}

function createNumberInput(id, placeholder, max) {
    let input = document.createElement("input");
    input.setAttribute("type", "number");
    input.setAttribute("placeholder", placeholder);
    input.setAttribute("id", id);
    input.setAttribute("min", "0");
    if (max) input.setAttribute("max", max);
    return input;
}

function validateInput(input) {
    let value = parseInt(input.value, 10);
    let warning = document.getElementById(input.id + "-warning");

    if (!warning) {
        warning = document.createElement("span");
        warning.setAttribute("id", input.id + "-warning");
        warning.style.color = "red";
        warning.style.display = "none";
        input.after(warning);
    }

    if (isNaN(value) || value < 2 || value > 6) {
        warning.innerText = "Please enter a number between 2 and 6.";
        warning.style.display = "inline";
        input.value = ""; // Clear invalid input
    } else {
        warning.style.display = "none"; // Hide warning if valid
    }
}
