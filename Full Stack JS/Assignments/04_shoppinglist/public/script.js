google.charts.load("current", { packages: ["corechart"] });

document.getElementById("chartType").addEventListener("change", generateForm);

document.getElementById("chartForm").addEventListener("submit", function (event) {
    event.preventDefault();
    drawChart();
});

function generateForm() {
    let type = document.getElementById("chartType").value;
    let chartOptions = document.getElementById("chartOptions");
    chartOptions.innerHTML = ""; // Clear previous form inputs

    let title = document.createElement("input");
    title.setAttribute("type", "text");
    title.setAttribute("placeholder", "Chart Title");
    title.setAttribute("id", "chartTitle");
    chartOptions.appendChild(title);

    if (type === "pie") {
        chartOptions.appendChild(document.createTextNode(" Number of Sectors (2-6): "));
        let sectors = document.createElement("input");
        sectors.setAttribute("type", "number");
        sectors.setAttribute("id", "sectors");
        sectors.setAttribute("min", "2");
        sectors.setAttribute("max", "6");
        chartOptions.appendChild(sectors);
    } else if (type === "bar") {
        chartOptions.appendChild(document.createTextNode(" Number of Bars (2-6): "));
        let bars = document.createElement("input");
        bars.setAttribute("type", "number");
        bars.setAttribute("id", "bars");
        bars.setAttribute("min", "2");
        bars.setAttribute("max", "6");
        chartOptions.appendChild(bars);
    }
}

function drawChart() {
    let type = document.getElementById("chartType").value;
    let title = document.getElementById("chartTitle").value;
    let data = [["Label", "Value"]];

    if (type === "pie") {
        let sectors = parseInt(document.getElementById("sectors").value);
        let totalValue = 100; // Assume 100% total for simplicity
        let sectorSum = 0;
        for (let i = 1; i < sectors; i++) {
            let label = prompt(`Enter label for Sector ${i}:`);
            let value = parseFloat(prompt(`Enter value for ${label}:`));
            data.push([label, value]);
            sectorSum += value;
        }
        let lastLabel = prompt("Enter label for the last sector:");
        data.push([lastLabel, totalValue - sectorSum]);
    } else if (type === "bar") {
        let bars = parseInt(document.getElementById("bars").value);
        for (let i = 0; i < bars; i++) {
            let label = prompt(`Enter label for Bar ${i + 1}:`);
            let value = parseFloat(prompt(`Enter value for ${label} (Max 400):`));
            data.push([label, Math.min(value, 400)]);
        }
    }

    let chartData = google.visualization.arrayToDataTable(data);
    let options = { title: title };

    let chart;
    let chartContainer = document.getElementById("chartContainer");
    chartContainer.innerHTML = "";

    if (type === "pie") {
        chart = new google.visualization.PieChart(chartContainer);
    } else {
        chart = new google.visualization.ColumnChart(chartContainer);
    }
    chart.draw(chartData, options);
}