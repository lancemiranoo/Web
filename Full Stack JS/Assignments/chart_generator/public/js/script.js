// ===========================================
// Name: script.js
// Description: Main Script
// ===========================================

// Load Google Charts
google.charts.load("current", { packages: ["corechart"] });

// Event Listeners:
// 1. Generates form on change
document.getElementById("chartType").addEventListener("change", generateForm);

// 2. Generates chart on submit
document.getElementById("chartForm").addEventListener("submit", function (event) {
    event.preventDefault();
    drawChart();
});
